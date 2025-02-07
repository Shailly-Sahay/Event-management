import express, { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import Event, { EventType } from "../models/event";
import User from "../models/user";
import { verifyToken } from "../middlewares";
import multer from "multer";
import cloudinary from "cloudinary";
const eventRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

/**
 * @route   POST /events/create
 * @desc    Create a new event
 * @access  Private (Requires authentication)
 */
eventRouter.post(
  "/create",
  upload.array("image", 1),
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    check("name", "Event name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("dateTime", "A valid date and time is required").isISO8601(),
    check("location", "Location is required").not().isEmpty(),
    check("category", "Category is required").isIn([
      "conference",
      "wedding",
      "birthday",
      "meetup",
    ]),
    check("maxAttendees", "Max attendees must be a number")
      .optional()
      .isNumeric(),
  ],
  async (req: Request, res: Response) => {
    console.log(req.body);
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const image = req.files as Express.Multer.File[];
      const newEvent: EventType = req.body;

      // Upload image to cloudinary
      const uploadPromise = image.map(async (img) => {
        const b64 = Buffer.from(img.buffer).toString("base64");

        let dataURI = "data:" + img.mimetype + ";base64," + b64;

        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url;
      });
      const imageUrl = await Promise.all(uploadPromise);
      newEvent.imageUrl = imageUrl;
      newEvent.userId = req.userId;

      //   Save Event
      const event = new Event(newEvent);
      await event.save();

      res.status(201).json({ message: "Event created successfully", event });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
);

/**
 * @route   GET /api/events
 * @desc    Fetch events with optional filters (type, category, date)
 * @access  Public
 */
eventRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { type, category, date } = req.query;
    const currentDate = new Date();
    let query: any = {};

    // Filter by type (upcoming/past)
    if (type === "upcoming") {
      query.dateTime = { $gte: currentDate }; // Future events
    } else if (type === "past") {
      query.dateTime = { $lt: currentDate }; // Past events
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by date
    if (date) {
      const selectedDate = new Date(date as string);
      query.dateTime = {
        $gte: selectedDate,
        $lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000), // 1-day range
      };
    }

    const events = await Event.find(query).sort({ dateTime: 1 });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Register for event

/**
 * @route   POST /events/:eventId/register
 * @desc    Register a user for an event
 * @access  Private (User must be logged in)
 */

eventRouter.post(
  "/:eventId/register",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const eventId = req.params.eventId;
      const userId = req.userId;

      const event = await Event.findById(eventId);
      const user = await User.findById(userId);

      if (!event || !user) {
        res.status(404).json({ message: "Event or user not found" });
        return;
      }

      // Ensure the user is not already attending the event
      if (user.registeredEvents.includes(eventId)) {
        res
          .status(400)
          .json({ message: "User is already attending this event" });
        return;
      }

      // Ensure the event's `attendees` array exists
      if (!event.attendees) {
        event.attendees = [];
      }

      // Add user to event attendees list
      event.attendees.push(userId);
      await event.save();

      // Add event to user's registeredEvents list
      user.registeredEvents.push(eventId);
      await user.save();

      res
        .status(200)
        .json({ message: "Successfully registered for the event" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
);

/**
 * @route   GET /events/:eventId/attendees
 * @desc    Fetch attendees of an event
 * @access  Private (Only logged-in users)
 */
eventRouter.get(
  "/:eventId/attendees",
  verifyToken,

  async (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;
      const event = await Event.findById(eventId).populate(
        "attendees",
        "firstName lastName email"
      ); // Fetch attendees details

      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      res.status(200).json({ attendees: event.attendees });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
);

export default eventRouter;
