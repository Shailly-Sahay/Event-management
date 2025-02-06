import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Event from "../models/event";
import { verifyToken } from "../middlewares";

const eventRouter = express.Router();

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
    }
  }
);

export default eventRouter;
