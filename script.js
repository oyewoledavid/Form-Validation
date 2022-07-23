// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref, update
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

document.getElementById("submit").addEventListener("click", (e) => {
  
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email
      });
      alert(username + "user created");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
      // ..
    });
});

//SIGN IN


//Global variables
const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const dateOfBirth = document.getElementById("dob");
const email = document.getElementById("email");
const userName = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//Add event listener

form.addEventListener("submit", (e) => {
  checkInput();

  if (isFormValid() == true) {
    form.submit();
  } else {
    e.preventDefault();
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll(".form-control");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });

  return result;
}

//Function to check input
function checkInput() {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const dateOfBirthValue = dateOfBirth.value.trim();
  const emailValue = email.value.trim();
  const userNameValue = userName.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  let firstnameregex = /^[a-zA-Z\s]+$/;
  let lastnameregex = /^[a-zA-Z\s]+$/;
  //Validate First Name
  if (firstNameValue === "") {
    setErrorFor(firstName, "First name cannot be blank");
  } else if (!firstnameregex.test(firstNameValue)) {
    setErrorFor(firstName, "Invalid First Name");
  } else {
    setSuccessFor(firstName);
  }
  //Validate Last Name
  if (lastNameValue === "") {
    setErrorFor(lastName, "First name cannot be blank");
  } else if (!lastnameregex.test(lastNameValue)) {
    setErrorFor(lastName, "Invalid Last Name");
  } else {
    setSuccessFor(lastName);
  }

  //validate date of birth here
  validDob(dateOfBirthValue);
  //validate Email
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Invalid Email");
  } else {
    setSuccessFor(email);
  }
  //Validate Username
  if (userNameValue === "") {
    setErrorFor(userName, "Username cannot be blank");
  } else if (!validateUserName(userNameValue)) {
    setErrorFor(userName, "only letters,numbers and underscore allowed");
  } else if (userNameValue.length < 6 || userNameValue.length > 15) {
    setErrorFor(userName, "must be between 6 and 15 characters");
  } else {
    setSuccessFor(userName);
  }
  //Validate Password
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else if (passwordValue.length < 8 || passwordValue.length > 12) {
    setErrorFor(password, "must be between 8 and 12 characters");
  } else {
    setSuccessFor(password);
  }

  if (confirmPasswordValue === "") {
    setErrorFor(confirmPassword, "Password cannot be empty");
  } else if (confirmPasswordValue != passwordValue) {
    setErrorFor(confirmPassword, "Password does not match");
  } else {
    setSuccessFor(confirmPassword);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  //Display the error class
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
//EMAIL VALIDATOR
function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
//USERNAME VALIDATOR
function validateUserName(userName) {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(userName);
}
//DATE OF BIRTH VALIDATOR
function validDob() {
  const dateOfBirthValue = dateOfBirth.value.trim();
  const dobregex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  const regexTest = dobregex.test(dateOfBirthValue);
  const userBirthDate = new Date(
    dateOfBirthValue.replace(dobregex, "$3-$2-$1")
  );
  const todayYear = new Date().getFullYear();
  const cutOff18 = new Date();
  cutOff18.setFullYear(todayYear - 18);

  if (dateOfBirthValue === "") {
    setErrorFor(dateOfBirth, "Date of birth cannot be blank");
  } else if (!regexTest) {
    setErrorFor(dateOfBirth, "enter date of birth as dd/mm/yyyy");
  } else if (isNaN(userBirthDate)) {
    setErrorFor(dateOfBirth, "date of birth is invalid");
  } else if (userBirthDate > cutOff18) {
    setErrorFor(dateOfBirth, "you have to be older than 18");
  } else {
    setSuccessFor(dateOfBirth);
  }
}
