import { useSnackbar } from 'notistack';
import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskStore from '../store/TaskStore';

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
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <input
          type="text"
          placeholder="Введите имя категории"
          {...register('category', {
            validate: (value) =>
              !categories.includes(value) || 'Категория с таким именем уже существует',
            required: 'Поле обязательно для заполнения',
          })}
        />
        {errors?.category && <p className="text-sm text-red-800">{errors.category.message}</p>}
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddCategoryModal;
