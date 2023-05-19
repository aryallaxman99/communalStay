import "dotenv/config";
import express from "express";
import Connection from "./database/connect.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/register", (req, res) => {
  res.send(req.body);
});

app.listen(process.env.PORT, async () => {
  console.log(`server started at port ${process.env.PORT}`);
  Connection();
});
