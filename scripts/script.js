// Store the original home page content
const originalHomeContent = document.getElementById('content').innerHTML;

// Add this to your CSS (you'll need to include this in your style.css file)
const styleElement = document.createElement('style');
styleElement.textContent = `
    .menu {
        position: relative;
    }
    
    .menu-link a {
        position: relative;
        transition: color 0.3s ease;
    }
    
    .menu-link a::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #ffffff;
        transition: width 0.3s ease;
    }
    
    .menu-link a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(styleElement);

// Function to set active menu item with animated underline
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
        window.location.href = "login.html";
    }
}

// Set the active menu item on page load (assuming home is default)
document.addEventListener('DOMContentLoaded', function() {
    setActiveMenuItem('home');
});