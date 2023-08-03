import { SnackbarProvider } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BurgerMenu from './components/BurgerMenu';
import Footer from './components/Footer';
import Header from './components/Header';
import CalendarPage from './pages/CalendarPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ToDoPage from './pages/ToDoPage';
import TaskStore from './store/TaskStore';

function App() {
  const { getData } = TaskStore;
  useEffect(() => {
    getData();
  }, []);
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      className="h-full max-w-[1076px] my-0 mx-auto border border-black rounded-sm flex flex-col"
      id="app">
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {' '}
        {isMobile ? <BurgerMenu /> : <Header />}
        <main className="h-full flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<ToDoPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </SnackbarProvider>
    </div>
  );
}

export default App;
