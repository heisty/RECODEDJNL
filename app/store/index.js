import {createStore,compose,applyMiddleware} from 'redux';
import reducer from '../reducer';
// add persistence
import thunk from 'redux-thunk';
export var configureStore = () =>{
	return createStore(reducer,{},compose(applyMiddleware(thunk)));
}

