import { observer } from 'mobx-react-lite';
import React from 'react';
import { Task } from '../api/fetchTasks';
import TaskStore from '../store/TaskStore';

type Props = {
  task: Task;
};

const TaskComponent: React.FC<Props> = observer(({ task }) => {
  const { deleteTask } = TaskStore;
  return (
    <div className="flex p-4 border border-gray-600 rounded-xl mb-2">
      <input type="checkbox" className="h-[32px]" />
      <div className="ml-4 w-full text-center">{task.alias}</div>
      <button
        className="ml-4 border border-black rounded-full w-8 h-8 hover:bg-slate-400 transition-colors"
        onClick={() => deleteTask(task.alias)}>
        X
      </button>
    </div>
  );
});

export default TaskComponent;
