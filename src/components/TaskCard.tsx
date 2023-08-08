import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Task } from '../api/fetchTasks';
import TaskStore from '../store/TaskStore';

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
}
const TaskCard: React.FC<Props> = ({ task, setCard }) => {
  const { categories, updateTask } = TaskStore;
  const [isEdit, setEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { alias: task.alias, description: task.description },
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    updateTask(task.id, data);
    setCard(false);
    enqueueSnackbar('Задача успешно изменена', { variant: 'success' });
  };
  return (
    <div className="absolute opacity-100 top-1/2 left-1/4 border-1 border-black bg-blue-300 w-[250px] h-[350px] p-3 flex flex-col justify-between text-left">
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
            className="text-lg text-black bg-blue-300"
            disabled={!isEdit}
            {...register('alias')}
          />
        </label>
        <label className="text-left pt-5">
          <h4 className="text-lg font-bold">Описание задачи</h4>
          <textarea
            className="bg-blue-300 resize-none mt-3 p-1 text-black  border border-black rounded-md w-full"
            disabled={!isEdit}
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
              defaultChecked={Array.isArray(task.categories) && task.categories.includes(category)}
              {...register('categories')}
            />
            <label>{category}</label>
          </React.Fragment>
        ))}
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
  );
};

export default TaskCard;
