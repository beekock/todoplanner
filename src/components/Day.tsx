import clsx from 'clsx';
import { observer, useObserver } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Task } from '../api/fetchTasks';
import CalendarStore from '../store/CalendarStore';
import TaskStore from '../store/TaskStore';
import { dayComparsion, daysNotThisMonth } from '../utils/dateHelper';
import DayCard from './modals/DayCard';
import check from '../assets/check.svg';
interface DayProps {
  day: Date;
}

const Day: React.FC<DayProps> = observer(({ day }) => {
  const { todayDay, selectDay, selectedDay, monthIndex, year } = CalendarStore;
  const { getTasksAtDay, tasks } = TaskStore;
  const [tasksAtDay, setTasksAtDay] = useState<Task[]>([]);
  const [isModal, setModal] = useState(false);
  const handleClickOnDay = () => {
    selectDay(day);
    setModal(true);
  };
  useEffect(() => {
    setTasksAtDay(getTasksAtDay(day));
  }, [tasks, monthIndex, year]);
  return (
    <>
      <div className="flex flex-col">
        <div
          className={clsx(
            (dayComparsion(day, todayDay) && 'bg-slate-400') ||
              (daysNotThisMonth(day) && 'opacity-30') ||
              (dayComparsion(day, selectedDay) && 'text-purple-300 border border-purple-300 '),
            'flex flex-col items-center justify-center cursor-pointer hover:bg-slate-300 rounded-lg transition-all hover:opacity-100 h-28',
          )}
          onClick={() => handleClickOnDay()}>
          <span className="text-center">{day.toLocaleString('ru', { day: 'numeric' })}</span>
          <div className="flex flex-wrap overflow-hidden p-1">
            {tasksAtDay.map((task) => (
              <div
                className="w-3 h-3 border border-black rounded-full bg-green-300 opacity-100 md:w-4 md:h-4"
                key={task.alias}>
                {task.isDone && <img src={check} alt="check-ico" className="p-0.5"></img>}
              </div>
            ))}
          </div>
        </div>
        {isModal && createPortal(<DayCard day={day} setModal={setModal} />, document.body)}
      </div>
    </>
  );
});

export default Day;
