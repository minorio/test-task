modalClose.addEventListener('click', (event) => {
	modal.style.display = 'none';
	body.style.overflow = 'visible';
});

window.addEventListener('click', (event) => {
	if (event.target == modal) {
		modal.style.display = 'none';
		body.style.overflow = 'visible';
	}
});

(async function () {
	await fetch(baseUrl)
		.then((res) => res.json())
		.then((res) => {
			getStandartPaginationNumbers(res.info.pages);
		});
	if (localStorage.getItem('paginationMode') === 'StandartPagination') {
		paginationShorter();
	} else {
		paginationContainer.querySelectorAll('li a').forEach((a) => {
			a.parentElement.classList.add('hide');
		});
	}
	await getCards(baseUrl);
})();

if (localStorage.getItem('paginationMode') === 'InfinitePagination') {
	window.addEventListener('scroll', infiniteScroll);
}

window.addEventListener('scroll', (e) => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		movetopBtn.style.display = 'block';
	} else {
		movetopBtn.style.display = 'none';
	}
});

switchBtn.addEventListener('click', togglePagination);

if (!localStorage.getItem('paginationMode')) {
	setPagination('StandartPagination');
}

(function () {
	if (localStorage.getItem('paginationMode') === 'StandartPagination') {
		document.getElementById('switch').checked = false;
	} else {
		document.getElementById('switch').checked = true;
	}
})();
