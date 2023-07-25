import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskStore from '../store/TaskStore';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};
interface FormData {
  alias: string;
  categories: [];
}
const AddModal: React.FC<Props> = ({ setModal }) => {
  const { addTask, activeCategory, categories } = TaskStore;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setModal(false);
    addTask(data);
  };
  return (
    <div className="border w-[200px] mx-auto my-3 flex flex-col h-[200px] justify-between rounded-md absolute top-[50%] left-[50%] z-10 bg-blue-400 p-1">
      <button onClick={() => setModal(false)} className="mr-2 ml-auto cursor-pointer">
        X
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <input
          type="text"
          placeholder="Введите имя задачи"
          className="text-center bg-slate-300 rounded-sm"
          {...register('alias', { required: 'Поле обязательно для заполнения' })}
        />
        {errors?.alias && <p className="text-sm text-red-800">{errors?.alias.message}</p>}
        {categories.map((category) => (
          <div key={category} className="flex">
            <label>
              <input
                type="checkbox"
                value={category}
                {...register('categories')}
                defaultChecked={category === activeCategory}
              />
              {category}
            </label>
          </div>
        ))}
        <button className="border bg-green-300  p-2 " type="submit">
          Добавить задачу
        </button>
      </form>
    </div>
  );
};

export default AddModal;
