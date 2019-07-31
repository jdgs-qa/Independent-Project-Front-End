const password = document.getElementById("password"),
    confirm_password = document.getElementById("PasswordTwoElement");
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

function load() {
    // VVV !!delete this line before using, otherwise user cant login!! VVV
    //const loggedIn = true;
    //const loggedIn = localStorage.getItem('loggedIn';)
    if (loggedIn === true) {
        document.getElementById("loginBanner").className = "alert alert-success";
        document.getElementById("loginBannerSpinner").className = "";
        document.getElementById("loginBanner").innerText = "Awesome! You have logged in successfully!"
        populateProfile();
    } else {
        setTimeout(function () {
            window.location = "./index.html";
        }, 5000)
    }
};

function populateProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('userName').value = currentUser.userName;
    document.getElementById('firstName').value = currentUser.firstName;
    document.getElementById('lastName').value = currentUser.lastName;
    document.getElementById('email').value = currentUser.email;
}


function doUpdate() {
    const userData = {};
    const form = document.getElementById("updateDetailsForm");
    for (let element of form.elements) {
        if (element.id) {
            userData[element.id] = element.value;
        }
    }
    delete userData.PasswordTwoElement;
    const dataString = JSON.stringify(userData);
    makeRequest('POST', 'http://localhost:8080/penHeavenAPI/api/access/account/update/' + userData.userName, dataString)
        .then((value) => {
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
        document.getElementById("deleteButtonSpinner").className = "";
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

function doLogout() {
    localStorage.removeItem('currentUser');
    localStorage.setItem('loggedIn', false);
    window.location = "./index.html";
}

function doDeleteAccount() {
    const user = document.getElementById("userName").value;
    makeRequest('DELETE', 'http://localhost:8080/penHeavenAPI/api/access/account/delete/' + user)
        .then((value) => {
            console.log("Account Deleted successfully!!", value);
            doLogout();
        }).catch((error) => {
            console.warn("It definitely didnt work... :(", error);
        });

}