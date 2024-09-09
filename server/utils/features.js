import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const data = await mongoose.connect(uri, {
      dbName: "ChatBridge",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB: ${data.connection.host}`);
  } catch (err) {
    console.error("Failed to connect to DB", err);
    throw err;
  }
};

export {
  connectDB,
}