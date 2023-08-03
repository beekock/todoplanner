import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import TaskStore from '../store/TaskStore';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';

type Props = {
  category: string;
  key: number;
};

const CategoryComponent: React.FC<Props> = observer(({ category }) => {
  const { setActiveCategory, activeCategory } = TaskStore;
  const [isModal, setModal] = useState(false);
  const onClickCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
  };
  const onClickDeleteCategory = () => {
    setModal(true);
  };
  return (
    <div
      className={clsx(
        activeCategory === category ? 'bg-slate-300' : '',
        'cursor-pointer mb-2 py-1 px-2 flex justify-between hover:bg-slate-400 transition-colors',
      )}
      onClick={() => onClickCategory(category)}>
      <div className="">{category}</div>
      <div>
        <span
          className="cursor-pointer hover:font-bold transition-all"
          onClick={() => onClickDeleteCategory()}>
          X
        </span>
      </div>
      {isModal &&
        createPortal(
          <DeleteConfirmationModal data={category} setModal={setModal} />,
          document.body,
        )}
    </div>
  );
});

export default CategoryComponent;
