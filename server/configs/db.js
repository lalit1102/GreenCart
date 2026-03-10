// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));
// };
// // import mongoose from "mongoose";

// // const connectDB = async () => {
// //     try {
// //         mongoose.connection.on("connected", () => {
// //             console.log("MongoDB connected");
// //         });
// //         await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
// //     } catch (error) {
// //         console.error("MongoDB connection error:", error);
// //     }
// // };

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;