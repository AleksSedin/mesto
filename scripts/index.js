import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";

const popupEditProfile = document.querySelector('#popupEditProfile');
const popupAddPlace = document.querySelector('#popupAddPlace');
const popupImageView = document.querySelector('#popupImageView');

const popupSaveElement = document.querySelector('.popup__save-button');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close-button');

const popups = document.querySelectorAll('.popup');

const selectors = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__field-error-message'
}

//Функция открытия любого из трёх popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", onEscapeKey);
}

//Функция закрытия любого из трёх popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", onEscapeKey);
}

//Закрытие осуществляется по кнопке 'крестик'
function closeButtonClick (evt) {
  closePopup(evt.target.closest(".popup"));
}

//Закрытие popup кликом вне его границ
popups.forEach((popup) => {
  popup.addEventListener('click', closeButtonClick);
})

const popupContainers =  document.querySelectorAll('.popup__container');

//Ловим клик на popup__container и отменяем его закрытие
popupContainers.forEach((popupContainer) => {
  popupContainer.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
})

const popupImg = document.querySelector('.popup__img');

//Аналогично с popup__img
popupImg.addEventListener('click', (evt) => {
  evt.stopPropagation();
});

//Закрытие popup кнопкой Escape
function onEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

//и вещаем функцию на каждую кнопку
popupCloseButton.forEach((button) => {
  button.addEventListener("click", closeButtonClick);
})

//Открываем popup добавления места по клику на кнопку
profileAddButton.addEventListener('click', () => {openPopup(popupAddPlace)});

const profileTitleField = document.querySelector('.popup__field_submit_title');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitleField = document.querySelector('.popup__field_submit_subtitle');
const profileSubtitle = document.querySelector('.profile__subtitle');

//создаем функцию редактирования профиля - получаем значения из элементов в поля popup
function editButtonClick() {
  profileTitleField.value = profileTitle.textContent;
  profileSubtitleField.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
}

//создаем функцию сохранения отредактированного профиля
function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleField.value;
  profileSubtitle.textContent = profileSubtitleField.value;
  
  closePopup(popupEditProfile);
}

const elementTitlePopup = document.querySelector('.popup__field_submit_name');
const elementUrlPopup = document.querySelector('.popup__field_submit_link');

//функция сохранения новых элементов - названия картинки и ссылки на неё
function saveElement(evt) {
  evt.preventDefault();
  const elementTitle = elementTitlePopup.value;
  const elementUrl = elementUrlPopup.value;
  elementsContainer.prepend(createCard(elementUrl, elementTitle));

  elementUrlPopup.value = '';
  elementTitlePopup.value = '';
  
  popupAddPlace.querySelector('.popup__save-button').classList.add('popup__save-button_disabled');
  popupAddPlace.querySelector('.popup__save-button').setAttribute('disabled', true);

  closePopup(popupAddPlace);
}

const elementsContainer = document.querySelector('.elements');

function createCard(link, title) {
  return (new Card(link, title, '#elements-add')).doCard();
}

//добавление существующих картинок из массива initialCards
for (let i = 0; i < initialCards.length; i += 1) {
  elementsContainer.append(createCard(initialCards[i].link, initialCards[i].name));
}

const newImage = document.querySelector('.popup__image');
const newTitle = document.querySelector('.popup__text');

//функция добавления картинок и названий в popup просмотра картинок
function handleImageClick(evt) {
  const image = evt.target.getAttribute('src');
  const title = evt.target.getAttribute('alt');
  newImage.setAttribute('src', image);
  newImage.setAttribute('alt', title);
  newTitle.textContent = title;

  openPopup(popupImageView);
}

profileEditButton.addEventListener('click', editButtonClick);
popupEditProfile.addEventListener('submit', saveProfile);
popupAddPlace.addEventListener('submit', saveElement);

const formValidator = new FormValidator(selectors);
formValidator.enableValidation();

export { handleImageClick };