import { lightenColor } from '$lib/util/color';
import { css } from '@emotion/css';

export const irisButton = (color: string) => css`
	color: white;
	margin: 10px;
	padding: 10px;
	padding-bottom: 50px;
	border-radius: 8px;
	border: 2px solid ${color};
	background: linear-gradient(to right, ${color}, ${lightenColor(color)});
	&:hover {
		background: white;
		h2 {
			color: ${color};
		}
		* {
			fill: ${color} !important;
		}
	}
	svg {
		position: absolute;
		right: 50px;
		top: 10%;
		height: 80%;
		width: auto;
	}
`;
