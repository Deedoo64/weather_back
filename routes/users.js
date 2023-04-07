var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const User = require("../models/users");

// Includes the function checkBody
const { checkBody } = require("../modules/checkBody");

router.post("/signup", (req, res) => {
  console.log("REQUEST POST SIGNUP", req.body);

  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  // Check if the User already exists

  User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((dbData) => {
    if (dbData === null) {
      // Create a new User
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // Finally save in database
      newUser.save().then((savedUser) => {
        res.json({ result: true });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

//==========================================  SIGN IN
router.post("/signin", (req, res) => {
  console.log("REQUEST POST SIGNUP", req.body);

  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  // Check if the User exists

  User.findOne({
    email: { $regex: new RegExp(req.body.email, "i") },
  }).then((dbData) => {
    if (dbData === null) {
      res.json({ result: false, error: "User not found" });
      return;
    }

    res.json({ result: true });
  });
});

// router.get("/", (req, res) => {
//   City.find().then((data) => {
//     res.json({ weather: data });
//   });
// });

// router.get("/:cityName", (req, res) => {
//   City.findOne({
//     cityName: { $regex: new RegExp(req.params.cityName, "i") },
//   }).then((data) => {
//     if (data) {
//       res.json({ result: true, weather: data });
//     } else {
//       res.json({ result: false, error: "City not found" });
//     }
//   });
// });

router.delete("/:cityName", (req, res) => {
  City.deleteOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      // document successfully deleted
      City.find().then((data) => {
        res.json({ result: true, weather: data });
      });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

module.exports = router;
