import React, { Dispatch, SetStateAction, useState } from 'react';
import TaskStore from '../store/TaskStore';

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
};

const AddCategoryModal: React.FC<Props> = ({ setModal }) => {
  const [inputValue, setInputValue] = useState('');
  const { addCategory } = TaskStore;
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (alias: string) => {
    setModal(false);
    addCategory(alias);
  };
  return (
    <div className="">
      <input
        type="text"
        placeholder="Введите имя категории"
        value={inputValue}
        onChange={(e) => onChangeInput(e)}
      />
      <button type="submit" onClick={() => handleSubmit(inputValue)}>
        Добавить
      </button>
    </div>
  );
};

export default AddCategoryModal;
