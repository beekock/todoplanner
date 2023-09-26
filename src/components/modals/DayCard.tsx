import { useAutoAnimate } from '@formkit/auto-animate/react';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { Task } from '../../api/fetchTasks';
import CalendarStore from '../../store/CalendarStore';
import TaskStore from '../../store/TaskStore';
import { useOnClickOutside } from '../../utils/useOnClickOutside';
import AddButton from '../AddButton';
import TaskComponent from '../TaskComponent';

interface Props {
  day: Date;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DayCard: React.FC<Props> = observer(({ day, setModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [tasksAtDay, setTasksAtDay] = useState<Task[]>([]);
  const [parent] = useAutoAnimate();
  const { selectedDay } = CalendarStore;
  const { getTasksAtDay, tasks } = TaskStore;
  useEffect(() => {
    setTasksAtDay(getTasksAtDay(day));
  }, [tasks]);
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-xs">
      <div
        className="w-[400px] h-[400px] bg-slate-400 p-4 relative flex flex-col justify-between"
        ref={modalRef}>
        <button className="absolute top-0 left-0 p-2" onClick={() => setModal(false)}>
          X
        </button>
        <h4>{day.toLocaleString('ru', { day: '2-digit', month: 'long', year: 'numeric' })}</h4>
        <div ref={parent} className="overflow-y-auto">
          {tasksAtDay.map((task) => (
            <TaskComponent task={task} />
          ))}
        </div>
        <AddButton />
      </div>
    </div>
  );
});
export default DayCard;
