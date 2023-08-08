import { observer } from 'mobx-react-lite';
import React from 'react';
import CalendarStore from '../store/CalendarStore';
import Day from './Day';

const Month = observer(() => {
  const { monthMatrix } = CalendarStore;
  const daysOfWeek = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];
  return (
    <div>
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div>
        {monthMatrix.map((row: Date[], i: number) => (
          <React.Fragment key={i}>
            <div className="grid grid-cols-7">
              {row.map((day: Date, index: number) => (
                <React.Fragment key={index}>
                  <Day day={day} />
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default Month;
