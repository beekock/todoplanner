import { useSnackbar } from 'notistack';
import React from 'react';
import { Task } from '../../api/fetchTasks';
import TaskStore from '../../store/TaskStore';

type Props = {
  data: Task | string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmationModal: React.FC<Props> = ({ data, setModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { deleteTask, deleteCategory } = TaskStore;

  const onConfirm = () => {
    if (typeof data !== 'string') {
      deleteTask(data);
      setModal(false);
      enqueueSnackbar('Задача успешно удалена', { variant: 'success' });
    } else {
      deleteCategory(data);
      setModal(false);
      enqueueSnackbar('Категория успешно удалена', { variant: 'success' });
    }
  };

  return (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <div className="mx-auto z-50 w-[250px] h-[250px] border border-black rounded-md bg-orange-400 flex flex-col justify-between p-5 opacity-100">
        <h4>{`Вы действительно хотите удалить ${
          typeof data !== 'string' ? 'задачу' : 'категорию'
        }?`}</h4>
        <div className="flex justify-between">
          {' '}
          <button className="border border-black rounded-md w-[70px]" onClick={() => onConfirm()}>
            Да
          </button>
          <button
            className="border border-black rounded-md w-[70px]"
            onClick={() => setModal(false)}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
