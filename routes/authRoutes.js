const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("phone", "Phone is required").not().isEmpty(),
    check("password", "Password must be 4+ characters").isLength({ min: 4 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  register
);

router.post(
  "/login",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  login
);
module.exports = router;
