import LoanApplication from '../models/loanApplication.model';

// Service to get loan application status based on user role
const status = [
  { id: 0, key: "new", status: "New Applications", count: 0 },
  { id: 1, key: "pending", status: "Pending Applications", count: 0 },
  { id: 2, key: "inprogress", status: "In Progress Applications", count: 0 },
  { id: 3, key: "rejected", status: "Rejected Applications", count: 0 },
  { id: 4, key: "completed", status: "Completed Applications", count: 0 }
];

export const getLoanApplicationStatus = async (userId, role) => {
  try {
    console.log("Fetching loan application status for user:", userId, "with role:", role);
    let applications = [];

    if (role === 'user') {

      applications = await LoanApplication.find({ userId }).select('status');
    } else if (role === 'agent' || role === 'subAgent') {
      if (role === 'agent') {
        // get the all subagent under the agent and then fetch all loan applications of that and subagent
        // fetch all subagents of the agent by User collection
        const subAgents = await User.find({ createdBy: userId }).select('_id');
        console.log("SubAgents found:", subAgents);
        const subAgentIds = subAgents.map(agent => agent._id);
        console.log("SubAgent IDs:", subAgentIds);
        applications = await LoanApplication.find({ $or: [{ userId }, { createdBy: { $in: subAgentIds } }] }).select('status');
        console.log("Agent applications:", applications);

      } else if (role === 'subAgent') {
        // fetch all loan applications created by the subagent
        applications = await LoanApplication.find({ createdBy: userId }).select('status');
        console.log("SubAgent applications:", applications);
      }
      
    } else if (role === 'admin' || role === 'masterAdmin' || role === 'bankOperator') {
      applications = await LoanApplication.find().select('status');
    } else {
      throw new Error('Unauthorized: Invalid role');
    }
    console.log("Saaaa......................")

    // Reset counts to 0 before counting
    status.forEach(s => s.count = 0);

    // Count each application's status
    applications.forEach(app => {
      console.log("Shweta......................")
      console.log(app.status)
      const match = status.find(s => s.key?.toLowerCase() === app.status?.toLowerCase());
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
      console.log(match)
      if (match) {
        match.count += 1;
      }
    });

    return status;
  } catch (error) {
    throw new Error('Error retrieving loan application status: ' + error.message);
  }
};

