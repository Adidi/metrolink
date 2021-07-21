import { format } from 'date-fns';
import { useAppState } from '../../state';
import ColorPicker from './ui/color-picker';
import { saveFile, loadFile } from '../../utils/dom';

const Header = () => {
	const { state, actions } = useAppState();
	const { color, shapes } = state;
	const { setColor, loadShapes, clearAll } = actions;

	const saveToFile = () => {
		const shapesWithoutIds = shapes.map(shape => {
			const { id, ...shapeWithoutId } = shape;
			return shapeWithoutId;
		});
		const data = JSON.stringify(shapesWithoutIds, null, 2);
		saveFile(data, `metrolink-${format(Date.now(), 'dd.MM.yy-HH.mm.ss')}.json`, 'text/plain');
	};

	const loadFromFile = async () => {
		try {
			const content = await loadFile('application/json');
			const json = JSON.parse(content);
			const shapes = json.flatMap(item => {
				const { type, x, y, color } = item;
				const legalShape = [type, x, y, color].every(prop => prop !== undefined);
				return legalShape ? item : [];
			});

			loadShapes(shapes);
		} catch (ex) {
			console.error(ex.message);
		}
	};

	return (
		<header>
			<div className="cp-wrapper">
				<span>Color:</span>
				<ColorPicker color={color} onChange={setColor} />
			</div>
			<button onClick={loadFromFile}>Load</button>
			<button onClick={saveToFile} disabled={!shapes.length}>
				Save
			</button>
			<button onClick={clearAll} disabled={!shapes.length}>
				Clear
			</button>
		</header>
	);
};

export default Header;
