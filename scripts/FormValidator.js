export class FormValidator {
    constructor(selectors) {
        this.selectors = selectors;
    }

      //Проверяем валидность полей ввода и показываем ошибку если она есть
    _isFieldValid(formElement, inputElement){
        if (inputElement.validity.valid) {
          this._hideInputError(formElement, inputElement);
        } else {
          this._showInputError(formElement, inputElement, inputElement.validationMessage);
        }
    };
        
    //Функция отлавливания ошибки ввода
    _showInputError(formElement, inputElement, errorMessage){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.selectors.errorClass);
    };
        
    //Функция закрытия сообщения об ошибке
    _hideInputError(formElement, inputElement, selectors ){
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.selectors.inputErrorClass);
        errorElement.classList.remove(this.selectors.errorClass);
        errorElement.textContent = '';
    };
        
    //Функция проверки правильного заполнения полей
    _hasInvalidInput(inputList) {
        return inputList.some(input => !input.validity.valid)
    };
       
    //Состояние кнопки. Неактивна - если поля незаполнены или заполнены неверно, иначе активна
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this.selectors.inactiveButtonClass);
          buttonElement.setAttribute('disabled', true);
        } else {
          buttonElement.classList.remove(this.selectors.inactiveButtonClass);
          buttonElement.removeAttribute('disabled');
        }
    };
      
    //Вешаем листнеры на правильность заполнения полей
    _setEventListeners(formElement){
          const inputList = Array.from(formElement.querySelectorAll(this.selectors.inputSelector));
          const buttonElement = formElement.querySelector(this.selectors.submitButtonSelector);
          inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
              this._isFieldValid(formElement, inputElement);
              this._toggleButtonState(inputList, buttonElement);
             });
          });
    };
      
    //Функция валидации
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.selectors.formSelector));
        formList.forEach((formElem) => {
            this._setEventListeners(formElem);
        });
    };
}