import { createReducer, createDispatchActions } from '../utils/reducer';
import { nanoid } from 'nanoid';

export const initialState = {
	shapes: [],
	color: '#cd5c5c'
};

const ADD_SHAPE = 'ADD_SHAPE';
const LOAD_SHAPES = 'LOAD_SHAPES';
const DELETE_SHAPE = 'DELETE_SHAPE';
const SET_DRAGGABLE_SHAPE = 'SET_DRAGGABLE_SHAPE';
const MOVE_SHAPE = 'MOVE_SHAPE';
const CLEAR_ALL = 'CLEAR_ALL';
const SET_COLOR = 'SET_COLOR';

const Actions = {
	addShape: shape => ({
		type: ADD_SHAPE,
		shape
	}),
	loadShapes: shapes => ({
		type: LOAD_SHAPES,
		shapes
	}),
	deleteShape: id => ({
		type: DELETE_SHAPE,
		id
	}),
	setDraggableShape: id => ({
		type: SET_DRAGGABLE_SHAPE,
		id
	}),
	moveShape: (dx, dy) => ({
		type: MOVE_SHAPE,
		dx,
		dy
	}),
	clearAll: () => ({
		type: CLEAR_ALL
	}),
	setColor: color => ({
		type: SET_COLOR,
		color
	})
};

const createShape = (shape, color) => ({
	...shape,
	id: nanoid(),
	color: color ?? shape.color
});

export const reducer = createReducer({
	[ADD_SHAPE]: (state, action) => {
		const { shapes } = state;

		return {
			...state,
			shapes: [...shapes, createShape(action.shape, state.color)]
		};
	},
	[LOAD_SHAPES]: (state, action) => {
		return {
			...state,
			shapes: action.shapes.map(shape => createShape(shape))
		};
	},
	[DELETE_SHAPE]: (state, action) => {
		const { shapes } = state;
		return {
			...state,
			shapes: shapes.filter(shape => shape.id !== action.id)
		};
	},
	// set the selected shape to be the last one to be above others (last shape canvas draw)
	[SET_DRAGGABLE_SHAPE]: (state, action) => {
		const { shapes } = state;
		const shapeToMoveLast = shapes.find(shape => shape.id === action.id);
		const newShapes = shapes.filter(shape => shape.id !== action.id);
		newShapes.push(shapeToMoveLast);
		return {
			...state,
			shapes: newShapes
		};
	},
	// always set the last element cause this is the draggable element (see setDraggableShape action)
	[MOVE_SHAPE]: (state, action) => {
		const { shapes } = state;
		const { dx, dy } = action;

		return {
			...state,
			shapes: shapes.map((shape, i) => {
				if (i === shapes.length - 1) {
					return {
						...shape,
						x: shape.x + dx,
						y: shape.y + dy
					};
				}

				return shape;
			})
		};
	},
	[CLEAR_ALL]: state => {
		return {
			...state,
			shapes: []
		};
	},
	[SET_COLOR]: (state, action) => {
		return {
			...state,
			color: action.color
		};
	}
});

export const createActions = createDispatchActions(Actions);
