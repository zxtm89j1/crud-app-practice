const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const cors = require("cors");
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

// Configure CORS to allow requests from your frontend origin
app.use(
  cors({
    origin: "http://localhost:3001", // Replace with your frontend origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // This allows cookies and credentials to be sent with the request (if needed)
    optionsSuccessStatus: 204, // Some legacy browsers (IE11) may not return 204
  })
);

// app.get("/", (req, res) => {
//   res.send("Hello express!");
// });
app.use(express.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server listening to port 3000");
});
