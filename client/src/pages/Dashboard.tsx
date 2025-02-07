import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useQuery } from "react-query";
import * as apiClient from "../api/apiClient";
import { Button, EventForm, Modal, EventList } from "../ui";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const [eventType, setEventType] = useState<"upcoming" | "past">("upcoming");
  const [filters, setFilters] = useState({ category: "", date: "" });
  const { isLoggedIn } = useAppContext();
  const [showForm, setShowForm] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ["events", eventType, filters],
    queryFn: () =>
      apiClient.getFilteredEvents({
        type: eventType,
        category: filters.category,
        date: filters.date,
      }),
    staleTime: 1000 * 60,
  });

  return (
    <div className="section-pd-x section-pd-y relative">
      {/* Create Event Button */}
      {isLoggedIn && (
        <div className="z-10 fixed top-[90%] right-11 flex justify-center items-center">
          <Button
            label="Create Event"
            className="flex items-center gap-3"
            onClick={() => setShowForm(true)}
          >
            <Plus />
          </Button>

          {/* Modal for EventForm */}
          <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
            <EventForm />
          </Modal>
        </div>
      )}

      {/* Toggle Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-0">
        <h2 className="mb-12 text-gray-800 grow-0">
          {eventType === "upcoming" ? "Upcoming Events" : "Past Events"}
        </h2>

        <div className="flex  gap-4 md:justify-end">
          {" "}
          <div className="relative">
            <label className="sr-only" htmlFor="category-filter">
              Filter by Category
            </label>
            <select
              id="category-filter"
              className="border p-2 rounded bg-white shadow-sm"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            >
              <option value="">All Categories</option>
              <option value="conference">Conference</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>{" "}
          <div className="relative">
            <input
              type="datetime-local"
              className="border p-2 rounded bg-white shadow-sm"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-12 w-[20%]">
        <Button
          label="Upcoming"
          buttonType={eventType === "upcoming" ? "primary" : "secondary"}
          onClick={() => setEventType("upcoming")}
          className={`justify-center transition-all duration-300 px-6 py-2 rounded ${
            eventType === "upcoming" ? "grow" : ""
          }`}
        />
        <Button
          label="Past"
          buttonType={eventType === "past" ? "primary" : "secondary"}
          onClick={() => setEventType("past")}
          className={`justify-center transition-all duration-300 px-6 py-2 rounded ${
            eventType === "past" ? "grow" : ""
          }`}
        />
      </div>

      {/* Only this EventList Component Will Re-render */}
      <EventList events={events} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
