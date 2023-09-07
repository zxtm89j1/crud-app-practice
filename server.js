const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
dotenv.config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Open the connection
db.once("open", function () {
  console.log("Connected successfully to DB!");
});

// app.get("/", (req, res) => {
//   res.send("Hello express!");
// });
app.use(express.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server listening to port 3000");
});
