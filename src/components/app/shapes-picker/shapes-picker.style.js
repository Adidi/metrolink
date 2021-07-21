import styled from 'styled-components';

export const Wrapper = styled.div`
	border-right: 1px solid black;

	.shape {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		border-bottom: 1px solid black;

		canvas {
			cursor: move;
		}
	}
`;
