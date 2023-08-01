const paginationShorter = (eventTarget = document.querySelector('li a')) => {
	const currentPage = eventTarget;

	const pages = paginationContainer.querySelectorAll('li a');

	pages.forEach((a) => {
		a.parentElement.classList.remove('hide');
		a.parentElement.classList.remove('disabled');

		if (Number(currentPage.innerText) + 5 < Number(a.innerText)) {
			a.parentElement.classList.add('hide');
		}
		if (Number(currentPage.innerText) - 5 > Number(a.innerText)) {
			a.parentElement.classList.add('hide');
		}
		if (
			Number(a.innerText) === 1 &&
			Number(currentPage.innerText) === Number(a.innerText)
		) {
			a.parentElement.classList.add('disabled');
		}
	});

	const firstPage = pages[0].parentElement;
	const lastPage = pages[pages.length - 1].parentElement;

	firstPage.classList.remove('hide');
	firstPage.classList.add('indent-first');
	lastPage.classList.remove('hide');
	lastPage.classList.add('indent-last');
};
