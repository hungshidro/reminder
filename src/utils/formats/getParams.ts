export const getParamsURL = (name: string, url: string) => {
	const newURL = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
	const regexString = '[\\?&]'+newURL+'=([^&#]*)';
	const regex = new RegExp( regexString );
	const results = regex.exec(url);
	return results == null ? null : results[1];
};
