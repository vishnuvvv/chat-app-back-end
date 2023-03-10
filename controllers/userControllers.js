import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res, next) => {
  let existingEmail;
  const { userName, email, password} = req.body;
  const imageFileString = JSON.stringify(req.body.imageFile);

  if (
    !userName ||
    userName.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Credentials !" });
  }

  try {
    existingEmail = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  if (existingEmail) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    userName,
    email,
    password: hashedPassword,
    imageFile:imageFileString
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unexpected error occured" });
  }

  return res.status(201).json({ user });
};


//###############################################################

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find the user from this id" });
  }

  const isPasswordTrue = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordTrue) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  return res
    .status(200)
    .json({ message: "Login is successful", token, id: existingUser._id });
};

