import {createStore,applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
export var configureStore = () =>{
	return createStore(reducer,applyMiddleware(thunk));
}

