import { useAppState } from '../../state';
import Canvas from './canvas';
import Header from './header';
import ShapesPicker from './shapes-picker';
import { Wrapper } from './app.style';

const App = () => {
	const { state, actions } = useAppState();
	const { shapes } = state;

	return (
		<Wrapper>
			<Header />
			<ShapesPicker />
			<Canvas shapes={shapes} actions={actions} />
		</Wrapper>
	);
};

export default App;
