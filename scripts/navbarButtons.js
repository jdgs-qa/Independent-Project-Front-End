function loadButtons() {
    try {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn === true) {
            document.getElementById('buttonOne').innerText = "Log Out";
            document.getElementById('buttonOne').setAttribute("onclick", "doLogout();");
            document.getElementById('buttonOne').removeAttribute("data-toggle");
            document.getElementById('buttonOne').removeAttribute("data-target");
            document.getElementById('buttonTwo').innerText = "My Account";
            document.getElementById('buttonTwo').setAttribute("onclick", "doMyAccount();");
            document.getElementById('buttonTwo').removeAttribute("data-toggle");
            document.getElementById('buttonTwo').removeAttribute("data-target");
        }
    } catch (Exception) {
        localStorage.setItem('loggedIn', false)
    }
}

function doLogout() {
    localStorage.removeItem('currentUser');
    localStorage.setItem('loggedIn', false);
    window.location = "./index.html";
}

function doMyAccount() {
    window.location = "./user.html"
}