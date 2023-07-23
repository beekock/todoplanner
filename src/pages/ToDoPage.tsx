import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Category } from '../api/fetchTasks';
import AddModal from '../components/AddModal';
import Categories from '../components/Categories';
import TaskComponent from '../components/TaskComponent';
import TaskStore from '../store/TaskStore';

const ToDoPage: React.FC = observer(() => {
  const { allTasks } = TaskStore;
  const [isModal, setModal] = useState(false);
  return (
    <section className="flex justify-between ">
      <Categories />
      <div className="w-full p-5">
        {allTasks.length > 0 ? (
          allTasks.map((task) => <TaskComponent task={task} key={task.alias} />)
        ) : (
          <h4> Нет задач</h4>
        )}
        {isModal ? (
          <AddModal setModal={setModal} />
        ) : (
          <button onClick={() => setModal(true)}>+ Добавить задачу</button>
        )}
      </div>
    </section>
  );
});

export default ToDoPage;
