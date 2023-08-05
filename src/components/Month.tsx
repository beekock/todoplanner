import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import CalendarStore from '../store/CalendarStore';
import { getMonthMatrix } from '../utils/dayjs';
import Day from './Day';

const Month: React.FC = observer(() => {
  const [currentMonth, setCurrentMonth] = useState(getMonthMatrix());
  const { monthIndex } = CalendarStore;
  useEffect(() => {
    setCurrentMonth(getMonthMatrix(monthIndex));
  }, [monthIndex]);
  return (
    <div className="grid grid-cols-7">
      {currentMonth.map((row: Dayjs[], i: number) => (
        <React.Fragment key={i}>
          {row.map((day: Dayjs, index: number) => (
            <Day day={day} key={index} row={i} monthIndex={monthIndex} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
});

export default Month;
