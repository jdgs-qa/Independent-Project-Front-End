const password = document.getElementById("password"),
    confirm_password = document.getElementById("PasswordTwoElement");
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

const hostedURL = "http://api.penheaven.site:8081";
const localURL = "http://localhost:8080";
const APICaller = "/penHeavenAPI/api/access";
const accountAPI = "/account";
const upd = "/update/";
const del = "/delete/";

function load() {
    const l = localStorage.getItem('loggedIn');
    if (l === "true") {
        document.getElementById("loginBanner").className = "alert alert-success";
        document.getElementById("loginBannerSpinner").className = "";
        document.getElementById("loginBanner").innerText = "Awesome! You have logged in successfully!";
        populateProfile();
    } else {
        setTimeout(function () {
            window.location = "./index.html";
        }, 5000)
    }
}

function populateProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('userName').value = user.userName;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('email').value = user.email;
};


function doUpdate() {
    const userData = {};
    const form = document.getElementById("updateDetailsForm");
    for (let element of form.elements) {
        if (element.id) {
            userData[element.id] = element.value;
        }
    }
    delete userData.PasswordTwoElement;
    if (userData.password === "") {
        delete userData.password;
    }
    makeRequest('POST', hostedURL + APICaller + accountAPI + upd + userData.userName, userData)
        .then((value) => {
            document.getElementById("loginBanner").className = "alert alert-info";
        document.getElementById("loginBanner").innerText = "We've got it! Your details have been updated";
            console.log("Account Updated successfully!!", value);
        }).catch((error) => {
            console.warn("It definitely didnt work... :(", error);
        });
    return true;
}

function doDeleteConfirmButton() {
    setTimeout(function () {
        document.getElementById("deleteButton").innerText = "I'm sure, delete my account now";
        document.getElementById("deleteButton").removeAttribute("disabled");
    }, 5000);
}

function doDeleteButtonReset() {
    document.getElementById("deleteButton").toggleAttribute("disabled");
    document.getElementById("deleteButtonSpinner").className = "spinner-border spinner-border-sm";
    document.getElementById("deleteButton").innerText = "Please Wait...";
}

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

function doDeleteAccount() {
    const user = document.getElementById("userName").value;
    makeRequest('DELETE', hostedURL + APICaller + accountAPI + del + user)
        .then((value) => {
            console.log("Account Deleted successfully!!", value);
            doLogout();
        }).catch((error) => {
            console.warn("It definitely didnt work... :(", error);
        });

}