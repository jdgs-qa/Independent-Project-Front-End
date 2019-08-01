const password = document.getElementById("password"),
    confirm_password = document.getElementById("PasswordTwoElement");
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

const pass = document.getElementById("passwordLogin"),
    user = document.getElementById("userLogin");

const hostedURL = "http://api.penheaven.site:8081";
const localURL = "http://localhost:8080";
const APICaller = "/penHeavenAPI/api/access";
const accountAPI = "/account";
const log = "/login";
const add = "/create";
const search = "/searchUsername/";

function doRegister() {
    const userData = {};
    const form = document.getElementById("registerForm");
    for (let element of form.elements) {
        if (element.id) {
            userData[element.id] = element.value;
        }
    }
    delete userData.PasswordTwoElement;
    // const j = JSON.stringify(userData);
    makeRequest('POST', hostedURL + APICaller + accountAPI + add, userData)
        .then((response) => {
            console.info("Account Registered successfully!!", response);
            $('#register').modal('toggle');
            $('#success').modal('toggle');
        }).catch((error) => {
            document.getElementById("duplicateBanner").className = "alert alert-danger";
            document.getElementById("duplicateBanner").innerText = "Sorry, this username is taken. please try another";
            //console.warn("It definitely didnt work... :(", error);
        });

    return false;
}

function checkUsername() {
    const loginUn = document.getElementById('userName');
    loginUn.id = "userName2";
    const un = document.getElementById('userName').value;
    makeRequest('GET', hostedURL + APICaller + accountAPI + search + un)
    .then((response) => {
        document.getElementById("duplicateBanner").className = "alert alert-danger";
        document.getElementById("duplicateBanner").innerText = "Sorry, this username is taken. please try another";
        }).catch((error) => {
            document.getElementById("duplicateBanner").className = "alert alert-success";
        document.getElementById("duplicateBanner").innerText = "Awesome! This username is available!";
        error = null;
        return error;
});
loginUn.id = "userName";
        }

function doLogin() {
                const userData = {};
                const form = document.getElementById("loginForm");
                for (let element of form.elements) {
                    if (element.id) {
                        userData[element.id] = element.value;
                    }
                }
                makeRequest('POST', hostedURL + APICaller + accountAPI + log, userData)
                    .then((response) => {
                        loginPart2(response);
                    }).catch((error) => {
                        console.warn("It definitely didnt work... :(", error);
                    });

            }

function loginPart2(response) {
                localStorage.setItem('loggedIn', true);
                const data = response.data;
                localStorage.setItem('currentUser', JSON.stringify(data));
                delete response;
                window.location = "./user.html";
            }

function doSuccessToLogin() {
                $('#success').modal('toggle');
                $('#login').modal('toggle');
            }

function doLoginToRegister() {
                $('#login').modal('toggle');
                $('#register').modal('toggle');
            }

function doRegisterToLogin() {
                $('#register').modal('toggle');
                $('#login').modal('toggle');
            }

function validatePassword() {
                if (password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Passwords Don't Match");
                } else {
                    confirm_password.setCustomValidity('');
                }
            }