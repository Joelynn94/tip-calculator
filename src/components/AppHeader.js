const template = document.createElement("template");

const styles = /*css*/ `
  .heading {
    font-size: 60px;
    color: var(--dark-cyan)
  }
  .heading__break {
    display: block;
  }
`;

template.innerHTML = `
  <style>
    ${styles}
  </style>
  <header>
    <h1 class="heading">SPLI<span class="heading__break">TTER</span></h1>
  </header>
`;
export class AppHeader extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// Define the new element
customElements.define("app-header", AppHeader);
