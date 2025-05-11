const express = require("express");
const router = express.Router();
const {
  bookActivity,
  getMyBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/book", authMiddleware, bookActivity);
router.get('/myBooking', authMiddleware, getMyBookings);
module.exports = router;
