// Function to set active menu item
function setActiveMenuItem(pageId) {
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-link a');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the current menu item
    let activeMenuItem;
    
    if (pageId === 'home') {
        activeMenuItem = document.querySelector('.menu-link a[onclick*="loadHomePage"]');
    } else {
        activeMenuItem = document.querySelector(`.menu-link a[onclick*="'${pageId}'"]`);
    }
    
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
}

// Function to load the home page
function loadHomePage() {
    document.getElementById('content').innerHTML = originalHomeContent;
    setActiveMenuItem('home');
}

// Function to load other pages
function loadPage(page) {
    fetch(page + '.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            setActiveMenuItem(page);
        })
        .catch(error => console.log('Error loading page:', error));
}

function confirmLogout() {
    const confirmation = confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກຈາກລະບົບ?");
    if (confirmation) {
        sessionStorage.removeItem("isLoggedIn");
        window.location.href = "/pages/login/login.html";
    }
}

// Store the original home page content
const originalHomeContent = document.getElementById('content').innerHTML;

// Set the active menu item on page load (assuming home is default)
document.addEventListener('DOMContentLoaded', function() {
    setActiveMenuItem('home');
});