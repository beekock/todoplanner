import React, { useRef } from 'react';
import CalendarStore from '../../store/CalendarStore';
import { getMonthRuTitle } from '../../utils/dayjs';
import { useOnClickOutside } from '../../utils/useOnClickOutside';

const DayCard: React.FC = () => {
  const { toggleCardOpen, selectedDay, monthIndex } = CalendarStore;
  const modalRef = useRef<HTMLDivElement>(null);
  const weekDay = selectedDay.format('dd').toUpperCase();
  useOnClickOutside(modalRef, () => toggleCardOpen());

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-xs">
        <div
          className="w-[400px] h-[400px] border border-black bg-orange-400 rounded-md p-5"
          ref={modalRef}>
          <h4>{`${weekDay},${selectedDay.format('DD')} ${getMonthRuTitle(monthIndex)}`}</h4>
        </div>
      </div>
    </>
  );
};

export default DayCard;
