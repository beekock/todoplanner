import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { Dispatch, SetStateAction } from 'react';
import TaskStore from '../store/TaskStore';
import TaskComponent from './TaskComponent';

type Props = {
  opened: boolean;
  toggleDoneOpened: Dispatch<SetStateAction<boolean>>;
};

const CompletedTasksComponent: React.FC<Props> = ({ opened, toggleDoneOpened }) => {
  const { doneTasks } = TaskStore;
  const [parent] = useAutoAnimate();
  return (
    <div className="text-left">
      <div ref={parent}>
        {doneTasks.map((task) => (
          <TaskComponent task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default CompletedTasksComponent;
