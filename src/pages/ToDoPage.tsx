import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import AddTaskModal from '../components/modals/AddTaskModal';
import Categories from '../components/Categories';
import TaskComponent from '../components/TaskComponent';
import TaskStore from '../store/TaskStore';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import CompletedTasksComponent from '../components/CompletedTasksComponent';
import DoneTaskToggler from '../components/DoneTaskToggler';
import { createPortal } from 'react-dom';
import AddButton from '../components/AddButton';
const ToDoPage: React.FC = observer(() => {
  const { filteredTasks } = TaskStore;
  const [parent] = useAutoAnimate();
  const [isModal, setModal] = useState(false);
  const [isDoneOpen, setDoneOpen] = useState(false);

  return (
    <section className="flex flex-col md:justify-between md:flex-row h-full dark:bg-darkblue bg-primary text-white border-white">
      <Categories />
      <div className="w-full p-5" ref={parent}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskComponent task={task} key={task.id} />)
        ) : (
          <h4 className="text-2xl"> Нет задач</h4>
        )}
        <AddButton />
        <DoneTaskToggler toggleDoneOpened={setDoneOpen} opened={isDoneOpen} />
        {isDoneOpen && (
          <CompletedTasksComponent toggleDoneOpened={setDoneOpen} opened={isDoneOpen} />
        )}
      </div>
    </section>
  );
});

export default ToDoPage;
