import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = "smart_spend";

if (!url) {
  throw new Error("Missing MONGODB_URI in .env");
}

const client = new MongoClient(url);

export let usersCollection;
export let expensesCollection;

export async function connectDB() {
  try {
    await client.connect();
    const db = client.db(dbName);
    usersCollection = db.collection("users");
    expensesCollection = db.collection("expenses");
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("Database connection failed:", e);
    throw e;
  }
}
