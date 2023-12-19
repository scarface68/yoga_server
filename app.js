const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const monogoDB_url =
  process.env.MONGODB_URL || "mongodb://localhost:27017/yoga";
mongoose
  .connect(monogoDB_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  // Assuming you have a user database or an array of users
  // Retrieve the user details based on the userId
  const user = getUserById(userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find().exec();

  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Users not found" });
  }
});

const CompletePayment = () => {
  return "Payment Successful";
};

app.post("/enroll", (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    dateOfBirth: req.body.dob,
    batch: req.body.selectedBatch,
  });
  user
    .save()
    .then(() => {
      console.log("User enrolled successfully");
      res.status(200).json({ message: "User enrolled successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

app.post("/payment", (req, res) => {
  CompletePayment();
  res.status(200).json({ message: "Payment successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
