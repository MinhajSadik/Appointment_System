import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../../configs/config.env" });

export const authorizeUserRoles = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  const secret = process.env.JWT_SECRET;
  return [
    // authenticate JWT token and attach user to request object (req.user)
    async (req, res, next) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({
          message: `Server Error: ${error.message}`,
        });
      }
    },
    // authorize user roles
    async (req, res, next) => {
      if (req.user) {
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(401).json({
            message: `${req.user.role} you are not authorized to perform this action`,
          });
        }
      }
      return next();
    },
  ];
};
