import mongoose from "mongoose";

export type EventType = {
  name: string;
  description: string;
  dateTime: Date;
  location: string;
  category: "conference" | "wedding" | "birthday" | "meetup";
  maxAttendees?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const eventSchema = new mongoose.Schema<EventType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateTime: { type: Date, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["conference", "wedding", "birthday", "meetup"],
    },
    maxAttendees: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Event = mongoose.model<EventType>("Event", eventSchema);

export default Event;
