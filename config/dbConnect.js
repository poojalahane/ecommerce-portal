import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    //const url = `${process.env.MONGO_URI}`;
    const url = `mongodb+srv://pujalahane2024:uXRflwkhAA58OYgC@cluster0.xiixj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(
      "mongodb+srv://pujalahane2024:uXRflwkhAA58OYgC@cluster0.xiixj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongoDB connected successfully...");
  } catch (error) {
    console.log(error);
  }
};
