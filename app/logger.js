import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';

const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  return state;
};

const logger = createLogger({
  stateTransformer,
});

export default logger;
