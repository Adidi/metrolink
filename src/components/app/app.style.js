import styled from 'styled-components';

const HEADER_HEIGHT = 50;
const SHAPES_PICKER_WIDTH = 140;

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: ${SHAPES_PICKER_WIDTH}px 1fr;
	grid-template-areas:
		'header header'
		'shapes-picker canvas'
		'shapes-picker canvas';
	grid-template-rows: ${HEADER_HEIGHT}px 1fr;
	width: 100vw;
	height: 100vh;

	header {
		grid-area: header;
		border-bottom: 1px solid black;
		display: flex;
		align-items: center;
		padding: 0 20px;

		.cp-wrapper {
			display: flex;
			align-items: center;

			.color-picker {
				margin-left: 5px;
			}
		}

		button {
			display: inline-block;
			margin-left: 10px;
		}
	}

	.shapes-picker {
		grid-area: shapes-picker;
	}

	.canvas {
		grid-area: canvas;
	}
`;
