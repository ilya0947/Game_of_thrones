import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
// console.log(React.StrictMode.children)
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>, document.getElementById('root'));