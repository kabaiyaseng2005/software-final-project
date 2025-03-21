document.addEventListener("DOMContentLoaded", function() {
    // Set up your navigation HTML
    document.querySelector("nav").innerHTML = `
      <div class="header_inner">
          <h1 class="logo"><img src="picture/logoo.png" alt="logo" /></h1>
  
          <div class="header_main-menu">
              <div class="main-menu">
                  <ul id="menu-main-menu" class="menu">
                      <li class="menu-link" type="none">
                          <a href="#" data-page="index.html">ໜ້າຫຼັກ</a>
                      </li>
                      <li class="menu-link" type="none">
                          <a href="#" data-page="pages/support_organization.html">ແຫຼ່ງສະໜັບສະໜູນ</a>
                      </li>
                      <li class="menu-link" type="none">
                          <a href="#" data-page="pages/disabled_center.html">ສູນຄົນພິການ</a>
                      </li>
                      <li class="menu-link" type="none">
                          <a href="#" data-page="pages/about.html">ກ່ຽວກັບ</a>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="lang-menu">
              <div class="selected-lang">
                  English
              </div>
              <ul>
                  <li>
                      <a href="#" class="de">German</a>
                  </li>
                  <li>
                      <a href="#" class="en">English</a>
                  </li>
                  <li>
                      <a href="#" class="fr">French</a>
                  </li>
                  <li>
                      <a href="#" class="ar">Arabic</a>
                  </li>
              </ul>
          </div>
      </div>
    `;
  
    // Add click event listeners to all navigation links
    function setupNavLinks() {
      const allNavLinks = document.querySelectorAll('a[data-page]');
      allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const pageUrl = this.getAttribute('data-page');
          loadContent(pageUrl);
        });
      });
    }
  
    // Function to load content
    function loadContent(url) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(html => {
          // Extract only the body content using a temporary element
          const temp = document.createElement('div');
          temp.innerHTML = html;
          
          // Look for main content container in the loaded page
          let newContent;
          if (temp.querySelector('main')) {
            newContent = temp.querySelector('main').innerHTML;
          } else if (temp.querySelector('#content')) {
            newContent = temp.querySelector('#content').innerHTML;
          } else {
            // If no specific content container found, get everything after nav
            const navElement = temp.querySelector('nav');
            if (navElement && navElement.nextElementSibling) {
              newContent = '';
              let currentElement = navElement.nextElementSibling;
              while (currentElement) {
                newContent += currentElement.outerHTML;
                currentElement = currentElement.nextElementSibling;
              }
            } else {
              // Fallback to body content
              newContent = temp.querySelector('body').innerHTML;
            }
          }
          
          document.getElementById('content').innerHTML = newContent;
          
          // Set up event listeners for new content that was just loaded
          setupNavLinks();
          
          // Update page title if available
          const newTitle = temp.querySelector('title');
          if (newTitle) {
            document.title = newTitle.textContent;
          }
          
          // Update URL without page reload
          window.history.pushState({path: url}, '', url);
        })
        .catch(error => {
          console.error('Error loading page:', error);
          document.getElementById('content').innerHTML = '<p>Error loading content. Please try again.</p>';
        });
    }
  
    // Initial setup of navigation links
    setupNavLinks();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
      if (event.state && event.state.path) {
        loadContent(event.state.path);
      }
    });
  });