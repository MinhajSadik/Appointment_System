import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../../models/userModel.js";
dotenv.config({ path: "../../configs/config.env" });

export const authorizeUserRoles = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return async (req, res, next) => {
    try {
      // authenticate JWT token and attach user to request object (req.user)
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;
      // const token = req.cookies.token;

      if (token && isCustomAuth) {
        // if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        req.user = user;
      }

      // check if user's role is authorized
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(401).json({
          message: `${user.role} is not authorized to access this resource`,
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        message: `Unauthorized: ${error.message}`,
      });
    }
  };
};
