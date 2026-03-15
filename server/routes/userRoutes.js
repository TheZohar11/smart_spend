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
      { expiresIn: "1h" },
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    //need to save refresh token in db

    res.status(200).json({
      message: "login successfully",
      accessToken,
      refreshToken,
    });
  } catch (e) {
    console.error("FULL ERROR LOG:", e);
    res.status(500).json({
      message: "Server error",
      errorName: e.name,
      errorMessage: e.message,
    });
  }
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401);
  }
  //check if refresh tokem is in db and then need to verify
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403);
    }
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ accessToken });
  });
});

router.delete("/logout", (req, res) => {
  //delete all tokens in db exeprt the one in req (token !== req.body.token)
});
export default router;
