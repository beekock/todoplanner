import { observer } from 'mobx-react-lite';
import React from 'react';
import CalendarStore from '../store/CalendarStore';
import UiStore from '../store/UiStore';
import { checkMobileWeeks } from '../utils/dateHelper';
import Day from './Day';

const Month = observer(() => {
  const { monthMatrix } = CalendarStore;
  const { isMobile } = UiStore;

  return (
    <div className="h-full mt-5">
      <div className="grid grid-cols-7">
        {checkMobileWeeks(isMobile).map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="h-full ">
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
