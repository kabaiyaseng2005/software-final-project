function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn && !window.location.href.includes("login.html")) {
        window.location.href = "login.html";
    }
    
}

checkAuthentication();