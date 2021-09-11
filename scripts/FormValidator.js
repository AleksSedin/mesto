export class FormValidator {
    constructor(selectors, formElement) {
      this._selectors = selectors;
      this._formElement = formElement;
    }

      //Проверяем валидность полей ввода и показываем ошибку если она есть
    _isFieldValid(inputElement){
        if (inputElement.validity.valid) {
          this._hideInputError(inputElement);
        } else {
          this._showInputError(inputElement, inputElement.validationMessage);
        }
    };
        
    //Функция отлавливания ошибки ввода
    _showInputError(inputElement, errorMessage){
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    };
        
    //Функция закрытия сообщения об ошибке
    _hideInputError(inputElement){
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = '';
    };
        
    //Функция проверки правильного заполнения полей
    _hasInvalidInput(inputList) {
        return inputList.some(input => !input.validity.valid);
    };
       
    //Состояние кнопки. Неактивна - если поля незаполнены или заполнены неверно, иначе активна
    _toggleButtonState(inputList) {
        const buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._selectors.inactiveButtonClass);
          buttonElement.setAttribute('disabled', true);
        } else {
          buttonElement.classList.remove(this._selectors.inactiveButtonClass);
          buttonElement.removeAttribute('disabled');
        }
    };
      
    //Вешаем листнеры на правильность заполнения полей
    _setEventListeners(){
          const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
          inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._isFieldValid(inputElement);
              this._toggleButtonState(inputList);
             });
          });
    };
      
    //Функция валидации
    enableValidation() {
        this._setEventListeners();
    };

    //Функция сброса ошибок и значений полей ввода
    resetValidation() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
      this._toggleButtonState(inputList);

      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      
      if (this._formElement.name === 'popup-card') {
        this._formElement.reset();
      }
    }
}