const standartPagination = (page) => {
	cardBox.innerHTML = '';
	if (page === 1) {
		getCards(baseUrl);
	} else {
		getCards(baseUrl + `?page=${page}`);
	}
};
