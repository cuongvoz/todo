import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import dotenv from 'dotenv';
import { ToastContainer } from 'react-toastify';
import TodoProvider from './features/Todo/contexts/TodoProvider';

dotenv.config();

function App(): JSX.Element {
  document.title = 'Todo app của cường'
  return (
    <div className='App'>
      <TodoProvider >
        <Layout />
      </TodoProvider>
    </div>
  );
}

export default App;
