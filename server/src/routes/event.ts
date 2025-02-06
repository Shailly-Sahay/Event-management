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
 * @route   POST /events/:eventId/attend
 * @desc    Register user for an event
 * @access  Private (Requires authentication)
 */
// eventRouter.post(
//   "/:eventId/attend",
//   verifyToken,
//   async (req: AuthenticatedRequest, res: Response) => {
//     try {
//       const eventId = req.params.eventId;
//       const userId = req.userId; // ✅ FIXED: Make sure `req.userId` exists

//       if (!userId) {
//         res.status(401).json({ message: "Unauthorized: No user ID found" });
//         return;
//       }

//       const event = await Event.findById(eventId);
//       const user = await User.findById(userId);

//       if (!event) {
//         return res.status(404).json({ message: "Event not found" });
//       }

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Check if user is already attending
//       if (event.attendees.includes(userId)) {
//         return res
//           .status(400)
//           .json({ message: "User is already attending this event" });
//       }

//       // Add user to event attendees list
//       event.attendees.push(userId);
//       await event.save();

//       // Add event to user's registeredEvents list
//       user.registeredEvents.push(eventId);
//       await user.save();

//       res
//         .status(200)
//         .json({ message: "Successfully registered for the event" });
//       return;
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );

export default eventRouter;
