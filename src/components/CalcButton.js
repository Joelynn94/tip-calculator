import { getTipPercentage } from "../app";

export class CalcButton extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create button
    const btn = document.createElement("button");
    btn.setAttribute("class", "btn");

    // Get textContent
    btn.textContent = this.textContent;

    // Take attribute content and put it inside the button
    let buttonValue = this.getAttribute("data-value");
    btn.value = buttonValue;

    // style button
    const style = document.createElement("style");
    style.textContent = `
      .btn { padding: 10px; cursor: pointer; }
    `;

    this.addEventListener("click", () => {
      getTipPercentage(this, "button");
    });

    shadow.appendChild(style);
    shadow.appendChild(btn);
  }
}

// Define the new element
customElements.define("calc-button", CalcButton);
