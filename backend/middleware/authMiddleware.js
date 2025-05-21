// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// authMiddleware can accept an array of allowed roles
const authMiddleware = (allowedRoles) => (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token; // Accesses the token from the request cookies

  if (!token) {
    console.log('AuthMiddleware: No token found in cookies.'); // Debug log
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token using the secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (id, role) to the request object

    console.log('AuthMiddleware: Token successfully decoded for user:', req.user.username, 'Role:', req.user.role); // Debug log

    // If allowedRoles are specified, check if user's role is in allowedRoles
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(req.user.role)) {
        console.log('AuthMiddleware: Forbidden - User role', req.user.role, 'is not in allowed roles:', allowedRoles); // Debug log
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
    }
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    // This catch block handles any errors during token verification (e.g., invalid signature, expired token)
    console.error("AuthMiddleware Error: Token Verification Failed!"); // High-level error indication
    console.error("  Error Message:", err.message); // Specific JWT error message (e.g., "jwt malformed", "invalid signature", "jwt expired")
    console.error("  Full Error Object:", err); // Log the entire error object for detailed inspection

    // Provide a generic unauthorized message to the client for security reasons
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;