import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from "../api/apiClient";
import { Button, EventForm, Event } from "../ui";
import { Plus } from "lucide-react";
import { EventType } from "../ui/components/Event";

const Dashboard = () => {
  const { isLoggedIn, showToast } = useAppContext();
  const { data, error, isLoading } = useQuery(["events"], apiClient.getEvents);

  console.log("Fetched Events:", data); // ✅ Now logs the correct response array

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="">
        {data.map((event: EventType) => (
          <Event event={event} />
        ))}
      </div>
      {isLoggedIn ? (
        <>
          <div className="h-full flex justify-center items-center">
            {" "}
            <Button
              label="create event"
              className="flex items-center gap-3"
              onClick={() => setShowForm(true)}
            >
              <Plus />
              <span>Create Event</span>
            </Button>
            {showForm && <EventForm />}
          </div>
        </>
      ) : (
        <p>No</p>
      )}
    </>
  );
};

export default Dashboard;
