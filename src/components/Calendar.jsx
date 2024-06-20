import React, { useState, useEffect } from 'react';
import Header from './Header';
import Days from './Days';
import Cells from './Cells';
import MeetingModal from './MeetingModal';
import { addMonths, subMonths } from 'date-fns';
import { database } from '../firebase';
import { ref, onValue, push } from 'firebase/database';
import './calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const meetingsRef = ref(database, 'meetings');
    onValue(meetingsRef, (snapshot) => {
      const meetingsData = snapshot.val();
      if (meetingsData) {
        const meetingsArray = Object.keys(meetingsData).map(key => ({
          id: key,
          ...meetingsData[key],
          date: new Date(meetingsData[key].date)
        }));
        setMeetings(meetingsArray);
      } else {
        setMeetings([]);
      }
    });

    return () => {
      onValue(meetingsRef, null);
    };
  }, []);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    setShowModal(true);
  };

  const addMeeting = async (meeting) => {
    await push(ref(database, 'meetings'), meeting);
    setShowModal(false);
  };

  return (
    <div className="calendar">
      <Header currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} />
      <Days currentMonth={currentMonth} />
      <Cells currentMonth={currentMonth} onDateClick={onDateClick} meetings={meetings} />
      {showModal && (
        <MeetingModal 
          selectedDate={selectedDate} 
          addMeeting={addMeeting} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default Calendar;
