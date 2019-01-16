document.addEventListener("DOMContentLoaded", init);
//set the references
let guides;
setRefs();

const setGuides = docs => {
  let output = "";
  if (docs && docs.length) {
    docs.forEach(doc => {
      // console.log(doc.data());
      const { title, content } = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4">${title}</div>
        <div class="collapsible-body white">
        <span>${content}</span>
      </div>
      </li>
    `;
      output += li;
    });
  } else {
    output += `<h5 class="center-align">Login to view guides</h5>`;
  }
  guides.innerHTML = output;
};

//init configuration
function init() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
}
//any setting of references will go here 
function setRefs() {
  guides = document.querySelector(".guides");
}

//Any binding of events will go here
function bindEvents() {}
