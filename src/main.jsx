import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import { installDocRoiChrome } from './docroi-chrome.js';
import { installConnection00Hooks } from './guided-connection00.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

installDocRoiChrome();
installConnection00Hooks();
