import { useSnackbar } from 'notistack';
import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskStore from '../../store/TaskStore';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};
interface FormData {
  category: string;
}
const AddCategoryModal: React.FC<Props> = ({ setModal }) => {
  const { addCategory, categories } = TaskStore;
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    addCategory(data.category);
    setModal(false);
    enqueueSnackbar('Категория успешно добавлена', { variant: 'success' });
  };
  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="mx-auto border border-black rounded-md p-2 w-[250px] max-h-[200px] h-full z-100 bg-blue-400 flex flex-col justify-between">
        <button
          className="mr-0 ml-auto w-10 h-10 rounded-full border border-black items-center flex justify-center hover:bg-blue-500 transition-colors"
          onClick={() => setModal(false)}>
          X
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
          {' '}
          <div className="w-full">
            <input
              type="text"
              placeholder="Введите имя категории"
              className="text-center mt-5 border-black border w-full rounded-md h-8"
              {...register('category', {
                validate: (value) =>
                  !categories.includes(value) || 'Категория с таким именем уже существует',
                required: 'Поле обязательно для заполнения',
              })}
            />
            {errors?.category && <p className="text-sm text-red-800">{errors.category.message}</p>}
          </div>
          <button
            type="submit"
            className="border border-black rounded-md bg-green-300 hover:bg-green-600 transition-all">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
