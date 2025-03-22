        // Store the original home page content
        const originalHomeContent = document.getElementById('content').innerHTML;
        
        // Function to load the home page
        function loadHomePage() {
            document.getElementById('content').innerHTML = originalHomeContent;
        }
        
        // Function to load other pages
        function loadPage(page) {
            fetch(page + '.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('content').innerHTML = data;
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

        