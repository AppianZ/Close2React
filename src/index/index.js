/**
 * Created by appian on 2016/12/14.
 */
import './sass/index.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './app';

const div = document.createElement('div');
document.body.appendChild(div);
render(<App />, div);