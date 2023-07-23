import React, { Dispatch, SetStateAction, useState } from 'react';
import TaskStore from '../store/TaskStore';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

const AddModal: React.FC<Props> = ({ setModal }) => {
  const [inputValue, setInputValue] = useState('');
  const { addTask, activeCategory, filteredTasks } = TaskStore;
  const [chosenCategory, setChoosenCategory] = useState(activeCategory);
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoosenCategory(e.target.value);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onClickAdd = (title: string, alias: string) => {
    if (chosenCategory && inputValue) {
      addTask(title, alias);
      setModal(false);
    } else if (!chosenCategory) {
      alert('Выбери категорию');
    } else {
      alert('Введи имя задачи');
    }
  };
  return (
    <div className="border w-[200px] mx-auto my-3 flex flex-col h-[200px] justify-between rounded-md absolute top-[50%] left-[50%] z-10 bg-blue-400">
      <button onClick={() => setModal(false)} className="mr-2 ml-auto cursor-pointer">
        X
      </button>
      <input
        type="text"
        placeholder="Введите имя задачи"
        className="text-center bg-slate-300"
        value={inputValue}
        onChange={(e) => onChangeInput(e)}
      />
      {!activeCategory && (
        <div>
          {filteredTasks.map((category) => (
            <div key={category.title} className="text-left ml-2">
              <input
                type="radio"
                key={category.title}
                value={category.title}
                checked={category.title === chosenCategory}
                onChange={(e) => handleChangeCategory(e)}
              />
              <span>{category.title}</span>
            </div>
          ))}
        </div>
      )}
      <button
        className="border bg-green-300  p-2 "
        onClick={() => onClickAdd(chosenCategory, inputValue)}>
        Добавить задачу
      </button>
    </div>
  );
};

export default AddModal;
