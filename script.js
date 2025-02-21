// script.js
// Firebase configuration - Replace with your config
const firebaseConfig = {
    apiKey: "AIzaSyBGHOgN80e4CX8QXRAEOSNxCxS_reYfjG0",
    authDomain: "",
    projectId: "codetrinity-5d73e",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const homePage = document.getElementById('homePage');
const showSignUpLink = document.getElementById('showSignUp');
const showLoginLink = document.getElementById('showLogin');
const signInForm = document.getElementById('signInForm');
const createAccountForm = document.getElementById('createAccountForm');
const googleSignInBtn = document.getElementById('googleSignIn');
const logoutBtn = document.getElementById('logoutBtn');
const continentSelect = document.getElementById('continentSelect');
const randomContinentBtn = document.getElementById('randomContinent');

// Toggle between login and signup forms
showSignUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signUpForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Email/Password Sign In
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Signed in successfully');
            signInForm.reset();
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Email/Password Sign Up
createAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Account created successfully');
            createAccountForm.reset();
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Google Sign In
googleSignInBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .catch((error) => {
            alert(error.message);
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        loginForm.classList.add('hidden');
        signUpForm.classList.add('hidden');
        homePage.classList.remove('hidden');
    } else {
        // User is signed out
        loginForm.classList.remove('hidden');
        signUpForm.classList.add('hidden');
        homePage.classList.add('hidden');
    }
});

// Continent selection functionality
const continents = ['africa', 'asia', 'europe', 'northAmerica', 'southAmerica', 'oceania', 'antarctica'];

randomContinentBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * continents.length);
    continentSelect.value = continents[randomIndex];
});