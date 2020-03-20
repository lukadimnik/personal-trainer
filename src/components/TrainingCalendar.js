import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

const TrainingCalendar = props => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(moment().add()._d);

  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(response => response.json())
      .then(data => {
        return setEvents(
          data.map(event => ({
            start: new Date(event.date),
            end: new Date(moment(event.date).add(event.duration, "minutes")),
            title: event.activity
          }))
        );
      });
  };
  console.log("events", events);
  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default TrainingCalendar;
