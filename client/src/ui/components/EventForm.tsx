import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../api/apiClient";
import { Button } from "../../ui";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type EventFormData = {
  name: string; // Event Name
  description: string; // Event Description
  dateTime: string; // Event Date & Time
  location: string; // Event Location (Physical/Online)
  category: string; // Event Category (Conference, Birthday, etc.)
  maxAttendees?: number; // Maximum Attendees
};

const EventForm = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    mutate,
    formState: { errors },
  } = useForm<EventFormData>();

  const mutation = useMutation(apiClient.createEvent, {
    onSuccess: async () => {
      showToast({ message: "Event created Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries("validate-token");
      //   navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <form
      className="flex flex-col gap-5 lg:px-[10rem] 2xl:px-[22rem] p-6 bg-white shadow-md rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold">Create an Event</h2>

      {/* Event Name */}
      <label className="text-label flex-1">
        Event Name
        <input
          type="text"
          className="text-input border p-2 rounded w-full"
          {...register("name", { required: "Event Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      {/* Description */}
      <label className="text-label flex-1">
        Description
        <textarea
          className="text-input border p-2 rounded w-full"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      {/* Date & Time */}
      <label className="text-label flex-1">
        Date & Time
        <input
          type="datetime-local"
          className="text-input border p-2 rounded w-full"
          {...register("dateTime", { required: "Date & Time is required" })}
        />
        {errors.dateTime && (
          <span className="text-red-500">{errors.dateTime.message}</span>
        )}
      </label>

      {/* Location */}
      <label className="text-label flex-1">
        Location
        <input
          type="text"
          className="text-input border p-2 rounded w-full"
          {...register("location", { required: "Location is required" })}
        />
        {errors.location && (
          <span className="text-red-500">{errors.location.message}</span>
        )}
      </label>

      {/* Category */}
      <label className="text-label flex-1">
        Category
        <select
          className="text-input border p-2 rounded w-full"
          {...register("category", { required: "Category is required" })}
        >
          <option value="">Select a category</option>
          <option value="conference">Conference</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="meetup">Meetup</option>
        </select>
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}
      </label>

      {/* Max Attendees (Optional) */}
      <label className="text-label flex-1">
        Max Attendees (Optional)
        <input
          type="number"
          className="text-input border p-2 rounded w-full"
          {...register("maxAttendees")}
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
