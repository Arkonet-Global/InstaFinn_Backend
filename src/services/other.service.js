import LoanApplication from '../models/loanApplication.model';
import User from '../models/user.model';



export const getLoanApplicationStatus = async (userId, role, userBranches = []) => {
  
  // Service to get loan application status based on user role
  const status = [
    { id: 0, key: "new", status: "New Applications", count: 0 },
    { id: 1, key: "pending", status: "Pending Applications", count: 0 },
    { id: 2, key: "inprogress", status: "In Progress Applications", count: 0 },
    { id: 3, key: "rejected", status: "Rejected Applications", count: 0 },
    { id: 4, key: "completed", status: "Completed Applications", count: 0 }
  ];

  try {
    console.log("Fetching loan application status for user:", userId, "with role:", role);
    let applications = [];

    if (role === 'user') {

      applications = await LoanApplication.find({ userId }).select('status');
    }
    // else if (role === 'agent' || role === 'subAgent') {
    //   if (role === 'agent') {
    //     // get the all subagent under the agent and then fetch all loan applications of that and subagent
    //     // fetch all subagents of the agent by User collection
    //     const subAgents = await User.find({ createdBy: userId }).select('_id');
    //     console.log("SubAgents found:", subAgents);
    //     const subAgentIds = subAgents.map(agent => agent._id);
    //     console.log("SubAgent IDs:", subAgentIds);
    //     applications = await LoanApplication.find({ $or: [{ userId }, { createdBy: { $in: subAgentIds } }] }).select('status');
    //     console.log("Agent applications:", applications);

    //   } else if (role === 'subAgent') {
    //     // fetch all loan applications created by the subagent
    //     applications = await LoanApplication.find({ createdBy: userId }).select('status');
    //     console.log("SubAgent applications:", applications);
    //   }
      
    //} 
    
    else if (role === 'subAgent') {
      // ✅ Only applications created by this subAgent
      applications = await LoanApplication.find({ createdBy: userId }).select('status');

    } else if (role === 'agent') {
      // ✅ Find all subagents created by this agent
      const subAgents = await User.find({ createdBy: userId }).select('_id');
      const subAgentIds = subAgents.map(agent => agent._id);

      applications = await LoanApplication.find({
        $or: [
          { createdBy: userId }, // Applications created by agent
          { createdBy: { $in: subAgentIds } } // Applications by subagents created by agent
        ]
      }).select('status');

    } 
    else if (role === 'bankOperator') {
      // ✅ Filter only applications assigned to this operator's branches
      if (!userBranches || userBranches.length === 0) {
        console.warn("⚠️ BankOperator has no branches assigned");
        return status; // return default 0s
      }

      applications = await LoanApplication.find({
        bankData: {
          $elemMatch: {
            branches: {
              $elemMatch: {
                branchId: { $in: userBranches }
              }
            }
          }
        }
      }).select('status');

    } 
    
    else if (role === 'admin' || role === 'masterAdmin') {
      applications = await LoanApplication.find().select('status');
    } else {
      throw new Error('Unauthorized: Invalid role');
    }

    
    // 🔁 Remove duplicate applications by _id
    const uniqueApplications = new Map();
    applications.forEach(app => {
      uniqueApplications.set(app._id.toString(), app);
    });

    // ✅ Count each unique application's status
    [...uniqueApplications.values()].forEach(app => {
      const match = status.find(s => s.key?.toLowerCase() === app.status?.toLowerCase());
      if (match) {
        match.count += 1;
      }
    });


    return status;
  } catch (error) {
    throw new Error('Error retrieving loan application status: ' + error.message);
  }
};

