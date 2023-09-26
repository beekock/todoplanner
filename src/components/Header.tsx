import { observer } from 'mobx-react-lite';
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import burger from '../assets/burger-ico.svg';
import UiStore from '../store/UiStore';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = observer(() => {
  const { isMobile, setIsMobile } = UiStore;
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <header className="flex justify-between border-b border-black  dark:border-yellow-100">
        {!isOpen && isMobile ? (
          <button onClick={() => setOpen((prev) => !prev)} className="w-10 h-10 ml-auto mr-0 mt-2">
            <img src={burger} alt="burger_ico" />
          </button>
        ) : (
          <div className="dark:bg-darkblue bg-primary dark:border-yellow-100 dark:text-white absolute w-full h-screen top-0 z-10 justify-evenly items-center py-2 md:h-20 md:relative md:justify-between md:flex-row md:flex transition-colors">
            <nav className="p-3 flex flex-col h-[200px] justify-between md:flex-row mt-10 md:h-full md:mt-2 text-xl transition-colors">
              <Link
                to="/"
                className="p-2 hover:text-slate-400"
                onClick={() => setOpen((prev) => !prev)}>
                Home
              </Link>
              <Link
                to="/todo"
                className="p-2 hover:text-slate-400"
                onClick={() => setOpen((prev) => !prev)}>
                ToDo
              </Link>
              <Link
                to="/calendar"
                className="p-2 hover:text-slate-400"
                onClick={() => setOpen((prev) => !prev)}>
                Calendar
              </Link>
            </nav>
            <ThemeToggle />
            {isMobile && (
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="absolute top-2 right-2 p-2 w-10 h-10 border rounded-full border-black hover:bg-slate-200 transition-colors">
                X
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
});

export default Header;
