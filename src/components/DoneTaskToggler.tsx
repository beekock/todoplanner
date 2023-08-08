import React, { Dispatch, SetStateAction } from 'react';
import TaskStore from '../store/TaskStore';
import arrow from '../assets/arrow-down.svg';
import clsx from 'clsx';

type Props = {
  opened: boolean;
  toggleDoneOpened: Dispatch<SetStateAction<boolean>>;
};

const DoneTaskToggler: React.FC<Props> = ({ opened, toggleDoneOpened }) => {
  const { doneTasks } = TaskStore;
  return (
    <div className="flex mt-5">
      {' '}
      <h3 className="mb-5">{`Completed tasks (${doneTasks.length})`}</h3>
      <img
        src={arrow}
        alt="toggleDoneIco"
        className={clsx(
          opened && 'rotate-180',
          'w-4 h-4 cursor-pointer ml-2 mt-1 transition-transform',
        )}
        onClick={() => toggleDoneOpened(!opened)}
      />
    </div>
  );
};

export default DoneTaskToggler;
