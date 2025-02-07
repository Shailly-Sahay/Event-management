import React, { useMemo } from "react";
import { EventType } from "./Event";
import { Event, Loader } from "../";

type EventListProps = {
  events: EventType[] | undefined;
  isLoading: boolean;
};

const EventList: React.FC<EventListProps> = React.memo(
  ({ events, isLoading }) => {
    console.log("Rendering EventList...");

    // Memoize the event list to prevent re-rendering unless events change
    const eventList = useMemo(() => {
      return events?.map((event) => <Event key={event._id} event={event} />);
    }, [events]);

    return isLoading ? (
      <div className="flex justify-center items-center h-full">
        <Loader show={isLoading} />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full gap-12">
        {eventList}
      </div>
    );
  }
);

export default EventList;
