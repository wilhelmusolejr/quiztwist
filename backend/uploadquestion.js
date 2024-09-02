import { MongoClient } from "mongodb";
import fs from "fs";

async function uploadQuestions() {
  const uri =
    "mongodb+srv://wilhelmusolejr:qibKOFik4NzTa6bX@quiztwist.yembz.mongodb.net/quiztwist_db";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("quiztwist_db");
    const collection = database.collection("questions");

    const data = JSON.parse(fs.readFileSync("backend/questions.json", "utf-8"));

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

uploadQuestions().catch(console.error);
