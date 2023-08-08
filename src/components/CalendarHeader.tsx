import { observer } from 'mobx-react-lite';
import React from 'react';
import CalendarStore from '../store/CalendarStore';

const CalendarHeader = observer(() => {
  const { decMonthIndex, incMonthIndex, monthName, resetMonthIndex } = CalendarStore;
  return (
    <div className="h-[50px] flex items-center justify-center border-black border-b">
      <div className="flex justify-between w-full px-5">
        <button
          onClick={() => resetMonthIndex()}
          className="px-4 border border-black rounded-lg bg-green-300 hover:bg-green-500 transition-colors">
          Сегодня
        </button>
        <button
          onClick={() => decMonthIndex()}
          className="px-4 border border-black rounded-lg bg-green-300 hover:bg-green-500 transition-colors">
          Предыдущий месяц
        </button>
        <button
          onClick={() => incMonthIndex()}
          className="px-4 border border-black rounded-lg bg-green-300 hover:bg-green-500 transition-colors">
          Следующий месяц
        </button>
        <div className="w-[150px]">{monthName}</div>
      </div>
    </div>
  );
});

export default CalendarHeader;
