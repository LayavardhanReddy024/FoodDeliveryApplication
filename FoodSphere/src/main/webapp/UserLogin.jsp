<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Interactive Panda Form</title>
    <!-- Google Font -->
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <!-- Stylesheet -->
    <link rel="stylesheet" href="Login.css" />
    <link  href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>
        /* Popup styles */
        .popup {
            position: fixed;
            left: 50%;
            top: 20%;
            transform: translate(-50%, -50%);
            padding: 15px;
            border-radius: 5px;
            color: white;
            background-color: #4CAF50; /* Default to green for success */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
        }
        .popup.error {
            background-color: #f44336; /* Red for errors */
        }
    </style>
    <script>
        // Function to display the popup
        function showPopup(message, type) {
            var popup = document.createElement('div');
            popup.className = 'popup';
            if (type === 'error') {
                popup.classList.add('error');
            }
            popup.innerHTML = message;
            document.body.appendChild(popup);
            popup.style.display = 'block';
            setTimeout(function() {
                popup.remove();
            }, 3000); // Popup disappears after 3 seconds
        }

        // Check for messages and show popup if available
        window.onload = function() {
            <% 
                String errorMessage = (String) request.getAttribute("errorMessage");
                String successMessage = (String) request.getAttribute("successMessage");
            %>
            <% if (errorMessage != null) { %>
                showPopup("<%= errorMessage %>", "error");
            <% } %>
            <% if (successMessage != null) { %>
                showPopup("<%= successMessage %>", "success");
            <% } %>
        };
    </script>
  </head>
  <body>
    <div class="container">
      
      <form action="/FoodSphere/UserLogin" method="post">
        <h1 class="h1" >User Login</h1>
        <div class="input-box">
        
        <input type="text" id="username" placeholder="Username" name="username" required/>
        <i style="color: darkgray;" class='bx bxs-user'></i>
        </div>
        <div class="input-box">
      
        <input type="password" id="password" placeholder="Password" name="password" required/>
        <i style="color: darkgray;" class='bx bxs-lock-alt' ></i>
        </div>
        <div class="remember-forgot">
            <label style="color: darkgray;"><input type="checkbox">Remember Me</label>
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit" class="btn">Login</button>
         
          <div class="register-link">
            <p style="color: darkgray;">Dont have an account? <a href="UserRegistration.jsp">Register</a></p>
          </div>
      </form>
      <div class="ear-l"></div>
      <div class="ear-r"></div>
      <div class="panda-face">
        <div class="blush-l"></div>
        <div class="blush-r"></div>
        <div class="eye-l">
          <div class="eyeball-l"></div>
        </div>
        <div class="eye-r">
          <div class="eyeball-r"></div>
        </div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div>
      <div class="hand-l"></div>
      <div class="hand-r"></div>
      <div class="paw-l"></div>
      <div class="paw-r"></div>
    </div>
    <!-- Script -->
    <script >
      let usernameRef = document.getElementById("username");
let passwordRef = document.getElementById("password");
let eyeL = document.querySelector(".eyeball-l");
let eyeR = document.querySelector(".eyeball-r");
let handL = document.querySelector(".hand-l");
let handR = document.querySelector(".hand-r");

let normalEyeStyle = () => {
  eyeL.style.cssText = `
    left:0.6em;
    top: 0.6em;
  `;
  eyeR.style.cssText = `
  right:0.6em;
  top:0.6em;
  `;
};

let normalHandStyle = () => {
  handL.style.cssText = `
        height: 2.81em;
        top:8.4em;
        left:7.5em;
        transform: rotate(0deg);
    `;
  handR.style.cssText = `
        height: 2.81em;
        top: 8.4em;
        right: 7.5em;
        transform: rotate(0deg)
    `;
};
//When clicked on username input
usernameRef.addEventListener("focus", () => {
  eyeL.style.cssText = `
    left: 0.75em;
    top: 1.12em;  
  `;
  eyeR.style.cssText = `
    right: 0.75em;
    top: 1.12em;
  `;
  normalHandStyle();
});
//When clicked on password input
passwordRef.addEventListener("focus", () => {
  handL.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);    
    `;
  handR.style.cssText = `
    height: 6.56em;
    top: 3.87em;
    right: 11.75em;
    transform: rotate(155deg);
  `;
  normalEyeStyle();
});
//When clicked outside username and password input
document.addEventListener("click", (e) => {
  let clickedElem = e.target;
  if (clickedElem != usernameRef && clickedElem != passwordRef) {
    normalEyeStyle();
    normalHandStyle();
  }
});
    </script>
  </body>
</html>