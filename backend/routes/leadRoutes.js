const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  convertLeadToCustomer,
} = require("../controllers/leadController");

router.route("/").get(protect, getLeads).post(protect, createLead);

router
  .route("/:id")
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

router.post("/:id/convert", protect, convertLeadToCustomer);

module.exports = router;
