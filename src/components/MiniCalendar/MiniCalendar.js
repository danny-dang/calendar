import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';

const MiniCalendar = (props) => {
  const { currentDate, handleCurrentDateChange } = props
  const [activeDate, setActiveDate] = useState(new Date())

  useEffect(() => {
    setActiveDate(currentDate)
  }, [currentDate])

  const handleActiveDateChange = (e) => {
    setActiveDate(e.activeStartDate)
  }
  return (
    <Calendar
      locale='fr'
      onChange={handleCurrentDateChange}
      value={currentDate}
      activeStartDate={activeDate}
      onActiveStartDateChange={handleActiveDateChange}
    />
  );
}

export default MiniCalendar