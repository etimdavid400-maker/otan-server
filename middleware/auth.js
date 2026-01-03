import admin from "../firebase.js";
import User from "../models/userModel.js"; // we'll create this model

// Verify Firebase token middleware
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Check role middleware
export const checkRole = (role) => async (req, res, next) => {
  try {
    const user = await User.findById(req.uid);

    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient permission" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
