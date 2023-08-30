import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss';

const apiUrl = 'https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/movies';

const App = () => {
  return <MainView apiUrl={apiUrl} />;
};



const root = document.getElementById('root');
const appRoot = createRoot(root);
appRoot.render(<App />);