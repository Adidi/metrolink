import React, { useRef, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useEventListener } from '../../../hooks';
import getRenderPath from '../../../render-shapes';
import { preventBrowserDefault } from '../../../utils/dom';

const Canvas = ({ shapes, actions }) => {
	const { setDraggableShape, moveShape, addShape, deleteShape } = actions;
	const mainRef = useRef(null);
	const canvasRef = useRef(null);
	const { current: meta } = useRef({});

	const mapPathsRef = useRef({});

	const clearCanvas = useCallback(
		() => meta.context.clearRect(0, 0, meta.canvasWidth, meta.canvasHeight),
		[meta]
	);

	const init = useCallback(() => {
		const rect = mainRef.current.getBoundingClientRect();
		const canvas = canvasRef.current;
		canvas.width = meta.canvasWidth = rect.width;
		canvas.height = meta.canvasHeight = rect.height;

		const context = canvas.getContext('2d');

		meta.context = context;
		meta.offsetX = rect.x;
		meta.offsetY = rect.y;
	}, [meta]);

	const render = useCallback(() => {
		clearCanvas();
		mapPathsRef.current = {};
		for (const shape of shapes) {
			meta.context.fillStyle = shape.color;
			if ([meta.selected, meta.drag].includes(shape.id)) {
				meta.context.shadowColor = '#000';
				meta.context.shadowBlur = 6;
			} else {
				meta.context.shadowColor = 'transparent';
			}

			const path = getRenderPath(shape);
			mapPathsRef.current[shape.id] = path;

			meta.context.fill(path);
		}
	}, [clearCanvas, meta, shapes]);

	const bodyOnKeyPress = useCallback(
		e => {
			if (e.key === 'Delete' && meta.selected) {
				deleteShape(meta.selected);
			}
		},
		[deleteShape, meta]
	);

	const bodyOnMouseUp = useCallback(() => {
		meta.drag = false;
	}, [meta]);

	const windowOnResize = useCallback(() => {
		init();
		render();
	}, [init, render]);

	useEventListener('keypress', bodyOnKeyPress, document.body);
	useEventListener('mouseup', bodyOnMouseUp, document.body);
	useEventListener('resize', windowOnResize);

	useEffect(() => {
		init();
	}, [init]);

	// call render shapes after each render canvas Comp
	useEffect(render);

	const [, drop] = useDrop(() => ({
		accept: 'Shape',
		drop: (item, monitor) => {
			const dragShapeOffset = monitor.getSourceClientOffset();

			const x = dragShapeOffset.x - meta.offsetX + item.shape.x;
			const y = dragShapeOffset.y - meta.offsetY + item.shape.y;

			addShape({ type: item.shape.type, x, y });
		}
	}));

	const getCoordinates = e => ({
		x: parseInt(e.clientX - meta.offsetX, 10),
		y: parseInt(e.clientY - meta.offsetY, 10)
	});

	return (
		<div
			ref={r => {
				drop(r);
				mainRef.current = r;
			}}
			className="canvas"
		>
			<canvas
				onMouseDown={e => {
					preventBrowserDefault(e);

					const { x, y } = getCoordinates(e);

					meta.drag = false;

					let i = shapes.length;
					// start from end cause we need to take the most above shape on the canvas
					// which is always the latest ordered shape the canvas draw in the array
					while (i--) {
						const shape = shapes[i];
						const path = mapPathsRef.current[shape.id];
						if (meta.context.isPointInPath(path, x, y)) {
							meta.drag = meta.selected = shape.id;
							setDraggableShape(shape.id);
							meta.startDragX = x;
							meta.startDragY = y;
							break;
						}
					}
				}}
				onMouseUp={e => {
					preventBrowserDefault(e);
					meta.drag = false;
				}}
				onMouseMove={e => {
					preventBrowserDefault(e);

					if (meta.drag) {
						const { x, y } = getCoordinates(e);

						const dx = x - meta.startDragX;
						const dy = y - meta.startDragY;

						moveShape(dx, dy);

						meta.startDragX = x;
						meta.startDragY = y;
					}
				}}
				ref={canvasRef}
			></canvas>
		</div>
	);
};

export default React.memo(Canvas);
