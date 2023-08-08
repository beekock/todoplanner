import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Task } from '../../api/fetchTasks';
import CalendarStore from '../../store/CalendarStore';
import TaskStore from '../../store/TaskStore';
import { useOnClickOutside } from '../../utils/useOnClickOutside';

type Props = {
  task: Task;
  setCard: React.Dispatch<React.SetStateAction<boolean>>;
};
interface FormData {
  id: number;
  alias: string;
  isDone: boolean;
  categories: string[];
  description: string;
  day: number;
  month: number;
  year: number;
}
const TaskCard: React.FC<Props> = observer(({ task, setCard }) => {
  const { categories, updateTask } = TaskStore;
  const { monthDays, setMonthIndex, months, yearInterval, todayDay } = CalendarStore;
  const [isEdit, setEdit] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      alias: task.alias,
      description: task.description,
      day: task.date.getDate(),
      month: task.date.getMonth() + 1,
      year: task.date.getFullYear(),
    },
  });
  const onSubmit: SubmitHandler<FormData> = ({
    alias,
    categories,
    day,
    month,
    year,
    description,
  }) => {
    updateTask({
      id: task.id,
      alias,
      categories,
      description,
      date: new Date(year, month - 1, day),
    });
    setMonthIndex(todayDay.getMonth() + 1);
    setCard(false);
    enqueueSnackbar('Задача успешно изменена', { variant: 'success' });
  };

  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-xs">
      <div
        className="mx-auto border-1 border-black bg-blue-300 w-[270px] h-[350px] p-3 flex flex-col justify-between text-left rounded-md"
        ref={modalRef}>
        <div className="relative">
          <button
            className="rounded-full border border-black w-8 h-8 absolute top-0 right-0 hover:bg-blue-400 transition-colors"
            onClick={() => setCard(false)}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Название задачи</p>
            <input
              type="text"
              className="text-lg text-black bg-blue-300 border-black border w-full rounded-md p-1"
              readOnly={!isEdit}
              {...register('alias')}
            />
          </label>
          <label className="text-left pt-5">
            <h4 className="text-lg font-bold">Описание задачи</h4>
            <textarea
              className="bg-blue-300 resize-none mt-3 p-1 text-black  border border-black rounded-md w-full"
              readOnly={!isEdit}
              {...register('description')}></textarea>
          </label>
          <p> Категории задачи</p>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              {' '}
              <input
                type="checkbox"
                value={category}
                disabled={!isEdit}
                defaultChecked={task.categories.includes(category)}
                {...register('categories')}
              />
              <label>{category}</label>
            </React.Fragment>
          ))}
          <div></div>
          <div>
            <label>Выберите дату</label>
            <select {...register('day')} disabled={!isEdit}>
              {monthDays.map((day) => (
                <option key={day.dayNumber}>{day.dayNumber}</option>
              ))}
            </select>
            <select {...register('month')} disabled={!isEdit}>
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
            <select {...register('year')} disabled={!isEdit}>
              {yearInterval.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>
          </div>
          {isEdit && (
            <button
              type="submit"
              className="border rounded-md bg-green-300 hover:bg-green-400 mt-5 w-full">
              Подтвердите изменения
            </button>
          )}
        </form>

        <button
          className="w-full border border-black rounded-md hover:bg-blue-400 transition-colors"
          onClick={() => setEdit(!isEdit)}>
          Edit
        </button>
      </div>
    </div>
  );
});

export default TaskCard;
