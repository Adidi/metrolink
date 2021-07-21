const Shapes = {
	rect: {
		render: shape => {
			const path = new Path2D();
			const { x, y } = shape;
			path.rect(x, y, 100, 100);
			return path;
		}
	},
	circle: {
		render: shape => {
			const path = new Path2D();
			const { x, y } = shape;
			path.arc(x, y, 50, 0, Math.PI * 2);
			return path;
		}
	},
	triangle: {
		render: shape => {
			const path = new Path2D();
			const { x, y } = shape;
			path.moveTo(x, y);
			path.lineTo(x - 50, y + 100);
			path.lineTo(x + 50, y + 100);
			path.lineTo(x, y);
			return path;
		}
	},
	smiley: {
		render: shape => {
			const path = new Path2D();
			const { x, y } = shape;
			path.arc(x, y, 50, 0, Math.PI * 2, true);
			path.moveTo(x + 35, y);
			path.arc(x, y, 35, 0, Math.PI, false);
			path.moveTo(x - 10, y - 10);
			path.arc(x - 15, y - 10, 5, 0, Math.PI * 2, false);
			path.moveTo(x + 20, y - 10);
			path.arc(x + 15, y - 10, 5, 0, Math.PI * 2, false);
			return path;
		}
	}
};

const getRenderPath = shape => {
	const renderShape = Shapes[shape.type];

	if (!renderShape) {
		throw Error(`Unrecognized shape type '${shape.type}'`);
	}

	return renderShape.render(shape);
};

export default getRenderPath;
