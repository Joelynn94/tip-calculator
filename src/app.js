import Header from "./components/Header";

const App = () => {
  const template = document.createElement("template");
  template.innerHTML = `
    <div class="container">
      ${Header()}
    </div>
  `;
  // Return a new node from template
  return template.content.cloneNode(true);
};

const initApp = () => {
  document.querySelector("#app").appendChild(App());
};

// Load app
initApp();
