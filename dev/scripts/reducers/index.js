import { combineReducers } from 'redux';
import CurrentUserReducer from './currentUser';

const rootReducer = combineReducers({
    currentUser: CurrentUserReducer
});

export default rootReducer;