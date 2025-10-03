<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food Delivery Registration</title>
    <link rel="stylesheet" href="Registration.css">
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
        <h1 >Restaurent Registration</h1>
        <form id="registration-form" action="/FoodSphere/resreg" method="get"> 
            <div class="form-group">
                
                <input type="text" placeholder="Restaurent Name" id="name" name="name" required>
                <span class="error-message" id="name-error"></span>
            </div>
            <div class="form-group">
               
                <input type="text" placeholder="User name" id="name" name="username" required>
                <span class="error-message" id="username-error"></span>
            </div>
            <div class="form-group">
             
                <input type="email" placeholder="Email ID" id="email" name="email" required>
                <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-group">
                <label for="mobile"></label>
                <input type="number" placeholder="Mobile No." id="mobile" name="mobile" required>
                <span class="error-message" id="mobile no.-error"></span>
            </div>
            <div class="form-group">
                <label for="password"></label>
                <input type="password" placeholder="Password" id="password" name="pass" required>
                <span class="error-message" id="password-error"></span>
            </div>
            <div class="form-group">
                <label for="confirm-password"></label>
                <input type="password"  placeholder="Confirm Password" id="confirm_pass" name="confirm_pass" required>
                <span class="error-message" id="confirm-password-error"></span>
            </div>
            <div class="form-group">
                <label style="color: darkgray;" for="security-question">Security Question:</label>
                <select id="security-question" name="security_question" required>
                
                    <option value="" disabled selected>Select a security question</option>
                    <option value="pet">What is the name of your first pet?</option>
                    <option value="mother">What is your School name?</option>
                    <option value="school">Who is your inspiration?</option>
                </select>
                <input style="margin: 5px;" placeholder="Your answer here" type="text" id="security-question" name="security_answer">
                <span class="error-message" id="security-question-error"></span>
            </div>
            <br>
            <div class="form-group">
                <button type="submit">Register</button>
            </div>
             <div style="color: white; padding-top:40px;">
                  already existing user <a href="ResLogin.jsp">login in</a>
            </div>
          
        </form>
        <p id="success-message"></p>
    </div>
</body>
</html>
