import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import burger from '../assets/burger-ico.svg';

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 767px)').matches);
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
      <header className="flex justify-between border-b border-black f">
        {!isOpen && isMobile ? (
          <button onClick={() => setOpen((prev) => !prev)} className="w-10 h-10 ml-auto mr-0 mt-2">
            <img src={burger} alt="burger_ico" />
          </button>
        ) : (
          <div className="absolute w-full h-screen top-0 bg-white z-10 justify-evenly items-center py-2 md:h-20 md:relative md:justify-between md:flex-row md:flex">
            <nav className="p-3 flex flex-col h-[200px] justify-between md:flex-row mt-10 md:h-full md:mt-2 ">
              <Link
                to="/"
                className="border border-black p-2"
                onClick={() => setOpen((prev) => !prev)}>
                Home
              </Link>
              <Link
                to="/todo"
                className="border border-black p-2"
                onClick={() => setOpen((prev) => !prev)}>
                ToDo
              </Link>
              <Link
                to="/calendar"
                className="border border-black p-2"
                onClick={() => setOpen((prev) => !prev)}>
                Calendar
              </Link>
            </nav>
            <div className="p-5 mr-[20px]">TEMA</div>
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
};

export default Header;
