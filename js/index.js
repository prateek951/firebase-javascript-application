document.addEventListener("DOMContentLoaded", init);
//set the references
let guides;
// Links that are shown only to authenticated users
let loggedInLinks;
//links that are shown only to unauthenticated users
let loggedOutLinks;
let accountDetails;
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
  loggedInLinks = document.querySelectorAll(".logged-in");
  loggedOutLinks = document.querySelectorAll(".logged-out");
  accountDetails = document.querySelector(".account-details");
}

function setUserInterface(user) {
  if (user) {
    //account details
    let html = `
      <h4>Logged in as ${user.email}</h4>
    `;
    accountDetails.innerHTML = html;
    loggedInLinks.forEach(link => (link.style.display = "block"));
    loggedOutLinks.forEach(link => (link.style.display = "none"));
  } else {
    //hide account details
    accountDetails.innerHTML = "";
    loggedInLinks.forEach(link => (link.style.display = "none"));
    loggedOutLinks.forEach(link => (link.style.display = "block"));
  }
}

//Any binding of events will go here
function bindEvents() {
}
