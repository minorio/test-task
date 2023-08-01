const getCards = async (url) => {
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
};
