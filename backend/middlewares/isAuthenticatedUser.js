import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  try {
    //check if the token is string or not
    if (typeof req.headers.authorization === "string") {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;

      if (token && isCustomAuth) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        req.user = user;
      }
      return next();
    } else {
      //if token is not string
      const token = req.headers.token;
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        req.user = user;
        return next();
      }
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Server Error: ${error.message}`,
    });
  }
};

// export const isAuthenticatedUser2 = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;
//     // const token = req.cookies.token;

//     if (token && isCustomAuth) {
//       // if (token) {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await UserModel.findById(decoded.id);
//       req.user = user;
//     }
//     return next();
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       message: `Server Error: ${error.message}`,
//     });
//   }
// };

// export const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (req.user) {
//       if (roles.length && !roles.includes(req.user.role)) {
//         return res.status(401).json({
//           message: `${req.user.role} you are not authorized to perform this action`,
//         });
//       }
//     }
//     return next();
//   };
// };
