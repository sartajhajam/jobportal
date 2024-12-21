import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected....");
      } catch (error){
        console.log("Error connecting to MonggoDB",error.message);
        process.exit(1);
    }
};

export default connectDB;