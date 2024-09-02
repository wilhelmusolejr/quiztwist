import { Quiz } from "../models/quiz.model.js";
import { User } from "../models/user.model.js";

export const addPoints = async (req, res) => {
  const { user, points, type } = req.body;

  console.log(req.body);

  try {
    // Create a new quiz entry
    const quiz = new Quiz({
      user: user, // Assuming user._id is an ObjectId
      points,
      type,
    });

    await quiz.save();

    // Find the user by ID
    const dbUser = await User.findById(user);

    if (!dbUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the user's points
    dbUser.points += points;

    await dbUser.save();

    return res.status(201).json({
      success: true,
      message: "Points added",
      quiz,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
