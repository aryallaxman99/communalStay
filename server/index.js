import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnection from "./database/connect.js";
import authRoute from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(process.env.PORT, async () => {
  console.log(`server started at port ${process.env.PORT}`);
  dbConnection();
});
