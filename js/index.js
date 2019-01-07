document.addEventListener("DOMContentLoaded", init);

//init configuration
function init() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
}

//Any binding of events will go here 
function bindEvents() {}
