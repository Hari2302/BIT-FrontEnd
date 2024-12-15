const apiUrl = "http://localhost:5218/api/auth"; // Replace with your actual API URL



document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login1");
  const loginPage = document.getElementById("login-page");
  const closeLoginButton = document.getElementById("close-login");

  // Toggle login page visibility
  loginButton.addEventListener("click", function () {
    const isHidden = getComputedStyle(loginPage).display === "none";
    loginPage.style.display = isHidden ? "block" : "none";
  });

  // Close login page when clicking the close button
  closeLoginButton.addEventListener("click", function () {
    loginPage.style.display = "none";
  });
});




// Switch to Login Form
document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default action of the anchor tag
    document.getElementById("register-form").style.display = "none"; // Hide registration form
    document.getElementById("login-form").style.display = "block"; // Show login form
});

// Switch to Registration Form
document.getElementById("show-register").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default action of the anchor tag
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("register-form").style.display = "block"; // Show registration form
});


// Registration Form Logic
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById("register-name").value,
        email: document.getElementById("register-email").value,
        password: document.getElementById("register-password").value,
    };

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const message = await response.text();
        alert(message);

        if (message.toLowerCase().includes("successful")) {
            document.getElementById("register-form").style.display = "none";
            document.getElementById("login-form").style.display = "block";
        }
    } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration.");
    }
});

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginData = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
    };

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });

        const message = await response.text();
        alert(message);

        // Extract email and password from input fields
        const { email, password } = loginData;

        // Redirect based on login success and user credentials
        if (message.toLowerCase().includes("successful")) {
            if (email === "admin@gmail.com" && password === "admin123") {
                // Redirect to Employee Management System for admin
                
                window.location.href = "employee_management.html";
            } else {
                // Redirect to Career page for regular users
                window.location.href = "career.html";
            }
        } else {
            alert("Invalid login credentials.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
    }
});




//   Animation MAin 3

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  
  // Add event listener for scroll
  window.addEventListener('scroll', () => {
    const rightSection = document.querySelector('.Main3-Right');
    
    if (isInViewport(rightSection)) {
      rightSection.classList.add('animate');
    }
  });
  
  