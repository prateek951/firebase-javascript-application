const registerForm = document.querySelector("#signup-form");
let registerModal;
setReferences();
bindEvents();

async function registerUser(e) {
  e.preventDefault();
  // console.log("submit event");
  // Tap the credentials
  const email = registerForm["signup-email"].value;
  const password = registerForm["signup-password"].value;
  // console.log(email, password);
  //register the user
  const credentials = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  // Get the user from the received credentials
  const { user } = credentials;
  //Clear the form
  registerForm.reset();
  //Close the Modal
   M.Modal.getInstance(registerModal).close();
}

function bindEvents() {
  registerForm.addEventListener("submit", registerUser);
}

function setReferences() {
  registerModal = document.querySelector("#modal-signup");
}
