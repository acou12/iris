import { lightenColor } from '$lib/util/color';
import { css } from '@emotion/css';

export const irisButton = (color: string) => css`
	border: 2px solid ${color};
	background: linear-gradient(to right, ${color}, ${lightenColor(color)});
	&:hover {
		background: white;
		h2 {
			color: ${color};
		}
	}
`;
