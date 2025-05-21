// backend/controllers/softwareController.js
const Software = require('../models/Software'); // <<< UNCOMMENTED

// Admin only: Create software
const createSoftware = async (req, res) => {
  const { name, description, accessLevels } = req.body;
  console.log('Backend: Create software attempt for:', name);
  try {
    // Basic validation (ensure essential fields are present)
    if (!name || !description || !accessLevels || accessLevels.length === 0) {
      console.log('Backend: Missing required fields for software creation');
      return res.status(400).json({ message: 'All fields are required for software.' });
    }

    // Check if software with the same name already exists
    const existingSoftware = await Software.findOne({ name });
    if (existingSoftware) {
      console.log('Backend: Software with this name already exists:', name);
      return res.status(400).json({ message: 'Software with this name already exists.' });
    }

    const software = new Software({ name, description, accessLevels });
    await software.save();
    console.log('Backend: Software created successfully:', software);

    res.status(201).json({ message: 'Software created successfully', software });
  } catch (err) {
    console.error('Backend: Error creating software:', err); // CRITICAL: Log the actual error
    res.status(500).json({ message: 'Failed to create software' });
  }
};

// List all software - used for dropdown on frontend
const listSoftware = async (req, res) => {
  console.log('Backend: Fetching all software list.');
  try {
    // Only return name and _id for the dropdown efficiency
    const softwareList = await Software.find({}, 'name description'); // Get name and description
    console.log('Backend: Fetched software list:', softwareList);
    res.json(softwareList);
  } catch (err) {
    console.error('Backend: Error fetching software list:', err);
    res.status(500).json({ message: 'Failed to fetch software list' });
  }
};

module.exports = {
  createSoftware,
  listSoftware,
};