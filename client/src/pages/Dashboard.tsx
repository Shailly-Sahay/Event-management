import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/apiClient";
import { Button, EventForm } from "../ui";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { isLoggedIn, showToast } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
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
