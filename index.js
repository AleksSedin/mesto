const popupEditProfile = document.querySelector('#popupEditProfile');
const popupAddPlace = document.querySelector('#popupAddPlace');
const popupImageView = document.querySelector('#popupImageView');

const popupSaveElement = document.querySelector('.popup__save-button');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close-button');

const popups = document.querySelectorAll('.popup');

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

const initialCards = [
  {
    name: 'Северное Сияние',
    link: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bm9yd2F5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Солнечное затмение',
    link: 'https://images.unsplash.com/photo-1554791756-02aebb441d00?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHN1biUyMGVjbGlwc2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Цунами',
    link: 'https://images.unsplash.com/photo-1600637297283-619282401318?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHRzdW5hbWl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Торнадо',
    link: 'https://images.unsplash.com/photo-1612200167265-a68d1519332f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dG9ybmFkb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Дождь',
    link: 'https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Ночь',
    link: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmlnaHR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
]; 

const cardAdd = document.getElementById('elements-add');
const elementsContainer = document.querySelector('.elements');

//функция добавления элементов - картинок и названий
function createCard(source, title) {
  const cardElement = cardAdd.content.firstElementChild.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.setAttribute('src', source);
  cardElementImage.setAttribute('alt', title);
  
  const cardElementTitle = cardElement.querySelector('.element__text');
  cardElementTitle.textContent = title;

  const removeButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like');

  cardElementImage.addEventListener('click', handleImageClick);
  removeButton.addEventListener('click', handleRemoveCard);
  likeButton.addEventListener('click', handleCardLike);

  return cardElement;
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

//функция удаления элемента - картинки
function handleRemoveCard(evt) {
  evt.target.closest('.element').remove();
}

//функция лайка элемента - картинки
function handleCardLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

profileEditButton.addEventListener('click', editButtonClick);
popupEditProfile.addEventListener('submit', saveProfile);
popupAddPlace.addEventListener('submit', saveElement);