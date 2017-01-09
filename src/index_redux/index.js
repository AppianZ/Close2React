/**
 * Created by appian on 2017/1/9.
 */
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import reducer from './reduces';

const root = document.createElement('div');
document.body.appendChild(root);

const store = createStore(reducer);
console.log(store.getState());

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	root
);
