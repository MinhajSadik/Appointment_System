import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../../configs/config.env" });

// every authorize role checker
export const authorizeUserRoles = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    async (req, res, next) => {
      try {
        const token = req.headers.authorization;
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
        }

        return next();
      } catch (error) {
        return res.status(401).json({
          message: `Unauthorized: ${error.message}`,
        });
      }
    },

    // authorize user roles
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({
          message: `${req.user.role} is not authorized to access this resource`,
        });
      }
      // authentication and authorization succeeded
      return next();
    },
  ];
};

// export const authorizeUserRoles = (roles = []) => {
//   if (typeof roles === "string") {
//     roles = [roles];
//   }
//   return async (req, res, next) => {
//     try {
//       const token = req.cookies.token;
//       if (token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//       }
//       if (roles.length && !roles.includes(req.user.role)) {
//         // user's role is not authorized
//         return res.status(401).json({
//           message: `${req.user.role} is not authorized to access this resource`,
//         });
//       }
//       // authentication and authorization succeeded
//       return next();
//     } catch (error) {
//       return res.status(401).json({
//         message: `Unauthorized: ${error.message}`,
//       });
//     }
//   };
// };
