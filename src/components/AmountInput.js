import { getBillAmount } from "../app";

const template = document.createElement("template");

const styles = /*css*/ `
  .jl_form-field {
    width: 100%
  }

  .error {
    color: red;
    display: block;
  }

  .hidden {
    display: none;
  }
`;

template.innerHTML = `
<style>
  ${styles}
</style>
<div class="jl_form-field">
  <label class="jl-input__label"></label>
  <input class="jl-input__input" type="text" />
  <span class="error hidden">This field is required!</span>
</div>`;

export class AmountInput extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    // select elements from the template
    this.$label = shadow.querySelector(".jl-input__label");
    this.$input = shadow.querySelector(".jl-input__input");
    this.$error = shadow.querySelector(".error");
  }

  // set attributes to track on the the custom element
  static get observedAttributes() {
    return [
      "value",
      "label",
      "type",
      "placeholder",
      "error-message",
      "invalid",
    ];
  }

  // check for invalid attribute
  get invalid() {
    return this.hasAttribute("invalid");
  }

  // set invalid attribute
  set invalid(value) {
    if (!!value) {
      this.setAttribute("invalid", "");
    } else {
      this.removeAttribute("invalid");
    }
  }

  // get value attribute
  get value() {
    return this.getAttribute("value");
  }

  // set the new value on the value attribute
  set value(newValue) {
    this.setAttribute("value", Number(newValue).toFixed(2));
  }

  // runs each time the element is added to the DOM
  connectedCallback() {
    // check if the input is on the DOM
    if (this.$input.isConnected) {
      this.$input.addEventListener("blur", (event) => {
        // check the input value and if it has the required attribute
        if (!event.target.value && this.hasAttribute("required")) {
          this.invalid = true;
          this.$error.textContent = "This field is required.";
        } else {
          this.invalid = false;
          this.value = Number(event.target.value).toFixed(2);
          this.$input.value = this.value;
        }
      });

      this.$input.addEventListener("input", (event) => {
        this.value = Number(event.target.value).toFixed(2);
        getBillAmount(this, "input");
      });
    }
  }

  // callback to fire when an attribute changes
  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "label":
        this.$label.textContent = `${newValue}:`;
        break;
      case "type":
        this.$input.type = newValue;
        break;
      case "error-message":
        this.$error.textContent = newValue;
        break;
      case "invalid":
        this._handleInvalidState(newValue);
        break;
      default:
        break;
    }
  }

  // check if the input has a valid value
  _handleInvalidState(value) {
    if (value !== null || value !== "") {
      this.$error.classList.remove("hidden");
      this.$input.classList.add("invalid-field");
    } else {
      this.$error.classList.add("hidden");
      this.$input.classList.remove("invalid-field");
    }
  }
}

// Define the new element
customElements.define("amount-input", AmountInput);
