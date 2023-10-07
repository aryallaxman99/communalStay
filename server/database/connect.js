import mongoose from "mongoose";
import config from "../config/dbConfig.json" assert { type: "json" };

const Connection = async () => {
  try {
    await mongoose.connect(config.uri);
    // await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongoose");
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to db");
});

mongoose.connection.on("error", (err) => {
  console.error(`error on mongoose ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected");
});

process.on("SIGNIT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default Connection;
