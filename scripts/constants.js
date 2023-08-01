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

const switchBtn = document.querySelector('.switch');
