import TaskStore from '../store/TaskStore';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Task } from '../api/fetchTasks';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';
import TaskCard from './modals/TaskCard';

import clsx from 'clsx';
import { createPortal } from 'react-dom';

type Props = {
  task: Task;
};

const TaskComponent: React.FC<Props> = observer(({ task }) => {
  const { toggleIsDone } = TaskStore;

  const [isModal, setModal] = useState(false);
  const [isCard, setCard] = useState(false);

  return (
    <>
      {' '}
      <div
        className={clsx(
          task.isDone && 'opacity-50',
          'flex p-4 border border-gray-600 rounded-xl mb-2',
        )}>
        <input
          type="checkbox"
          className="h-[32px]"
          defaultChecked={task.isDone}
          onChange={() => toggleIsDone(task.id)}
        />
        <div className="ml-4 w-full text-center cursor-pointer" onClick={() => setCard(true)}>
          {task.alias}
        </div>
        <button
          className="ml-4 border border-black rounded-full w-8 h-8 hover:bg-slate-400 transition-colors dark:border-white"
          onClick={() => setModal(true)}>
          X
        </button>
      </div>
      {isModal &&
        createPortal(<DeleteConfirmationModal data={task} setModal={setModal} />, document.body)}
      {isCard && createPortal(<TaskCard task={task} setCard={setCard} />, document.body)}
    </>
  );
});

export default TaskComponent;
