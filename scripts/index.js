const popupEditProfile = document.getElementById('popupEditProfile');
const popupAddPlace = document.getElementById('popupAddPlace');
const popupImageView = document.getElementById('popupImageView');

const popupSaveElement = document.querySelector('.popup__save-button');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close-button');

//Функция открытия любого из трёх popup
function openpopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия любого из трёх popup
function closepopup(popup) {
  popup.classList.remove('popup_opened');
}

//Закрытие осуществляется по кнопке 'крестик'
function CloseButtonClick (evt) {
  closepopup(evt.target.closest(".popup"));
}

//и вещаем функцию на каждую кнопку
popupCloseButton.forEach((button) => {
  button.addEventListener("click", CloseButtonClick);
})

//Открываем popup добавления места по клику на кнопку
profileAddButton.addEventListener('click', () => {openpopup(popupAddPlace)});

const saveButton = document.querySelector('.popup__container');

const field1 = document.querySelector('.popup__field_submit_title');
const profileTitle = document.querySelector('.profile__title');
const field2 = document.querySelector('.popup__field_submit_subtitle');
const profileSubtitle = document.querySelector('.profile__subtitle');

//создаем функцию редактирования профиля - получаем значения из элементов в поля popup
function EditButtonClick() {
  field1.value = profileTitle.textContent;
  field2.value = profileSubtitle.textContent;
  openpopup(popupEditProfile);
}

//создаем функцию сохранения отредактированного профиля
function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = field1.value;
  profileSubtitle.textContent = field2.value;
  
  closepopup(popupEditProfile);
}

const ElementTitlePopup = document.querySelector('.popup__field_submit_name');
const ElementUrlPopup = document.querySelector('.popup__field_submit_link');

//функция сохранения новых элементов - названия картинки и ссылки на неё
function SaveElement(evt) {
  evt.preventDefault();
  const ElementTitle = ElementTitlePopup.value;
  const ElementUrl = ElementUrlPopup.value;
  ElementsContainer.prepend(AddElement(ElementUrl, ElementTitle));

  ElementUrlPopup.value = '';
  ElementTitlePopup.value = '';

  closepopup(popupAddPlace);
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

const ElementAdd = document.getElementById('elements-add');
const ElementsContainer = document.querySelector('.elements');

//функция добавления элементов - картинок и названий
function AddElement(source, title) {
  const CardElement = ElementAdd.content.firstElementChild.cloneNode(true);
  const CardElementImage = CardElement.querySelector('.element__image');

  CardElementImage.setAttribute('src', source);
  CardElementImage.setAttribute('alt', title);
  
  const CardElementTitle = CardElement.querySelector('.element__text');
  CardElementTitle.textContent = title;

  const RemoveButton = CardElement.querySelector('.element__delete-button');
  const LikeButton = CardElement.querySelector('.element__like');

  CardElementImage.addEventListener('click', ImageClick);
  RemoveButton.addEventListener('click', RemoveElement);
  LikeButton.addEventListener('click', SetLike);

  return CardElement;
}

//добавление существующих картинок из массива initialCards
for (let i = 0; i < initialCards.length; i += 1) {
  ElementsContainer.append(AddElement(initialCards[i].link, initialCards[i].name));
}

//открытие popup просмотра картинок
const ImageView = document.querySelector('.element__image');
ImageView.addEventListener('click', () => {openpopup(popupImageView)});

const newImage = document.querySelector('.popup__image');
const newTitle = document.querySelector('.popup__text');

//функция добавления картинок и названий в popup просмотра картинок
function ImageClick(evt) {
  const Image = evt.target.getAttribute('src');
  const Title = evt.target.getAttribute('alt');
  newImage.setAttribute('src', Image);
  newImage.setAttribute('alt', Title);
  newTitle.textContent = Title;

  openpopup(popupImageView);
}

const ElementsImage = document.querySelectorAll('.element__image')

//добавляем листнер на каждую картинку
ElementsImage.forEach((ElementsImage) => {
  ElementsImage.addEventListener("click", ImageClick);
})

const RemoveButtons = document.querySelectorAll('.element__delete-button');

//функция удаления элемента - картинки
function RemoveElement(evt) {
  evt.target.closest('.element').remove();
}

//добавляем листнер на каждую картинку для удаления
RemoveButtons.forEach((RemoveButtons) => {
  RemoveButtons.addEventListener("click", RemoveElement);
})

const LikeButtons = document.querySelectorAll('.element__like');

//функция лайка элемента - картинки
function SetLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

//добавляем листнер на каждую картинку для лайка
LikeButtons.forEach((LikeButtons) => {
  LikeButtons.addEventListener("click", SetLike);
})

profileEditButton.addEventListener('click', EditButtonClick);
saveButton.addEventListener('submit', saveProfile);
popupAddPlace.addEventListener('submit', SaveElement);