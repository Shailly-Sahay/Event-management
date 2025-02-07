import React from "react";

type Attendee = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type AttendeeModalProps = {
  attendees: Attendee[];
};

const AttendeeModal: React.FC<AttendeeModalProps> = ({ attendees }) => {
  return (
    <div className="bg-white p-6  w-full">
      <h3 className="text-lg text-gray-600 font-bold mb-8">Event Attendees</h3>

      {attendees.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {attendees.map((attendee, index) => (
            <li key={attendee._id} className="p-4 border-b-2">
              <p className="text-sm">
                {index + 1}. {attendee.firstName} {attendee.lastName}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendees registered yet.</p>
      )}
    </div>
  );
};

export default AttendeeModal;
