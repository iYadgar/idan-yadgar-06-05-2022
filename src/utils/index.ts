export const sleep = (delay = 0) => new Promise((resolve) => {
	setTimeout(resolve, delay);
})
