/**
 * Created by appian on 2017/1/9.
 */
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
	let input;
	 
	return (
		<div>
			<form onSubmit={e => {
				e.preventDefault();
				if(!input.value.trim())return;
				dispatch(addTodo(input.value));
				input.value = '';
			}}>
				<input ref={node => {
					input = node
				}}/>
				<button type="submit">ADD TODO</button>
			</form>
		</div>
	)
};

AddTodo = connect()(AddTodo);

export default AddTodo;