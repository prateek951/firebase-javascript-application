const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get the user and assign the custom claim (admin)

  //check if request is made by an admin
  if (context.auth.token.admin !== true) {
    return  {
      error : 'Only admins can add other admins'
    }
  }
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth.setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `Success ! ${data.email} has been made an admin`
      };
    })
    .catch(err => {
      return err;
    });
});
