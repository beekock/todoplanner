import React from 'react';
import { CalendarHeader } from '../components/CalendarHeader';
import Month from '../components/Month';

const CalendarPage: React.FC = () => {
  return (
    <section className="flex flex-col h-full">
      <div className="flex-1">
        {' '}
        <CalendarHeader />
        <Month />
      </div>
    </section>
  );
};

export default CalendarPage;
