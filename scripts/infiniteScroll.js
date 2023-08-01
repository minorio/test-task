const infiniteScroll = () => {
	const height = body.offsetHeight;
	const screenHeight = window.innerHeight;
	const scrolled = window.scrollY;
	const threshold = height - screenHeight / 4;
	const position = scrolled + screenHeight;
	if (position >= threshold) {
		(async () => {
			if (sessionStorage.next !== 'null') {
				window.removeEventListener('scroll', infiniteScroll);
				getCards(sessionStorage.next);
				sessionStorage.page = +sessionStorage.page + 1;
			}
			setTimeout(window.addEventListener('scroll', infiniteScroll), 2000);
		})();
	}
};
