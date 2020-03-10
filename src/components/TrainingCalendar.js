import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

const TrainingCalendar = props => {
  const [events, setEvents] = useState([
    // {
    //   start: new Date(),
    //   end: new Date(moment().add(1, "days")),
    //   title: "Some title"
    // },
    // {
    //   start: new Date("2020-02-23T07:51:35.918+0000"),
    //   end: new Date("2020-02-23T07:51:35.918+0000"),
    //   title: "Poskus"
    // }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(response => response.json())
      .then(data => {
        return setEvents(
          data.map(event => ({
            start: new Date(event.date),
            end: new Date(event.date),
            title: event.activity
          }))
        );
      });
  };

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
