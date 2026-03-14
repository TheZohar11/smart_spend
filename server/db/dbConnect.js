import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error("Missing MONGODB_URI in .env");
}

const client = new MongoClient(url);
const dbName = "smart_spend";
let usersCollection;
let expensesCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);
    usersCollection = db.collection("users");
    expensesCollection = db.collection("expenses");
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error(e);
  }
}

export { connectDB, usersCollection, expensesCollection };
