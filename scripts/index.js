const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const saveButton = document.querySelector('.popup__container');

const field1 = document.querySelector('.popup__field_title');
const profileTitle = document.querySelector('.profile__title');
const field2 = document.querySelector('.popup__field_subtitle');
const profileSubtitle = document.querySelector('.profile__subtitle');

function showpopup() {
  popup.classList.toggle('popup_opened');
  
  field1.value = profileTitle.textContent;
  field2.value = profileSubtitle.textContent;
}

function hidepopup() {
  popup.classList.toggle('popup_opened');
}

function savepopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = field1.value;
  profileSubtitle.textContent = field2.value;
  
  hidepopup();
}

popupOpenButton.addEventListener('click', showpopup);
popupCloseButton.addEventListener('click', hidepopup);
saveButton.addEventListener('submit', savepopup);