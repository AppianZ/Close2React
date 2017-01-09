/**
 * Created by appian on 2017/1/9.
 */
import { index_type } from '../index_type';

let nextTodoId = 0;

export const addTodo = (text) => ({
	type: index_type.ADD_TODO,
	id: nextTodoId++,
	text
});

export const setVisibilityFilter = (filter) => ({
	type: index_type.SET_VISIBILITY_FILTER,
	filter
});

export const toggleTodo = (id) => ({
	type: index_type.TOGGLE_TODO,
	id
});