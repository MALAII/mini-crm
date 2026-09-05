// @route   PUT /api/leads/:id
// @desc    Update an existing lead
// @access  Private
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    // Prevent editing after customer conversion
    if (lead.convertedToCustomer) {
      return res.status(400).json({
        message:
          "This lead has already been converted into a customer and cannot be edited.",
      });
    }

    const { name, email, phone, company, status } = req.body;

    lead.name = name ?? lead.name;
    lead.email = email ?? lead.email;
    lead.phone = phone ?? lead.phone;
    lead.company = company ?? lead.company;
    lead.status = status ?? lead.status;

    const updatedLead = await lead.save();

    return res.json(updatedLead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while updating lead",
    });
  }
};