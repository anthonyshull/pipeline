import { append } from 'sanctuary';

import { RANDOM_INT_RECEIVED } from './actions';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case RANDOM_INT_RECEIVED:
      return append(action.data, state);
    default:
      return state;
  }
}
