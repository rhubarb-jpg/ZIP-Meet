const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  // verify user
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  if (authorization.startsWith("Bearer")) {
    try {
      // retrieving token
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.SECRET);

      req.user = await User.findOne({ _id }).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Request not authorized" });
    }
  }
};

module.exports = { requireAuth };
