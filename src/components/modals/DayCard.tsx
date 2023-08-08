import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import CalendarStore from '../../store/CalendarStore';
import TaskStore from '../../store/TaskStore';
import { useOnClickOutside } from '../../utils/useOnClickOutside';
import TaskComponent from '../TaskComponent';

interface Props {
  day: Date;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DayCard: React.FC<Props> = observer(({ day, setModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { selectedDay } = CalendarStore;
  const { getTasksAtDay } = TaskStore;
  useOnClickOutside(modalRef, () => setModal(false));
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-xs">
      <div className="w-[400px] h-[400px] bg-slate-400 p-4 relative" ref={modalRef}>
        <button className="absolute top-0 left-0 p-2" onClick={() => setModal(false)}>
          X
        </button>
        <h4>{day.toLocaleString('ru', { day: '2-digit', month: 'long' })}</h4>
        {getTasksAtDay(day).map((task) => (
          <TaskComponent task={task} />
        ))}
      </div>
    </div>
  );
});
export default DayCard;
