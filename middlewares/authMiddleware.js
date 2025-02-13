import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//! protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//! admin access
export const isAdmin = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
