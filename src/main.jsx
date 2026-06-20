import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

function cleanConnection00Copy() {
  const legacyBlock = document.getElementById('bloque-formativo');
  if (legacyBlock) legacyBlock.remove();

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const replacements = [];
  while (walker.nextNode()) {
    if (walker.currentNode.nodeValue.includes('Aprende jugando a programar la máquina')) {
      replacements.push(walker.currentNode);
    }
  }
  replacements.forEach((node) => {
    node.nodeValue = node.nodeValue.replace(
      'Aprende jugando a programar la máquina',
      'Aprende jugando a programar la IA generativa'
    );
  });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

requestAnimationFrame(cleanConnection00Copy);
setTimeout(cleanConnection00Copy, 250);
