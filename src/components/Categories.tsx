import React, { useState } from 'react';
import TaskStore from '../store/TaskStore';
import CategoryComponent from './CategoryComponent';
import ico from '../assets/categories_ico.svg';
import darkIco from '../assets/categories_ico_dark.svg';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import AddCategoryModal from './modals/AddCategoryModal';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { createPortal } from 'react-dom';
import UiStore from '../store/UiStore';

const Categories: React.FC = observer(() => {
  const { categories, activeCategory, setActiveCategory } = TaskStore;
  const { theme } = UiStore;
  const [isModal, setModal] = useState(false);
  const [parent] = useAutoAnimate();
  const { isMobile } = UiStore;
  const onClickReset = () => {
    setActiveCategory('');
  };
  return (
    <div
      className="py-5 border-r p-2 w-full md:max-w-[250px] text-start flex items-center md:block max-w-full justify-between"
      ref={parent}>
      <div
        className={clsx(
          !activeCategory && 'bg-slate-300 dark:bg-slate-500',
          `cursor-pointer md:mb-2 py-1 px-2 flex justify-between hover:bg-slate-400 transition-colors rounded-lg w-24 md:w-full md:justify-start`,
        )}
        onClick={() => onClickReset()}>
        {!isMobile && (
          <img
            src={theme === 'dark' ? darkIco : ico}
            alt="categories-ico"
            className="w-4 h-4 my-1 mx-1"
          />
        )}
        <h3 className="text-start">Все задачи</h3>
      </div>
      <div className="overflow-x-auto flex md:flex-col">
        {categories.map((category, index) => (
          <CategoryComponent category={category} key={index} />
        ))}
      </div>
      {isModal ? (
        createPortal(<AddCategoryModal setModal={setModal} />, document.body)
      ) : (
        <button
          onClick={() => setModal(true)}
          className="cursor-pointer hover:bg-slate-400 transition-colors md:w-full w-[50px] h-[30px] border border-black rounded-lg dark:border-white">
          {!isMobile && 'Добавить категорию'} +
        </button>
      )}
    </div>
  );
});

export default Categories;
