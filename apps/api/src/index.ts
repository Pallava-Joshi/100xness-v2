import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { authRouter } from "./router/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
