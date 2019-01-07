const registerForm = document.querySelector("#signup-form");
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
  console.log(credentials);
};

function bindEvents() {
  registerForm.addEventListener("submit", registerUser);
}
