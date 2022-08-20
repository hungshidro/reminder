export const uniqBy = (arr: any, key: any) => {
	const seen = new Set();
	return arr.filter((item: any) => {
		const k = key(item);
		return seen.has(k) ? false : seen.add(k);
	});
};
