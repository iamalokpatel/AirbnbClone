if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;
main()
  .then((res) => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67b6447a338bf96062dd8492",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
