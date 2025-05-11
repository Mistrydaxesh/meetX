const Booking = require("../models/booking");
const Activity = require("../models/activity");

exports.bookActivity = async (req, res) => {
  try {
    const { activityId } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activityId,
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "You already booked this activity" });
    }

    const booking = new Booking({
      user: req.user._id,
      activity: activityId,
    });

    await booking.save();
    res.status(201).json({ message: "Activity booked successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('activity')
      .sort({ bookedAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};