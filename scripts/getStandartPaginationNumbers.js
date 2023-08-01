const getStandartPaginationNumbers = (pages) => {
	for (let i = 1; i <= pages; i++) {
		const li = document.createElement('li');
		li.classList.add('page-item');
		li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		li.addEventListener('click', (e) => {
			standartPagination(i);
			paginationShorter(e.target);
			li.classList.add('disabled');
		});
		paginationContainer.append(li);
	}
};
