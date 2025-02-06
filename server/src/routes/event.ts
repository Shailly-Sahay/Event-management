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

eventRouter.get("/fetch", async (req: Request, res: Response) => {
  try {
    const { category, location, sortBy } = req.query;

    let query: any = {};
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: "i" };

    let sortOption: any = {};
    if (sortBy === "date") {
      sortOption.dateTime = 1; // Sort by date ascending
    } else if (sortBy === "name") {
      sortOption.name = 1; // Sort alphabetically
    }

    // Fetch events from DB with filters & sorting
    const response = await Event.find(query).sort(sortOption);
    console.log(response);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default eventRouter;
