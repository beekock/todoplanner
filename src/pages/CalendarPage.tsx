import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import CalendarHeader from '../components/CalendarHeader';

import Month from '../components/Month';
import CalendarStore from '../store/CalendarStore';

const CalendarPage: React.FC = observer(() => {
  const { setMonthIndex } = CalendarStore;
  useEffect(() => {
    setMonthIndex(new Date().getMonth());
  }, []);

  return (
    <section className="flex flex-col h-full">
      <div className="flex-1">
        <CalendarHeader />
        <Month />
      </div>
    </section>
  );
});

export default CalendarPage;
