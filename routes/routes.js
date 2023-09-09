const express = require("express");
const app = express();
const User = require("../models/User");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Homepage of GET method!")
})

router.post("/adduser", async (req, res) => {
  try {
      const {name, password, email} = req.body;

      const newUser = new User({
        name: name,
        password: password,
        email: email,
      });

      await newUser.save();

      res.status(201).json(newUser);

  } catch(error) {
      console.error(error);
      res.status(500).json({error: "An error occured!!!"})
  }


});

module.exports = router;
