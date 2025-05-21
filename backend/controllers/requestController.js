// backend/controllers/requestController.js
const Request = require('../models/Request');
const Software = require('../models/Software');
const User = require('../models/User'); // Used for populating user/approver info

// Request access to software (Employee/User role)
const requestAccess = async (req, res) => {
  const { softwareId, accessLevel, reason } = req.body;
  const userId = req.user.id; // User ID from auth middleware

  console.log('Backend: Incoming Request Body:', req.body); // Debug log
  console.log('Backend: Extracted softwareId:', softwareId); // Debug log
  console.log('Backend: Extracted accessLevel:', accessLevel); // Debug log
  console.log('Backend: User ID from token:', userId); // Debug log
  console.log('Backend: Request access attempt by user:', userId, 'for software:', softwareId);

  try {
    // Validate input
    if (!softwareId || !accessLevel) {
      return res.status(400).json({ message: 'Software ID and access level are required.' });
    }

    // Check if the software actually exists
    const software = await Software.findById(softwareId);
    if (!software) {
      return res.status(404).json({ message: 'Software not found.' });
    }

    // Check if the requested access level is valid for the software
    if (!software.accessLevels.includes(accessLevel)) {
        return res.status(400).json({ message: `Invalid access level for ${software.name}. Available levels: ${software.accessLevels.join(', ')}` });
    }

    // Prevent duplicate requests (optional, but good practice)
    const existingRequest = await Request.findOne({
      user: userId,
      software: softwareId,
      accessLevel: accessLevel,
      status: 'Pending' // Check for pending requests
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this software and access level.' });
    }

    const newRequest = new Request({
      user: userId,
      software: softwareId,
      accessLevel,
      reason,
      status: 'Pending'
    });

    await newRequest.save();
    console.log('Backend: Software access request created successfully:', newRequest);
    res.status(201).json({ message: 'Software access request submitted successfully!', request: newRequest });
  } catch (err) {
    console.error('Backend: Error submitting access request:', err); // CRITICAL: Log the actual error
    res.status(500).json({ message: 'Failed to submit access request.' });
  }
};

// Admin/Approver: List all requests (for managers/admins)
const listAllRequests = async (req, res) => {
    console.log('Backend: Fetching all access requests.');
    try {
        const requests = await Request.find()
            .populate('user', 'username email') // Populate user details
            .populate('software', 'name description'); // Populate software details
        console.log('Backend: Fetched all requests:', requests);
        res.json(requests);
    } catch (err) {
        console.error('Backend: Error fetching all requests:', err);
        res.status(500).json({ message: 'Failed to fetch requests.' });
    }
};

// NEW: Employee: List their own requests
const listMyRequests = async (req, res) => {
    const userId = req.user.id; // Get user ID from the authenticated token
    console.log('Backend: Fetching requests for user:', userId);
    try {
        const myRequests = await Request.find({ user: userId }) // Filter by logged-in user's ID
            .populate('software', 'name description') // Populate software details
            .sort({ requestDate: -1 }); // Sort by most recent requests first
        console.log('Backend: Fetched my requests:', myRequests);
        res.json(myRequests);
    } catch (err) {
        console.error('Backend: Error fetching my requests:', err);
        res.status(500).json({ message: 'Failed to fetch your requests.' });
    }
};

// Admin/Approver: Approve/Reject a request
const updateRequestStatus = async (req, res) => {
    const { requestId } = req.params;
    const { status, reason } = req.body; // status: 'Approved' or 'Rejected'
    const approverId = req.user.id; // Admin user ID from auth middleware

    console.log('Backend: Updating request status for:', requestId, 'to:', status);

    try {
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Access request not found.' });
        }

        // Only allow status change from Pending
        if (request.status !== 'Pending') {
            return res.status(400).json({ message: `Request is already ${request.status}. Cannot change.` });
        }

        request.status = status;
        request.responseDate = Date.now();
        request.approver = approverId; // Record who approved/rejected
        request.reason = reason || request.reason; // Update reason if provided

        await request.save();
        console.log('Backend: Request status updated:', request);
        res.json({ message: `Request ${status} successfully!`, request });
    } catch (err) {
        console.error('Backend: Error updating request status:', err); // CRITICAL: Log the actual error
        res.status(500).json({ message: 'Failed to update request status.' });
    }
};

module.exports = {
  requestAccess,
  listAllRequests,
  listMyRequests, // <<< EXPORT THE NEW FUNCTION
  updateRequestStatus
};
