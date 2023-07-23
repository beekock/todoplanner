import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { Dispatch, SetStateAction } from 'react';
import { Category } from '../api/fetchTasks';
import TaskStore from '../store/TaskStore';

type Props = {
  category: Category;
};

const CategoryComponent: React.FC<Props> = observer(({ category }) => {
  const { filterByCategory, setActiveCategory, activeCategory } = TaskStore;
  const onClickCategory = (title: string) => {
    setActiveCategory(category.title);
    filterByCategory(category.title);
  };
  return (
    <div
      className={clsx(
        activeCategory === category.title ? 'bg-slate-300' : '',
        'cursor-pointer hover:bg-slate-300 transition-colors mb-2 px-1',
      )}
      onClick={() => onClickCategory(category.title)}>
      {category.title}
    </div>
  );
});

export default CategoryComponent;
