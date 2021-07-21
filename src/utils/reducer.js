export const createReducer = handlers => (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

export const createDispatchActions = Actions => dispatch =>
	Object.values(Actions).reduce((acc, curr) => {
		acc[curr.name] = (...args) => dispatch(curr(...args));
		return acc;
	}, {});
