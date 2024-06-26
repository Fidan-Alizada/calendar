import React from 'react';
import { format } from 'date-fns';

const Header = ({ currentMonth, nextMonth, prevMonth }) => {
  const dateFormat = "MMMM yyyy";

  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>  back   
        </div>
      </div>
      <div className="col col-center">
        <span>{format(currentMonth, dateFormat)}</span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon"> next </div>
      </div>
    </div>
  );
};

export default Header;
