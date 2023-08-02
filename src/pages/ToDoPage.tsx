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

const ToDoPage: React.FC = observer(() => {
  const { filteredTasks } = TaskStore;
  const [parent] = useAutoAnimate();
  const [isModal, setModal] = useState(false);
  const [isDoneOpen, setDoneOpen] = useState(false);

  return (
    <section className="flex justify-between h-full">
      <Categories />
      <div className="w-full p-5" ref={parent}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => <TaskComponent task={task} key={task.alias} />)
        ) : (
          <h4> Нет задач</h4>
        )}
        {isModal ? (
          createPortal(<AddTaskModal setModal={setModal} />, document.body)
        ) : (
          <button onClick={() => setModal(true)}>+ Добавить задачу</button>
        )}
        <DoneTaskToggler toggleDoneOpened={setDoneOpen} opened={isDoneOpen} />
        {isDoneOpen && (
          <CompletedTasksComponent toggleDoneOpened={setDoneOpen} opened={isDoneOpen} />
        )}
      </div>
    </section>
  );
});

export default ToDoPage;
