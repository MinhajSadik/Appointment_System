//every authorize role checker
export const authorizeUserRoles = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    // authorize user against roles
    async (req, res, next) => {
      if (req.user) {
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(401).json({
            message: `${req.user.role} are not authorize to perform this action`,
          });
        }
      }
      next();
    },
  ];
};
