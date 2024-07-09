import {legacy_createStore as createStore, combineReducers} from 'redux';
import {ThemeState} from './Slices/Theme.slice';
export interface StoreInterface {
  theme: ThemeState;
}
const reducer = combineReducers({
  theme: ThemeState.reducer,
});
export const store = createStore(reducer);
