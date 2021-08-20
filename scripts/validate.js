//Проверяем валидность полей ввода и показываем ошибку если она есть
function isFieldValid(formElement, inputElement, selectors){
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, selectors);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  }
};
  
//Функция отлавливания ошибки ввода
function showInputError(formElement, inputElement, errorMessage, selectors){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};
  
//Функция закрытия сообщения об ошибке
function hideInputError(formElement, inputElement, selectors ){
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};
  
//Функция проверки правильного заполнения полей
function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid)
};
  
//Состояние кнопки. Неаактивна - если поля незаполнены или заполнены неверно, иначе активна
function toggleButtonState(inputList, buttonElement, buttonInactiveClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(buttonInactiveClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(buttonInactiveClass);
    buttonElement.removeAttribute('disabled');
  }
};

//Вешаем листнеры на правильность заполнения полей
function setEventListeners(formElement, selectors){
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isFieldValid(formElement, inputElement, selectors);
        toggleButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
       });
    });
  };

//Функция валидации
function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElem) => {
    setEventListeners(formElem, selectors);
  });
};
  
//Вызов функции валидации с параметрами
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__field-error-message'
  }
);