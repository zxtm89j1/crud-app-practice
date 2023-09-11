const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/adduser", async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const newUser = new User({
      name: name,
      password: password,
      email: email,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occured!!!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occured!!!" });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const data = await User.findByIdAndDelete(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});
module.exports = router;
