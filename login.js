// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh0YDE8uMfIbUSi2qK6gkdBrvqMq3iO7M",
  authDomain: "form-authentication-f0a32.firebaseapp.com",
  databaseURL: "https://form-authentication-f0a32-default-rtdb.firebaseio.com",
  projectId: "form-authentication-f0a32",
  storageBucket: "form-authentication-f0a32.appspot.com",
  messagingSenderId: "631471451920",
  appId: "1:631471451920:web:f1993d6bc9d58a28243f95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// document.getElementById("submit").addEventListener("click", (e) => {
//   e.submit();
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("password").value;
//   var username = document.getElementById("username").value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       set(ref(database, "users/" + user.uid), {
//         username: username,
//         email: email,
//         password: password,
//       });
//       alert(username + "user created");
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       alert(errorMessage);
//       // ..
//     });
// });

login.addEventListener('click',(e)=>{
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    const dt = new Date();
    update(ref(database, "users/" + user.uid), {
      last_login: dt,
      // ...
    });

    alert("User Loged in").catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
  });
});

// //Global variables
// const form = document.getElementById("form");
// const email = document.getElementById("email");
// const password = document.getElementById("password");

// form.addEventListener("submit", (e) => {
//      e.preventDefault();
//     checkInput();

// //   if (isFormValid() == true) {
// //     form.submit();
// //   } else {
// //     e.preventDefault();
// //   }
// });

// // function isFormValid() {
// //   const inputContainers = form.querySelectorAll(".form-control");
// //   let result = true;
// //   inputContainers.forEach((container) => {
// //     if (container.classList.contains("error")) {
// //       result = false;
// //     }
// //   });

// //   return result;
// // }

// //Function to check input
// function checkInput() {
//   const emailValue = email.value.trim();
//   const passwordValue = password.value.trim();

//   //validate Email
//   if (emailValue === "") {
//     setErrorFor(email, "Email cannot be blank");
//   } else if (!isEmail(emailValue)) {
//     setErrorFor(email, "Invalid Email");
//   } else {
//     setSuccessFor(email);
//   }

//   //Validate Password
//   if (passwordValue === "") {
//     setErrorFor(password, "Password cannot be blank");
//   } else if (passwordValue.length < 8 || passwordValue.length > 12) {
//     setErrorFor(password, "must be between 8 and 12 characters");
//   } else {
//     setSuccessFor(password);
//   }

// }

// function setErrorFor(input, message) {
//   const formControl = input.parentElement;
//   const small = formControl.querySelector("small");

//   small.innerText = message;

//   //Display the error class
//   formControl.className = "form-control error";
// }

// function setSuccessFor(input) {
//   const formControl = input.parentElement;
//   formControl.className = "form-control success";
// }

// function isEmail(email) {
//   return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     email
//   );
// }
