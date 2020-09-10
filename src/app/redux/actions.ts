import * as C from './constants';
import store from './store';

// dispatch
const d = store.dispatch;

// actions
export interface Action {
  type: string,
  payload: string | number | boolean | null,
}

// action creators
export function todo() {
  d({
    type: C.ACTION_TODO,
    payload: null,
  });
}
