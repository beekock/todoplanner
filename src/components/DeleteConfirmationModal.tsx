import React from 'react';
import { Task } from '../api/fetchTasks';
import TaskStore from '../store/TaskStore';

type Props = {
  task: Task;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmationModal: React.FC<Props> = ({ task, setModal }) => {
  const { deleteTask } = TaskStore;
  const onConfirm = () => {
    deleteTask(task);
    setModal(false);
  };
  return (
    <div className="absolute top-1/2 left-1/4 z-50 w-[250px] h-[250px] border border-black rounded-md bg-orange-400 flex flex-col justify-between p-5">
      <h4>Вы действительно хотите удалить задачу?</h4>
      <div className="flex justify-between">
        {' '}
        <button className="border border-black rounded-md w-[70px]" onClick={() => onConfirm()}>
          Да
        </button>
        <button className="border border-black rounded-md w-[70px]" onClick={() => setModal(false)}>
          Нет
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
