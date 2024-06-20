import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, format } from 'date-fns';
import './calendar.css';

const Cells = ({ currentMonth, onDateClick, meetings }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const dayMeetings = meetings.filter(meeting => isSameDay(new Date(meeting.date), day));
      const hasMeeting = dayMeetings.length > 0;
      days.push(
        <div
          className={`col cell ${!isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, new Date()) ? "selected" : ""} ${hasMeeting ? "has-meeting" : ""}`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number">{formattedDate}</span>
          {dayMeetings.map((meeting, index) => (
            <div key={index} className="meeting">
              {meeting.title}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className="body">{rows}</div>;
};

export default Cells;
