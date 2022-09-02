import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';

export { default as Copyright } from './components/Copyright'
export { default as HandTextField } from './components/HandTextField'
export { default as MessageMarquee } from "./components/MessageMarque"
export { default as PromotionTimeTextField } from './components/PromotionTimeTextField'
export { default as TableSeatTextField } from './components/TableSeatTextField'
export { default as TimerButton } from './components/TimerButton'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
