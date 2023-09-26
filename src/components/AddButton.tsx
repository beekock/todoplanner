import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import AddTaskModal from './modals/AddTaskModal';

const AddButton: React.FC = () => {
  const [isModal, setModal] = useState(false);
  return (
    <>
      {isModal ? (
        createPortal(<AddTaskModal setModal={setModal} />, document.body)
      ) : (
        <button onClick={() => setModal(true)}>+ Добавить задачу</button>
      )}
    </>
  );
};

export default AddButton;
