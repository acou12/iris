/**
 * @returns whether `arr1` and `arr2` have exactly the same elements
 *          in exactly the same order (where "same" is defined using
 *          `compareElements`, defaulting to normal equality)
 */
export const equalArrays = <T>(
	arr1: T[] | undefined,
	arr2: T[] | undefined,
	compareElements: (t1: T, t2: T) => boolean = (x, y) => x === y
): boolean => {
	if (arr1 === undefined || arr2 === undefined) {
		/* at least one is undefined */
		if (arr1 === undefined && arr2 === undefined) {
			/* both are undefined */
			return true;
		} else {
			/* exactly one is undefined */
			return false;
		}
	}
	if (arr1.length !== arr2.length) {
		return false;
	}
	for (let i = 0; i < arr1.length; i++) {
		if (!compareElements(arr1[i], arr2[i])) {
			return false;
		}
	}
	return true;
};
