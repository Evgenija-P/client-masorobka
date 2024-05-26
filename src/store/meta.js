import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Meta {
  _orderFormFieldValues = {
    customer_name: "",
    phone_number: "",
    delivery_address: "",
  };

  _popupNestingLevel = 0;

  _isOrderPopupShown = false;
  _isCartPopupShown = false;
  _isCompleteOrderPopupShown = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "meta",
      properties: [
        "_orderFormFieldValues",
        "_isOrderPopupShown",
        "_isCartPopupShown",
      ],
      storage: window.localStorage,
    });
  }

  setOrderFormField(name, value) {
    this._orderFormFieldValues[name] = value;
  }

  resetFormFieldValues() {
    this._orderFormFieldValues = {
      customer_name: "",
      phone_number: "",
      delivery_address: "",
    };
  }

  get popupNestingLevel() {
    return this._popupNestingLevel;
  }

  incrementPopupNestingLevel() {
    this._popupNestingLevel = this._popupNestingLevel + 1;
  }

  decrementPopupNestingLevel() {
    this._popupNestingLevel = this._popupNestingLevel - 1;
  }

  toggleOrderPopup() {
    this._isOrderPopupShown = !this._isOrderPopupShown;
  }

  toggleCartPopup() {
    this._isCartPopupShown = !this._isCartPopupShown;
  }

  toggleCompleteOrderPopup() {
    this._isCompleteOrderPopupShown = !this._isCompleteOrderPopupShown;
  }

  get orderFormFieldValues() {
    return toJS(this._orderFormFieldValues);
  }

  set orderFormFieldValues(updatedFormValues) {
    this._orderFormFieldValues = updatedFormValues;
  }
}

export default new Meta();
