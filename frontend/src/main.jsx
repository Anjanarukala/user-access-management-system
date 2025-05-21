// frontend/src/main.jsx (or a dedicated axios config file)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import axios from 'axios'; // Import axios
import 'bootstrap/dist/css/bootstrap.min.css'
// Set global default for Axios to send cookies with all requests
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);