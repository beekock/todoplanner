import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import UiStore from '../store/UiStore';

const ThemeToggle: React.FC = observer(() => {
  const { theme, toggleTheme } = UiStore;
  useEffect(() => {
    document.body.classList.remove('dark');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }, [theme]);
  return (
    <div className="p-2">
      <button onClick={() => toggleTheme()} className="text-2xl">
        {theme === 'light' ? '🌞' : '🌙'}
      </button>
    </div>
  );
});

export default ThemeToggle;
