//sever code here
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongoDB atlas connection string (from .env)
const url = process.env.MONGODB_URI;
if (!url) {
  throw new Error("Missing MONGODB_URI in .env ");
}
const client = new MongoClient(url);

// db name 
const dbName = "smart_spend";

async function main() {
  try {
    //connect to atlas database
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    //insert a new user
    const db = client.db(dbName);
    const userCollection = db.collection("users");
    await userCollection.insertOne({ 
      name:"Joseph", 
      email:"joseph@gmail.com", 
      password:"123456"
    });
    console.log("New user created");
    //get all users
    const users = await userCollection.find({}).toArray();
    console.log("All users", users);

    // expenses collection 
    const expensesCollection = db.collection("expenses");
    await expensesCollection.insertOne({
      amount: 50,
      description: "food",
      category: "meat",
      date: new Date(),
    });
    console.log("Sample expense added");
    const expenses = await expensesCollection.find({}).toArray();
    console.log("All expenses", expenses);

  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error);
  }

}

main().catch(console.error);