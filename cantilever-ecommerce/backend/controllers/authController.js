import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is erquired" });
    }
    if (!password) {
      return res.send({ message: "password is erquired" });
    }
    if (!email) {
      return res.send({ message: "email is erquired" });
    }
    if (!phone) {
      return res.send({ message: "phone is erquired" });
    }
    if (!address) {
      return res.send({ message: "address is erquired" });
    }
    if (!answer) {
      return res.send({ message: "answer is erquired" });
    }

    //check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already user please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();
    res.status(201).send({
      success: true,
      message: "User registared successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in regiatration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Error in login",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //token

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login error",
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.send({ message: "email is erquired" });
    }
    if (!newPassword) {
      return res.send({ message: "New Password is erquired" });
    }
    if (!answer) {
      return res.send({ message: "answer is erquired" });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or password",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset successfullly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//testController
export const testController = (req, res) => {
  console.log("protected route");
  res.send("protected route ");
};
