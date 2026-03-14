import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { usersCollection } from "../db/dbConnect.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await checkUser(user.password, password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    let token = user.token;
    if (!token) {
      token = uuidv4();
      await usersCollection.updateOne({ email }, { $set: { token } });
    }
    res.status(200).json({
      message: "login successfully",
      userId: user.ID,
      token: token,
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

async function checkUser(userHashedPassword, password) {
  return await bcrypt.compare(password, userHashedPassword);
}
