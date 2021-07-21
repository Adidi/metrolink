import { useMemo } from 'react';
import Shape from './shape';
import { Wrapper } from './shapes-picker.style';

const ShapesPicker = () => {
	const shapes = useMemo(() => {
		return [
			{ type: 'rect', x: 0, y: 0 },
			{ type: 'circle', x: 50, y: 50 },
			{ type: 'triangle', x: 50, y: 0 },
			{ type: 'smiley', x: 50, y: 50 }
		];
	}, []);

	return (
		<Wrapper className="shapes-picker">
			{shapes.map(shape => (
				<Shape key={shape.type} shape={shape} />
			))}
		</Wrapper>
	);
};

export default ShapesPicker;
