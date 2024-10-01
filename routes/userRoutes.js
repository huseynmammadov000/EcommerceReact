const express = require("express");
const router = express.Router();

const User = require("../models/User");


const {isAdmin} = require("../middlewares/isAdmin");
const { authenticateAccessToken } = require("../middlewares/AuthenticateAccessToken");

router.get("/", authenticateAccessToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", authenticateAccessToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/edit/:id", authenticateAccessToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/delete/:id",authenticateAccessToken,isAdmin,async (req, res) =>{
    try {
      const status = await Product.findByIdAndDelete(req.params.id);
      res.json(status ? "User deleted successfully" : "Error");
    } catch (error) {
      res.json({ message: error });
    }
  }
);

module.exports = router;