import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { DAY_FORMAT } from '../@types/calendarTypes';
import CalendarStore from '../store/CalendarStore';
import { getCurrentDay, getMonthIndexFromZeroToEleven } from '../utils/dayjs';
import DayCard from './modals/DayCard';

interface DayProps {
  day: Dayjs;
  row: number;
  monthIndex: number;
}

const Day: React.FC<DayProps> = observer(({ day, row, monthIndex }) => {
  const isDayNotThisMonth = day.month() !== getMonthIndexFromZeroToEleven(monthIndex);
  const { setToday, toggleCardOpen, isCardOpen, selectDay } = CalendarStore;
  const dayFormat = day.format(DAY_FORMAT.YYYY_MM_DD);
  const isCurrentDayToday = dayFormat === getCurrentDay();
  useEffect(() => {
    if (dayFormat === getCurrentDay()) setToday(day);
  }, []);
  const handleClickDay = () => {
    toggleCardOpen();
    selectDay(day);
  };
  return (
    <>
      <div className="flex flex-col" onClick={() => handleClickDay()}>
        {row === 0 && (
          <div className="flex justify-center">
            <span className="">{day.format('dd').toUpperCase()}</span>
          </div>
        )}
        {!isDayNotThisMonth && (
          <div
            className={clsx(
              isCurrentDayToday && 'bg-slate-300',
              'border h-[110px] border-black flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors',
            )}>
            <span>{day.format('DD')}</span>
          </div>
        )}
      </div>
      {isCardOpen && createPortal(<DayCard />, document.body)}
    </>
  );
});

export default Day;
