// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectInitialState = () => {
  return (state) => {
    const initialState = state.get('initial'); // or state.route

    return initialState.get('info');
  };
};

export {
  makeSelectLocationState,
  makeSelectInitialState,
};
