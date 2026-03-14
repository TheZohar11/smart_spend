import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

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

let userCollection;
let expensesCollection;

async function connectDB() {
  await client.connect();
  const db = client.db(dbName);
  userCollection = db.collection("users");
  expensesCollection = db.collection("expenses");
  console.log("Connected to MongoDB Atlas");
}

connectDB().catch((e) => console.error(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await expensesCollection.find({}).toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
    console.error("Error fetching expenses", error);
  }
});

app.post("/api/expenses", async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const expense = await expensesCollection.insertOne({
      amount,
      description,
      category,
      date: new Date(),
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
    console.error("Error adding expense", error);
  }
});

// Example: Insert a new user (for demonstration, not a route)
// (Remove or comment out in production)
/*
async function demoInsertUser() {
  await userCollection.insertOne({
    name: "Joseph",
    email: "joseph@gmail.com",
    password: "123456",
  });
  console.log("New user created");
  const users = await userCollection.find({}).toArray();
  console.log("All users", users);
}
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
