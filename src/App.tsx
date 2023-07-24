import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ToDoPage from './pages/ToDoPage';
import TaskStore from './store/TaskStore';

function App() {
  const { getData } = TaskStore;
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="h-full max-w-[900px] my-0 mx-auto border border-black rounded-sm flex flex-col">
      <Header />
      <main className="h-full flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
