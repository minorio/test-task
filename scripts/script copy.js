const baseUrl = 'https://rickandmortyapi.com/api/character';

const cardBox = document.querySelector('.card__container');
const modal = document.querySelector('.modal');

const modalContent = document.createElement('div');
const modalClose = document.createElement('span');
const modalInnerBox = document.createElement('div');
const modalImgBox = document.createElement('div');
const modalImg = document.createElement('img');
const modalInfo = document.createElement('div');
const modalName = document.createElement('h3');
const modalOrigin = document.createElement('h3');
const modalStatus = document.createElement('h3');
const modalLocaton = document.createElement('h3');
const modalSpecies = document.createElement('h3');
const modalGender = document.createElement('h3');

const movetopBtn = document.querySelector('.movetop__btn');

const paginationContainer = document.querySelector('.pagination');

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

async function getCards(url) {
	try {
		createLoader();
		await fetch(url)
			.then((res) => res.json())
			.then((res) => {
				sessionStorage.next = res.info.next;
				res.results.forEach((element) => {
					const card = document.createElement('div');
					const cardTitleBox = document.createElement('div');
					const cardImgBox = document.createElement('div');
					const cardImg = document.createElement('img');
					const cardTitle = document.createElement('h3');
					cardTitle.innerText = element.name;

					card.classList.add('card');
					cardTitleBox.classList.add('card-title__box');
					cardImgBox.classList.add('card-img__box');
					cardTitle.classList.add('card-title__box-title');
					cardImg.classList.add('card-img__box-img');

					cardImg.src = `https://rickandmortyapi.com/api/character/avatar/${element.id}.jpeg`;

					cardImgBox.append(cardImg);
					cardTitleBox.append(cardTitle);
					card.append(cardImgBox, cardTitleBox);
					cardBox.append(card);
					card.addEventListener('click', (event) => {
						body.style.overflow = 'hidden';
						modalImg.src = `https://rickandmortyapi.com/api/character/avatar/${element.id}.jpeg`;
						modalContent.classList.add('modal__content');
						modalClose.classList.add('close');
						modalInnerBox.classList.add('modal__inner-box');
						modalImgBox.classList.add('modal__container');
						modalImg.classList.add('modal__container-img');
						modalInfo.classList.add('modal__info');

						modalClose.innerHTML = '&times;';
						modal.style.display = 'block';

						modalName.innerHTML = `Name: <span>${element.name}</span>`;
						modalOrigin.innerHTML = `Origin: <span>${element.origin.name}</span>`;
						modalStatus.innerHTML = `Status: <span>${element.status}</span>`;
						modalLocaton.innerHTML = `Location: <span>${element.location.name}</span>`;
						modalSpecies.innerHTML = `Species: <span>${element.species}</span>`;
						modalGender.innerHTML = `Gender: <span>${element.gender}</span>`;

						modalInfo.append(
							modalName,
							modalOrigin,
							modalStatus,
							modalLocaton,
							modalSpecies,
							modalGender
						);
						modalImgBox.append(modalImg);
						modalInnerBox.append(modalImgBox, modalInfo);
						modalContent.append(modalClose, modalInnerBox);
						modal.append(modalContent);
					});
				});
			});
	} catch {
	} finally {
		loaderWait();
		movetopBtn.style.display = 'none';
	}
}

(async function () {
	await fetch(baseUrl)
		.then((res) => res.json())
		.then((res) => {
			getStandartPaginationNumbers(res.info.pages);
		});
	if (localStorage.getItem('paginationMode') === 'StandartPagination') {
		paginationShorter();
	} else {
		const pages = paginationContainer.querySelectorAll('li a').forEach((a) => {
			a.parentElement.classList.add('hide');
		});
	}
	await getCards(baseUrl);
})();

function paginationShorter(eventTarget = document.querySelector('li a')) {
	const currentPage = eventTarget;

	const pages = paginationContainer.querySelectorAll('li a');

	pages.forEach((a) => {
		a.parentElement.classList.remove('hide');
		if (Number(currentPage.innerText) + 5 < Number(a.innerText)) {
			console.log('hide');
			a.parentElement.classList.add('hide');
		}
		if (Number(currentPage.innerText) - 5 > Number(a.innerText)) {
			a.parentElement.classList.add('hide');
			console.log('ne hide');
		}
	});
	console.log(currentPage);
	const firstPage = pages[0].parentElement;
	const lastPage = pages[pages.length - 1].parentElement;

	firstPage.classList.remove('hide');
	firstPage.classList.add('indent-first');
	lastPage.classList.remove('hide');
	lastPage.classList.add('indent-last');
}
function infiniteScroll() {
	const height = document.body.offsetHeight;
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
}

function standartPagination(page) {
	cardBox.innerHTML = '';
	if (page === 1) {
		getCards(baseUrl);
	} else {
		getCards(baseUrl + `?page=${page}`);
	}
}

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

// movetopBtn.addEventListener('click', (e) => {
// 	document.body.style.scrollBehavior = 'smooth';
// 	document.documentElement.scrollTop = 0;
// 	document.body.scrollTop = 0;
// });

const switchBtn = document.querySelector('.switch');

switchBtn.addEventListener('click', togglePagination);

function setPagination(paginationName) {
	localStorage.setItem('paginationMode', paginationName);
}
if (!localStorage.getItem('paginationMode'))
	setPagination('StandartPagination');

function togglePagination() {
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
}

(function () {
	if (localStorage.getItem('paginationMode') === 'StandartPagination') {
		// setPagination('theme-dark');
		document.getElementById('switch').checked = false;
	} else {
		// setPagination('theme-light');
		document.getElementById('switch').checked = true;
	}
})();

function getStandartPaginationNumbers(pages) {
	for (let i = 1; i <= pages; i++) {
		const li = document.createElement('li');
		li.classList.add('page-item');
		if (pages === i - 1) {
			li.classList.add('disabled');
		}
		li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
		// li.id = i;
		li.addEventListener('click', (e) => {
			standartPagination(i);
			paginationShorter(e.target);
		});
		paginationContainer.append(li);
	}
}
