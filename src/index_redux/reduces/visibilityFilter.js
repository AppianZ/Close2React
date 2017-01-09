/**
 * Created by appian on 2017/1/9.
 */
import { index_type } from '../index_type';

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		case index_type.SET_VISIBILITY_FILTER:
			return action.filter;
		default: return state;
	}
};

export default visibilityFilter;