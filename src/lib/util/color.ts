export const lightenColor = (color: string) => {
	const red = parseInt(color.substring(1, 3), 16);
	const green = parseInt(color.substring(3, 5), 16);
	const blue = parseInt(color.substring(5, 7), 16);
	const lightness = 0.2;
	const newRed = Math.floor((255 - red) * lightness) + red;
	const newGreen = Math.floor((255 - green) * lightness) + green;
	const newBlue = Math.floor((255 - blue) * lightness) + blue;
	return '#' + newRed.toString(16) + newGreen.toString(16) + newBlue.toString(16);
};

export const lighterenColor = (color: string) => {
	return lightenColor(lightenColor(color)); // yeah
};
