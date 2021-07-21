import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Wrapper } from './color-picker.style';

const ColorPicker = ({ color, onChange }) => {
	const [show, setShow] = useState(false);

	return (
		<Wrapper bgColor={color} className="color-picker">
			<div
				className="handler"
				onClick={() => {
					setShow(show => !show);
				}}
			>
				<div className="color"></div>
			</div>
			{show && (
				<div className="picker">
					<div className="cover" onClick={() => setShow(false)} />
					<SketchPicker color={color} onChange={color => onChange(color.hex)} />
				</div>
			)}
		</Wrapper>
	);
};

export default ColorPicker;
