import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { MainView } from './components/main-view/main-view';
import './index.scss';

let allowedOrigins = ['http://localhost:1234', 'http://testsite.com', 'https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com'];

app.use(cors({
 origin: (origin, callback) => {
   if(!origin) return callback(null, true);
   if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
     let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
     return callback(new Error(message ), false);
   }
   return callback(null, true);
 }
}));

const apiUrl = 'https://guarded-hamlet-46049-f301c8b926bd.herokuapp.com/movies';

const App = () => {
  return <MainView apiUrl={apiUrl} />;
};



const root = document.getElementById('root');
const appRoot = createRoot(root);
appRoot.render(<App />);