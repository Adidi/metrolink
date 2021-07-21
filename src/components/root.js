import { useReducer, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { reducer, initialState, StateContext, createActions } from '../state';
import App from './app';
import GlobalStyle from './global.style';

const Root = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const actions = useMemo(() => createActions(dispatch), []);

	return (
		<StateContext.Provider value={{ state, actions }}>
			<GlobalStyle />
			<DndProvider backend={HTML5Backend}>
				<App />
			</DndProvider>
		</StateContext.Provider>
	);
};

export default Root;
