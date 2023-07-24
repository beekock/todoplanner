import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Task } from '../api/fetchTasks';

import DeleteConfirmationModal from './DeleteConfirmationModal';

type Props = {
  task: Task;
};

const TaskComponent: React.FC<Props> = observer(({ task }) => {
  const [isModal, setModal] = useState(false);
  return (
    <div className="flex p-4 border border-gray-600 rounded-xl mb-2">
      <input type="checkbox" className="h-[32px]" />
      <div className="ml-4 w-full text-center">{task.alias}</div>
      <button
        className="ml-4 border border-black rounded-full w-8 h-8 hover:bg-slate-400 transition-colors"
        onClick={() => setModal(true)}>
        X
      </button>
      {isModal && <DeleteConfirmationModal task={task} setModal={setModal} />}
    </div>
  );
});

export default TaskComponent;
