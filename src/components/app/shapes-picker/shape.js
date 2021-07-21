import { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import getRenderPath from '../../../render-shapes';

const Shape = ({ shape }) => {
	const canvasRef = useRef(null);

	const [, drag] = useDrag(() => ({
		type: 'Shape',
		item: { shape }
	}));

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		const path = getRenderPath(shape);

		context.stroke(path);
	}, [shape]);

	return (
		<div className="shape">
			<canvas
				ref={r => {
					drag(r);
					canvasRef.current = r;
				}}
				width={100}
				height={100}
			></canvas>
		</div>
	);
};

export default Shape;
