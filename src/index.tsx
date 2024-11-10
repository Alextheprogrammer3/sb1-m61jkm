/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from "@solidjs/router";
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found. Did you forget to add it to your index.html?');
}

render(() => (
  <Router>
    <App />
  </Router>
), root);