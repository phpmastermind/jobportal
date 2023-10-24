// node packages
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
// custom modules
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMv from "./middlewares/errorMw.js";

dotenv.config();

// connect mongodb
connectDB();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
// middleware
app.use(errorMv);

app.listen(PORT, () => {
  console.log(`Server listening to http://localhost:${PORT}/`);
});
