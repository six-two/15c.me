import { Action } from './actions';
import * as C from './constants';
import { ReduxState, fallbackState } from './store';


export default function reducer(state: ReduxState | undefined, action: Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case C.ACTION_TODO:
      return state;
    case "@@INIT":
      return state;
    default:
      console.warn(`Unknown action type: "${action.type}"`);
      return state;
  }
}
