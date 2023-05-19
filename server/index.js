import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import Connection from "./database/connect.js";
import authRoute from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/auth", authRoute);

app.listen(process.env.PORT, async () => {
  console.log(`server started at port ${process.env.PORT}`);
  Connection();
});
