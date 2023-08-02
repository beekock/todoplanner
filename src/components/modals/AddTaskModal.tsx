import { useSnackbar } from 'notistack';
import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskStore from '../../store/TaskStore';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};
interface FormData {
  alias: string;
  categories: [];
}
const AddModal: React.FC<Props> = ({ setModal }) => {
  const { addTask, activeCategory, categories } = TaskStore;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setModal(false);
    addTask(data);
    enqueueSnackbar('Задача успешно добавлена', { variant: 'success' });
  };
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="border max-h-[300px] max-w-[300px] w-full h-full mx-auto my-3 flex flex-col rounded-md z-10 bg-blue-400 p-1">
        <button
          onClick={() => setModal(false)}
          className="mr-2 ml-auto cursor-pointer w-10 h-10 flex items-center justify-center border border-black rounded-full">
          X
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col justify-between h-full p-1">
          {' '}
          <div className="">
            {' '}
            <input
              type="text"
              placeholder="Введите имя задачи"
              className="text-center bg-slate-300 rounded-sm w-full h-10"
              {...register('alias', { required: 'Поле обязательно для заполнения' })}
            />
            {errors?.alias && (
              <p className="text-md p-1 text-red-800 my-0">{errors?.alias.message}</p>
            )}
          </div>
          <div className="text-left mt-5">Выберите категории</div>
          <div className="h-full mt-1 grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <div key={category} className="flex">
                <label>
                  {' '}
                  <input
                    type="checkbox"
                    value={category}
                    {...register('categories')}
                    defaultChecked={category === activeCategory}
                  />
                  <span className="ml-1">{category} </span>
                </label>
              </div>
            ))}
          </div>
          <button
            className="border bg-green-300 p-2 rounded-md hover:bg-green-500 transition-colors "
            type="submit">
            Добавить задачу
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
