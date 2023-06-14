import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as url from "url";

import dbConnection from "./database/connect.js";
import authRoute from "./routes/auth.js";
import uploadPhoto from "./routes/uploadPhoto.js";
import places from "./routes/places.js";
import reserve from "./routes/reserve.js";

const app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/auth", authRoute);
app.use("/uploads", uploadPhoto);
app.use("/places", places);
app.use("/reservation", reserve);

app.listen(process.env.PORT, async () => {
  console.log(`server started at port ${process.env.PORT}`);
  dbConnection();
});
