//Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  console.log(`Status of user` + user);
  if (user) {
    //get the data only if the user is logged in.
    //pull out the docs from the snapshot
    db.collection("guides")
      .get()
      .then(({ docs }) => {
        setGuides(docs);
      });
  } else {
    //In case the user does not exists, auth does not exist then no call
    setGuides([]);
  }
});

const registerForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
let registerModal;
let loginModal;
let logout;
setReferences();
bindEvents();
/**
 * Code to register the user *
 *  */

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
  console.log(user);
  //Clear the form
  registerForm.reset();
  //Close the Modal
  M.Modal.getInstance(registerModal).close();
}

/**
 * Code to log the user in
 *
 */
async function loginUser(e) {
  e.preventDefault();
  //Tap credentials
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  //Reach out to firebase
  const credentials = await auth.signInWithEmailAndPassword(email, password);
  console.log(credentials);
  //Reset the login form
  loginForm.reset();
  //Close the modal
  M.Modal.getInstance(loginModal).close();
}

/**
 * Code to log the user out
 */
async function logoutUser(e) {
  e.preventDefault();
  //log me out
  const result = await auth.signOut();
  console.log(`You are now logged out ${result}`);
}
//Bind the events
function bindEvents() {
  registerForm.addEventListener("submit", registerUser);
  loginForm.addEventListener("submit", loginUser);
  logout.addEventListener("click", logoutUser);
}
//Set the references
function setReferences() {
  registerModal = document.querySelector("#modal-signup");
  loginModal = document.querySelector("#modal-login");
  logout = document.querySelector("#logout");
}
