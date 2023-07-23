import React, { useState } from 'react';
import TaskStore from '../store/TaskStore';
import CategoryComponent from './CategoryComponent';
import ico from '../assets/categories_ico.svg';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import AddCategoryModal from './AddCategoryModal';

const Categories: React.FC = observer(() => {
  const { categories, resetFilter, activeCategory, setActiveCategory } = TaskStore;
  const [isModal, setModal] = useState(false);

  const onClickReset = () => {
    setActiveCategory('');
    resetFilter();
  };
  return (
    <div className=" py-10 border-r w-full max-w-[200px] text-start ">
      <div
        className={clsx(
          !activeCategory && 'bg-slate-300',
          `flex cursor-pointer hover:bg-slate-300 transition-colors mb-5 px-1`,
        )}
        onClick={() => onClickReset()}>
        <img src={ico} alt="categories-ico" className="w-4 h-4 my-1 mx-1" />
        <h3 className="">Все задачи</h3>
      </div>
      {categories.map((category) => (
        <CategoryComponent category={category} key={category.title} />
      ))}
      {isModal ? (
        <AddCategoryModal setModal={setModal} />
      ) : (
        <button
          onClick={() => setModal(true)}
          className="cursor-pointer hover:bg-slate-400 transition-colors w-full h-10">
          Добавить категорию +
        </button>
      )}
    </div>
  );
});

export default Categories;
