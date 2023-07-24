import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <header className="flex justify-between border-b border-black">
        <nav className="p-3 flex">
          <Link to="/" className="border border-black p-2">
            Home
          </Link>
          <Link to="/todo" className="border border-black p-2">
            ToDo
          </Link>
          <Link to="/calendar" className="border border-black p-2">
            Calendar
          </Link>
        </nav>
        <div className="p-5 mr-[20px]">TEMA</div>
      </header>
    </>
  );
};

export default Header;
