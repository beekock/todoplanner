import { spawn } from 'child_process';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction, useState } from 'react';
import TaskStore from '../store/TaskStore';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

const AddModal: React.FC<Props> = ({ setModal }) => {
  const [inputValue, setInputValue] = useState('');
  const { addTask, activeCategory, categories } = TaskStore;
  const [chosenCategory, setChoosenCategory] = useState([activeCategory]);
  const [inputError, setInputError] = useState(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    e.target.value ? setInputError(false) : setInputError(true);
  };
  const onClickAdd = (alias: string) => {
    if (alias) {
      setModal(false);
      addTask(alias, chosenCategory);
    } else setInputError(true);
  };
  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setChoosenCategory(chosenCategory.filter((value) => value !== e.target.value));
    } else setChoosenCategory([...chosenCategory, e.target.value]);
  };
  return (
    <div className="border w-[200px] mx-auto my-3 flex flex-col h-[200px] justify-between rounded-md absolute top-[50%] left-[50%] z-10 bg-blue-400 p-1">
      <button onClick={() => setModal(false)} className="mr-2 ml-auto cursor-pointer">
        X
      </button>
      <input
        type="text"
        placeholder="Введите имя задачи"
        className={clsx(
          inputError ? ' outline-red-800' : '',
          'text-center bg-slate-300 rounded-sm',
        )}
        value={inputValue}
        onChange={(e) => onChangeInput(e)}
      />
      {inputError && <span className="text-red-800 text-sm">Введите имя задачи</span>}
      {categories.map((category) => (
        <div key={category} className="flex">
          <input
            type="checkbox"
            checked={chosenCategory.includes(category)}
            onChange={(e) => onChangeCheckBox(e)}
            value={category}
          />
          <span>{category}</span>
        </div>
      ))}
      <button className="border bg-green-300  p-2 " onClick={() => onClickAdd(inputValue)}>
        Добавить задачу
      </button>
    </div>
  );
};

export default AddModal;
