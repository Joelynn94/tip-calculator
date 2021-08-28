import { getBillAmount } from "../app";
import dollarIcon from "../../public/images/icon-dollar.svg";
import personIcon from "../../public/images/icon-person.svg";

const template = document.createElement("template");

const styles = /*css*/ `
  .jl_form-field {
    display: block;
    position: relative;
  }

  .jl-input__input {
    box-sizing: border-box;
    display: block;
    position: relative;
    text-align: right;
    padding: 1rem;
    width: 100%;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
    border: 2px solid transparent;
    color: var(--dark-cyan);
    background-color: var(--lightgrey-cyan-alt);
    border-radius: 0.25rem;
    caret-color: var(--dark-cyan);
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .jl-input__input::placeholder {
    color: var(--dark-cyan);
    opacity: .35
  }
  
  .jl-input__input::-ms-input-placeholder {
    color: var(--dark-cyan);
    opacity: .35
  }

  .jl-input__input:focus {
    outline: none;
    border : 2px solid var(--primary-color)
  }
  .jl-input__input:focus-within {
    outline: none;
    border : 2px solid var(--primary-color)
  }

  .jl-input__icon {
    position: absolute;
    left: 1.5rem;
    bottom: 19%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .error {
    position: absolute;
    top: -35px;
    right: 0;
    color: red;
    display: block;
    font-size: 16px;
  }

  .invalid-field {
    border: 2px solid var(--error)
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
    <input class="jl-input__input" />
    <img src="" alt="" class="jl-input__icon hidden" />
    <small class="error hidden"></small>
  </div>`;

export class AmountInput extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    // select elements from the template
    this.$input = shadow.querySelector(".jl-input__input");
    this.$icon = shadow.querySelector(".jl-input__icon");
    this.$error = shadow.querySelector(".error");
  }

  // set attributes to track on the the custom element
  static get observedAttributes() {
    return [
      "value",
      "type",
      "icon",
      "aria-label",
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

  get name() {
    return this.getAttribute("name");
  }

  // get value attribute
  get value() {
    return this.getAttribute("value");
  }

  get min() {
    return this.getAttribute("min");
  }

  set name(newValue) {
    this.setAttribute("name", newValue);
  }

  // set the new value on the value attribute
  set value(newValue) {
    this.setAttribute("value", Number(newValue).toFixed(2));
  }

  set min(newValue) {
    this.setAttribute("min", newValue);
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
          if (event.target.value !== "") {
            this.invalid = false;
            this.value = Number(event.target.value).toFixed(2);
            this.$input.value = this.value;
          }
        }
      });

      this.$input.addEventListener("input", (event) => {
        if (event.target.value !== "") {
          this.value = Number(event.target.value).toFixed(2);
          getBillAmount(this, "input");
        }
      });
    }
  }

  _handleIcon(icon) {
    if (icon !== null) {
      this.$icon.classList.remove("hidden");
      if (icon === "dollar") {
        this.$icon.src = dollarIcon;
      } else {
        this.$icon.src = personIcon;
      }
    } else {
      this.$icon.classList("hidden");
    }
  }

  // check if the input has a valid value
  _handleInvalidState(value) {
    if (value !== null || value !== "" || this.hasAttribute("invalid")) {
      this.$error.classList.remove("hidden");
      this.$input.classList.add("invalid-field");
    } else {
      this.$error.classList.add("hidden");
      this.$input.classList.remove("invalid-field");
    }
  }

  // callback to fire when an attribute changes
  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "type":
        this.$input.type = newValue;
        break;
      case "placeholder":
        this.$input.placeholder = newValue;
        break;
      case "aria-label":
        this.$input.ariaLabel = newValue;
        break;
      case "icon":
        this._handleIcon(newValue);
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
}

// Define the new element
window.customElements.define("amount-input", AmountInput);
