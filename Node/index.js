import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as env from "dotenv";
import userRouter from "./Routes/userRoutes.js";
env.config();
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB Atlas");
} catch (error) {
  console.error("Error connecting to MongoDB Atlas:", error);
  process.exit(1);
}

app.use("/user", userRouter);

app.listen(3003, function (error) {
  if (error) console.log(error);
  console.log("Server listening on PORT 3003");
});
