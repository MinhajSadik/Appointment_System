import { isAuthenticatedUser } from "../../middlewares/isAuthenticatedUser.js";

export const authorizeUserRoles = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  // const secret = process.env.JWT_SECRET;
  return [
    // authenticate JWT token and attach user to request object (req.user)
    isAuthenticatedUser,
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
