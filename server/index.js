import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import * as bcrypt from "bcrypt";
import validator from "validator";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const url = process.env.MONGODB_URI;
if (!url) {
  throw new Error("Missing MONGODB_URI in .env");
}
const client = new MongoClient(url);
const dbName = "smart_spend";

let usersCollection;
let expensesCollection;

async function connectDB() {
  await client.connect();
  const db = client.db(dbName);
  usersCollection = db.collection("users");
  expensesCollection = db.collection("expenses");
  console.log("Connected to MongoDB Atlas");
}

connectDB().catch((e) => console.error(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//bring back all spesific user expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId: new ObjectId(userId) } : {};
    const expenses = await expensesCollection.find(filter).toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
    console.error("Error fetching expenses", error);
  }
});

//add a new expense for a specific user
app.post("/api/expenses", async (req, res) => {
  try {
    const { amount, description, category, userId } = req.body;
    if (!userId) {
      res.status(400).json({ message: "userId is required" });
      return;
    }
    const expense = await expensesCollection.insertOne({
      amount,
      description,
      category,
      userId: new ObjectId(userId),
      date: new Date(),
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
    console.error("Error adding expense", error);
  }
});

//add a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findEmail = await usersCollection.findOne({ email: email });
    if (findEmail) {
      res.status(400).json({ message: "email already exist" });
      return;
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "email is not valid" });
      return;
    }
    const createdAt = new Date();
    const updatedAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObj = {
      name,
      email,
      password: hashedPassword,
      createdAt,
      updatedAt,
    };
    const result = await usersCollection.insertOne(userObj);
    if (!result) {
      return res.status(400);
    }
    return res.status(201).json({ message: "user created" });
  } catch (error) {
    res.json({ message: "insert user got massed up" });
  }
});

//delete an expense (only if it belongs to the user)
//how the client should delete an expense:
//DELETE /api/expenses/507f1f77bcf86cd799439011?userId=507f1f77bcf86cd799439011
app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ message: "userId is required" });
      return;
    }
    const result = await expensesCollection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Expense not found or not yours" });
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
