/**
 * Created by appian on 2017/1/9.
 */
import { index_type } from '../index_type';

const  todo = (state, action) => {
	switch (action.type) {
		case index_type.ADD_TODO:
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case index_type.TOGGLE_TODO:
			if(state.id !== action.id) return state;
			return Object.assign({}, state, {
				completed: !state.completed
			});
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case index_type.ADD_TODO:
			return [
				...state,
				todo(undefined, action)
			];
		case index_type.TOGGLE_TODO:
			return state.map(value => todo(value, action));
		default:
			return state;
	}
};

export default todos;