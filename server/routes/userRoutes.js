import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { checkUserPassword } from "./logic/checkUserPassword.js";
import { usersCollection } from "../db/dbConnect.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await checkUserPassword(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
    );
    res.status(200).json({
      message: "login successfully",
      accessToken,
    });
  } catch (e) {
    console.error("FULL ERROR LOG:", e); // This prints the EXACT error to your VS Code terminal
    res.status(500).json({
      message: "Server error",
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

export default router;
