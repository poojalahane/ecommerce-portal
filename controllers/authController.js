import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //!  validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    if (!answer) {
      return res.send({ error: "Answer is Required" });
    }

    //!check user
    const existingUser = await userModel.findOne({ email });
    //! existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //! register user
    const hashedPassword = await hashPassword(password);
    //! save
    const user = await new userModel({
      name,
      answer,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully...",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //!  validations

    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }

    //!check user
    const user = await userModel.findOne({ email });
    //! existing user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found, please register first",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //! token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User login Successfully...",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

//!  forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }

    if (!newPassword) {
      res.status(400).send({ message: "new password is required" });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //! validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully..",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Somehing went wrong",
      error,
    });
  }
};

//! updateProfileController
export const updateProfileController = async (req, res) => {
  try {
    const { email, name, password, phone, address } = req.body;

    //!check user
    const user = await userModel.findById(req.user._id);
    //! existing user
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not exists",
      });
    }

    //! password
    // if (!password && password.length < 3) {
    //   return res.json({ error: "Password is required and 3 character long" });
    // }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    //! update user

    //! save
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,

        address: address || user.address,
      },
      { new: true }
    );

    console.log(user);
    res.status(200).send({
      success: true,
      message: "User Updated Successfully...",
      updateUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//! tesst controller
export const testController = (req, res) => {
  console.log("protected routes");
  res.send("procted routes..");
};
