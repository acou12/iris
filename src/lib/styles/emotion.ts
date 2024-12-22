import { lightenColor } from '$lib/util/color';
import { css } from '@emotion/css';

export const irisButton = (color: string, enabled: boolean) => {
	const lightColor = lightenColor(color);
	const veryLightColor = lightenColor(color);
	return css`
		color: white;
		margin: 10px;
		padding: 10px;
		padding-bottom: 50px;
		border-radius: 8px;
		border: 2px solid ${enabled ? color : veryLightColor};
		background: ${enabled
			? css`linear-gradient(to right, ${color}, ${lightColor})`
			: veryLightColor};
		${enabled
			? css`
					&:hover {
						background: white;
						h2 {
							color: ${color};
						}
						* {
							fill: ${color} !important;
						}
					}
			  `
			: ``}
		svg {
			position: absolute;
			right: 50px;
			top: 10%;
			height: 80%;
			width: auto;
		}
	`;
};
