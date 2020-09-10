import { createStore } from 'redux';
import reducer from './reducer';
// import * as C from './constants';

export interface ReduxState {
  todo: string,
}

export const fallbackState: ReduxState = {
  todo: "TODO",
}

let devTools = undefined;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  // Redux dev tools are available
  let devToolOptions = {
    trace: false,
    traceLimit: 25
  };
  devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__(devToolOptions);
}

export default createStore(reducer, fallbackState, devTools);
