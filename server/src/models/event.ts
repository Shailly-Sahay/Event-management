import mongoose from "mongoose";

export type EventType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  dateTime: Date;
  location: string;
  category: "conference" | "wedding" | "birthday" | "meetup";
  maxAttendees?: number;
  imageUrl: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

const eventSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["conference", "wedding", "birthday", "meetup"],
    },
    maxAttendees: { type: Number, required: true, min: 1 },
    imageUrl: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Event = mongoose.model<EventType>("Event", eventSchema);

export default Event;
