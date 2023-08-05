import { observer } from 'mobx-react-lite';
import React from 'react';
import { createPortal } from 'react-dom';
import CalendarStore from '../store/CalendarStore';
import { getYear } from '../utils/dayjs';
import DayCard from './modals/DayCard';

export const CalendarHeader = observer(() => {
  const { monthIndex, incMonthIndex, decMonthIndex, resetMonthIndex, toggleCardOpen } =
    CalendarStore;
  const handleClickToday = () => {
    toggleCardOpen();
    resetMonthIndex();
  };
  return (
    <div className="flex my-1 mx-auto w-full justify-between h-50 border-b border-black p-5">
      <div>
        <button onClick={() => handleClickToday()}>Сегодня</button>
      </div>
      <button onClick={() => decMonthIndex()}>Назад</button>
      <button onClick={() => incMonthIndex()}>Вперед</button>
      <h3>{getYear(monthIndex)}</h3>
    </div>
  );
});
