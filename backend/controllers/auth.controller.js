import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../Utils/generateTokenAndSetCookie.js";
import { sendGreeting } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, birthdate, password } = req.body;

  try {
    // Validate the data
    if (!firstName || !lastName || !email || !birthdate || !password) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        sucess: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      birthdate,
      password: hashedPassword,
    });

    await user.save();

    // jwt
    const token = generateTokenAndSetCookie(res, user._id);

    await sendGreeting("wilhelmus.olejr@gmail.com", user.firstName);

    return res.status(201).json({
      sucess: true,
      message: "User created",
      token: token,
      user: {
        ...user._doc,
        password: "tite",
      },
    });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate the data
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid credentials",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
      sucess: true,
      message: "User logged in",
      user: {
        ...user._doc,
        password: "tite",
      },
    });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const getUpdatedUser = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        ...user._doc,
        password: "tite",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
