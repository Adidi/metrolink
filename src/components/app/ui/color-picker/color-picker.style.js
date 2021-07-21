import styled from 'styled-components';

export const Wrapper = styled.div`
	display: inline-block;

	.handler {
		padding: 5px;
		background: #fff;
		border-radius: 1px;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
		cursor: pointer;

		.color {
			width: 36px;
			height: 14px;
			border-radius: 2px;
			background: ${props => props.bgColor};
		}
	}

	.picker {
		position: absolute;
		z-index: 2;
	}

	.cover {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}
`;
