//Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  console.log(`Status of user` + user);
  if (user) {
    // setup the user interface for the navbar show only the logged in links
    setUserInterface(user);
    //get the data only if the user is logged in.
    //pull out the docs from the snapshot
    db.collection("guides").onSnapshot(
      ({ docs }) => {
        setGuides(docs);
      },
      ex => console.log(ex.message)
    );
  } else {
    //setup the user interface for the navbar show only the logged out links
    setUserInterface(null);
    //In case the user does not exists, auth does not exist then no call
    setGuides([]);
  }
});

/** form references */
const registerForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const createForm = document.querySelector("#create-form");
/**
 * modal references
 * */
let registerModal;
let accountModal;
let loginModal;
let guideModal;
let logout;
setReferences();
bindEvents();
/**
 * Code to register the user *
 *  */

async function registerUser(e) {
  e.preventDefault();
  try {
    // console.log("submit event");
    // Tap the credentials (authentication credentials goes to firestore)
    const email = registerForm["signup-email"].value;
    const password = registerForm["signup-password"].value;
    // (extra information will go with the document linked to this uid in the users collection)
    //Keep these below fields in separate doc that is linked with the uid to get those extra information
    const description = registerForm["signup-des"].value;
    const firstname = registerForm["signup-fname"].value;
    const lastname = registerForm["signup-lname"].value;
    const address = registerForm["signup-address"].value;
    const mobno = registerForm["signup-mobile"].value;
    const pincode = registerForm["signup-pincode"].value;
    const city = registerForm["signup-city"].value;
    const state = registerForm["signup-state"].value;
    const country = registerForm["signup-country"].value;

    // console.log(email, password);
    //register the user
    const credentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    // Get the user from the received credentials
    const { user } = credentials;
    console.log(user);
    //Reach out to firestore collection and add extra information
    // about the user inside that.
    //connect extra information to the record in guids collection
    await db
      .collection("users")
      .doc(user.uid)
      .set({
        des: description,
        fname: firstname,
        lname: lastname,
        address: address,
        mobno: mobno,
        pincode: pincode,
        city : city,
        state : state,
        country : country
      });
    //Clear the form
    registerForm.reset();
    //Close the Modal
    M.Modal.getInstance(registerModal).close();
  } catch (ex) {
    console.log("an error occurred", ex);
  }
}

/**
 * Code to log the user in
 *
 */
async function loginUser(e) {
  e.preventDefault();
  try {
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
  } catch (ex) {
    console.log(ex);
  }
}

/**
 * Code to log the user out
 */
async function logoutUser(e) {
  e.preventDefault();
  try {
    //log me out
    const result = await auth.signOut();
    console.log(`You are now logged out ${result}`);
  } catch (ex) {
    console.log("an error occurred", ex);
  }
}
/**
 * Code to create a new guide
 */
async function makeGuide(e) {
  e.preventDefault();
  try {
    //get the form data and make a guide then the call to firestore
    const result = await db.collection("guides").add({
      title: createForm["title"].value,
      content: createForm["content"].value
    });
    console.log(result);
    //Reset the form and clear the modal
    createForm.reset();
    //Close the modal
    M.Modal.getInstance(guideModal).close();
  } catch (ex) {
    console.log(`an error occurred` + ex.message);
  }
}
//Bind the events
function bindEvents() {
  registerForm.addEventListener("submit", registerUser);
  loginForm.addEventListener("submit", loginUser);
  logout.addEventListener("click", logoutUser);
  createForm.addEventListener("submit", makeGuide);
}
//Set the references
function setReferences() {
  registerModal = document.querySelector("#modal-signup");
  loginModal = document.querySelector("#modal-login");
  guideModal = document.querySelector("#modal-create");
  logout = document.querySelector("#logout");
}
