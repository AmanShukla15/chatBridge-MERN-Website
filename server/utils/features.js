import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

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

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chatBridge", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Emmiting Event");
}

const deleteFilesFromCloudinary = async (public_ids) =>  {
  console.log("deleteFilesFromCloudinary")
}

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary
}