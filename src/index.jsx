import React from 'react';
import ReactDOM from 'react-dom';



import { createRoot } from 'react-dom/client';

// Import statement to indicate that you need to bundle `./index.scss`
import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view";

ReactDOM.render(<MainView />, document.getElementById('root'));

import "./index.scss";
const App = () => {
  return <MainView />;
 };
 
 const container = document.querySelector("#root");
 const root = createRoot(container);
 root.render(<App />);