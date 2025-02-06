import React from "react";

export type EventType = {
  name: string;
  description: string;
  dateTime: string;
  location: string;
  category: "conference" | "wedding" | "birthday" | "meetup";
  maxAttendees?: number;
  imageUrl?: string;
  priceRange?: string; // Optional, e.g., "$50 - $250"
};

const EventCard: React.FC<{ event: EventType }> = ({ event }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.imageUrl || "/placeholder.jpg"} // Default image if none
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        {event.priceRange && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
            {event.priceRange}
          </span>
        )}
      </div>

      {/* Event Details */}
      <div className="p-4">
        {/* Location */}
        <p className="text-gray-500 text-sm flex items-center">
          📍 {event.location}
        </p>

        {/* Date & Time */}
        <p className="text-gray-500 text-sm">
          📅 {new Date(event.dateTime).toDateString()} • ⏰{" "}
          {new Date(event.dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {/* Event Name */}
        <h3 className="text-lg font-semibold mt-2">{event.name}</h3>

        {/* Category */}
        <p className="text-gray-600 text-sm">{event.category}</p>

        {/* Attendee Limit (If applicable) */}
        {event.maxAttendees && (
          <p className="text-gray-500 text-sm">👥 Max: {event.maxAttendees}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-3">
          <button className="text-blue-500 flex items-center">🔗 Share</button>
          <button className="text-red-500">❤️</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
