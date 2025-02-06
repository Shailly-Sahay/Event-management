import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Event from "../models/event";
import User from "../models/user";
import { verifyToken } from "../middlewares";

const eventRouter = express.Router();

// interface AuthenticatedRequest extends Request {
//   userId?: string;
// }

/**
 * @route   POST /events/create
 * @desc    Create a new event
 * @access  Private (Requires authentication)
 */
eventRouter.post(
  "/create",
  verifyToken,
  [
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
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { name, description, dateTime, location, category, maxAttendees } =
        req.body;

      // Create new event
      const event = new Event({
        name,
        description,
        dateTime,
        location,
        category,
        maxAttendees,
      });

      await event.save(); // Save event to database

      res.status(201).json({ message: "Event created successfully", event });
      return;
    } catch (error) {
      console.error(error);
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
