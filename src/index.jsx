import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import './index.scss';


let allowedOrigins = ['http://localhost:1234', 'http://testsite.com', 'https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com'];



const apiUrl = 'https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/movies';


const App = () => {
  return <MainView apiUrl={apiUrl} />;
};



const root = document.getElementById('root');
const appRoot = createRoot(root);
appRoot.render(<App />);