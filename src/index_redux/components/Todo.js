/**
 * Created by appian on 2017/1/9.
 */
import  React from 'react';

const Todo = ({ onClick, completed, text }) => (
	<li
		onClick={onClick}
		style={{
			textDecoration: completed? 'line-through' : 'none'
		}}
	>{text}</li>
);

export default Todo;