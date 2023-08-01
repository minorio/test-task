const setPagination = (paginationName) => {
	localStorage.setItem('paginationMode', paginationName);
};

const togglePagination = () => {
	cardBox.innerHTML = '';
	const pages = paginationContainer.querySelectorAll('li a');

	if (localStorage.getItem('paginationMode') === 'StandartPagination') {
		setPagination('InfinitePagination');
		window.addEventListener('scroll', infiniteScroll);

		pages.forEach((a) => {
			a.parentElement.classList.add('hide');
		});
	} else {
		setPagination('StandartPagination');
		window.removeEventListener('scroll', infiniteScroll);
		paginationShorter();
	}
	getCards(baseUrl);
};
