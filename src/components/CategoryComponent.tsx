import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import TaskStore from '../store/TaskStore';

type Props = {
  category: string;
  key: string;
};

const CategoryComponent: React.FC<Props> = observer(({ category }) => {
  const { setActiveCategory, activeCategory } = TaskStore;
  const onClickCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
  };
  return (
    <div
      className={clsx(
        activeCategory === category ? 'bg-slate-300' : '',
        'cursor-pointer hover:bg-slate-300 transition-colors mb-2 px-1',
      )}
      onClick={() => onClickCategory(category)}>
      {category}
    </div>
  );
});

export default CategoryComponent;
