const body = document.body;

const loaderWait = () => {
	body.style.overflow = 'hidden';
	setTimeout(() => {
		if (document.querySelector('.loader__mask')) {
			document.querySelector('.loader__mask').remove();
			body.style.overflow = 'visible';
		}
	}, 600);
};

const createLoader = () => {
	if (document.querySelector('.loader__mask')) {
		document.querySelector('.loader__mask').remove();
	}
	const loaderMask = document.createElement('div');
	loaderMask.classList.add('loader__mask');
	loaderMask.innerHTML =
		'<div class="loader__mask"><div class="loader">Loading...</div></div>';
	document.body.append(loaderMask);
};

window.addEventListener('load', loaderWait);
