import { useState } from 'react';
import Header from './Header';
import burger from '../assets/burger-ico.svg';
const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 ml-auto mr-0 mt-5">
        <img src={burger} alt="burger_ico" />
      </button>
      {isOpen && <Header />}
    </>
  );
};

export default BurgerMenu;
