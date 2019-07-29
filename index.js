const password = document.getElementById("password"),
    confirm_password = document.getElementById("PasswordTwoElement");
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

const pass = document.getElementById("passwordLogin"),
    user = document.getElementById("userLogin");

function doRegister() {
    const userData = {};
    const form = document.getElementById("registerForm");
    for (let element of form.elements) {
        if (element.id) {
            userData[element.id] = element.value;
        }
        delete userData.PasswordTwoElement;
        const dataString = JSON.stringify(userData);
        makeRequest('POST', 'http://localhost:8080/penHeavenAPI/api/access/account/create', dataString)
            .then((value) => {
                console.info("Account Registered successfully!!", value);
            }).catch((error) => {
                console.warn("It definitely didnt work... :(", error);
            });
        return true;
    }
}

function doLogin() {
    const userData = {
        "username": user.value,
        "password": pass.value
    };
    makeRequest('GET', 'http://localhost:8080/penHeavenAPI/api/access/account/searchUsername/' + userData.username)
        .then((value) => {
            console.log(value);
            loginPart2(value);
        }).catch((error) => {
            console.warn("It definitely didnt work... :(", error);
        });
}

function loginPart2(response) {
    const userData = {
        "username": user.value,
        "password": pass.value
    };
    const check = JSON.parse(response);
    if (userData.password === check.password) {
        localStorage.setItem('loggedIn', true);

        delete userData.d;
        delete check.password;
        localStorage.setItem('currentUser', JSON.stringify(check));
        delete check.d;
        window.location = "./user.html";
    } else {
        pass.setCustomValidity('Username or Password Not Recognised');
        return false;
    }
}

function validatePassword() {
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}