/**
 * Created by appian on 2017/1/9.
 */
import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
	todos,
	visibilityFilter
});

export default todoApp;