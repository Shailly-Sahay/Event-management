import { Calendar, Clock, MapPin, PartyPopper, Users } from "lucide-react";
import React, { useState } from "react";
import { Button, AttendeeModal, Modal } from "../";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../../api/apiClient";
import { useMutation, useQueryClient } from "react-query";

export type EventType = {
  _id: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  category: "conference" | "wedding" | "birthday" | "meetup";
  maxAttendees: number;
  imageUrl?: string;
};

const Event: React.FC<{ event: EventType }> = ({ event }) => {
  const { isLoggedIn, showToast } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [attendees, setAttendees] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => apiClient.registerForEvent(event._id),
    onSuccess: async () => {
      showToast({ message: "Successfully registered!", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const hanldeAttendEvent = async () => {
    if (isLoggedIn) {
      mutate();
    } else {
      navigate("/sign-in");
    }
  };

  const handleShowAttendees = async () => {
    try {
      const fetchedAttendees = await apiClient.getEventAttendees(event._id);
      setAttendees(fetchedAttendees);
      setShowModal(true);
    } catch (error: any) {
      showToast({ message: error.message, type: "ERROR" });
    }
  };

  return (
    <div className="bg-white flex flex-col overflow-hidden rounded-xl shadow-lg ">
      {/* Event Image */}
      <div className="relative border border-white border-b-gray-50">
        <img
          src={event.imageUrl || "/placeholder.jpg"} // Default image if none
          alt={event.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-6 flex flex-col flrx-grow h-full justify-between">
        {/* Event Name */}
        <div>
          {" "}
          <h3 className="text-xl font-semibold">{event.name}</h3>
          <p className="text-sm  mb-6 line-clamp-4">{event.description}</p>
          {/* Location */}
          <p className="text-gray-500 text-sm flex items-center mb-1">
            <MapPin className="h-6 w-6 mr-4 stroke-red-600" /> {event.location}
          </p>
          {/* Date & Time */}
          <p className="text-gray-500 text-sm flex items-center mb-1">
            <Calendar className="h-6 w-6 mr-4 stroke-indigo-900" />
            {new Date(event.dateTime).toDateString()}
          </p>
          <p className="text-gray-500 text-sm flex items-center mb-1">
            <Clock className="h-6 w-6 mr-4 stroke-indigo-900" />
            {new Date(event.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {/* Category */}
          <p className="text-gray-500 text-sm flex items-center mb-1">
            <PartyPopper className="h-6 w-6 mr-4 stroke-indigo-900" />
            {event.category}
          </p>
          {/* Attendee Limit (If applicable) */}
          {event.maxAttendees && (
            <p className="text-gray-500 text-sm flex items-center mb-1">
              <Users className="h-6 w-6 mr-4 stroke-indigo-900" /> Max:{" "}
              {event.maxAttendees}
            </p>
          )}
        </div>

        <div>
          {/* Buttons */}
          <div className="flex justify-end  gap-2 flex-col lg:flex-row 2xl:gap-4 mt-3">
            <Button
              label="See Attendees"
              buttonType="secondary"
              onClick={handleShowAttendees}
            />
            <Button label="Attend Event" onClick={hanldeAttendEvent} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <AttendeeModal attendees={attendees} />
        </Modal>
      )}
    </div>
  );
};

export default Event;
