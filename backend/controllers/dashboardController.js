const Lead = require("../models/Lead");
const Customer = require("../models/Customer");

// @route   GET /api/dashboard/stats
// @desc    Get summary counts for the dashboard cards (real DB data)
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const [totalLeads, newLeads, contactedLeads, convertedLeads, totalCustomers] =
      await Promise.all([
        Lead.countDocuments({ owner: ownerId }),
        Lead.countDocuments({ owner: ownerId, status: "New" }),
        Lead.countDocuments({ owner: ownerId, status: "Contacted" }),
        Lead.countDocuments({ owner: ownerId, status: "Converted" }),
        Customer.countDocuments({ owner: ownerId }),
      ]);

    return res.json({
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      totalCustomers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while fetching dashboard stats" });
  }
};

module.exports = { getDashboardStats };
