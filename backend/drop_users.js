import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://wilhelmusolejr:qibKOFik4NzTa6bX@quiztwist.yembz.mongodb.net/quiztwist_db";

async function deleteAllDocuments() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete all documents from the collection
    const result = await mongoose.connection.db
      .collection("users")
      .deleteMany({});
    console.log("Documents deleted:", result.deletedCount);
  } catch (error) {
    console.error("Error deleting documents:", error);
  } finally {
    // Close the connection
    await mongoose.disconnect();
  }
}

deleteAllDocuments();
