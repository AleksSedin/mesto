import { handleImageClick } from "./index.js";

export class Card {
    constructor (link, title, templateSelector) {
        this.title = title;
        this.link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const elementTemplate = document.querySelector(this._templateSelector);
        const cardElement = elementTemplate.content.firstElementChild.cloneNode(true);
        
        return cardElement;
    }

    _handleRemoveCard(evt) {
        evt.target.closest('.element').remove();
      }

    _handleCardLike(evt) {
        evt.target.classList.toggle('element__like_active');
      }

    _setEventListners() {
        this.element.querySelector('.element__delete-button').addEventListener('click', this._handleRemoveCard);
        this.element.querySelector('.element__like').addEventListener('click', this._handleCardLike);
        this.element.querySelector('.element__image').addEventListener('click', handleImageClick);
    }

    doCard() {
        this.element = this._getTemplate();
        
        const cardElementImage = this.element.querySelector('.element__image');
        const cardElementTitle = this.element.querySelector('.element__text');
        cardElementImage.setAttribute('src', this.link);
        cardElementImage.setAttribute('alt', this.title);
        cardElementTitle.textContent = this.title;

        this._setEventListners();

        return this.element;
    }
    
}