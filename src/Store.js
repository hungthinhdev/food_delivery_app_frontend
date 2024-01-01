// import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import Reducers from './reducers';

const store = configureStore({
  reducer: Reducers,
});

const getToken = () => store?.getState()?.generalState?.token;

export {store, getToken};
