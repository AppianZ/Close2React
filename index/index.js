/**
 * Created by appian on 2016/12/14.
 */
import './sass/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);