<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <link rel="stylesheet" href="ForgotPassword.css">
    <style>
        html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: url('https://img.freepik.com/premium-photo/mouthwatering-pizza-black-stone-top-view-with-fresh-ingredients-empty-space-text_174533-20043.jpg') no-repeat center center;
            background-size: cover;
        }

        /* Popup styles */
        .popup {
            position: fixed;
            left: 50%;
            top: 10%;
            transform: translate(-50%, -50%);
            padding: 15px;
            border-radius: 5px;
            color: white;
            background-color: #4CAF50;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: none;
            text-align: center;
        }

        .popup.error {
            background-color: #f44336;
        }

        .container {
           padding: 20px;
           border-radius: 8px;
           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           width: 100%;
           max-width: 400px;
           border: 2px solid rgba(255, 255, 255, .2);
           backdrop-filter: blur(9px);
           display: flex;
           flex-direction: column;
            position: relative;
        }

        .form-group {
            position: relative;
            width: 100%;
            height: 50px;
            margin: 10px 0;
        }

        .form-group input {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            outline: none;
            border: 2px solid rgba(255, 255, 255, .2);
            border-radius: 40px;
            font-size: 16px;
            color: #fff;
            padding: 10px 15px 10px 10px;
            margin-top: 9px;
            margin-bottom: 15x;
        }

        .form-group input::placeholder {
            color: #fff;
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            font-family:'Times New Roman', Times, serif;
            font-weight: bold;
            font-size: 37px;
            color: darkgray;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input, select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: orangered;
            color: #fff;
            border: none;
            cursor: pointer;
            height: 45px;
            outline: none;
            border-radius: 40px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .1);
            font-size: 16px;
            font-weight: 600;
            margin: 20px 0 20px 0;
        }

        button:hover {
            background-color: #218838;
        }

        .error-message {
            color: #d9534f;
            font-size: 0.875em;
            display: block;
            margin-top: 5px;
        }

        #security_question, #identifier_type {
            border-radius: 40px;
        }
    </style>
</head>
<body>
    <div class="popup" id="popup"></div>
    <div class="container">
        <h1>Reset Password</h1>
        <form id="forgot-password-form" action="/FoodSphere/UserReset" method="get">
            <div class="form-group">
                <label style="color: darkgray;" for="identifier_type">Recovery Method:</label>
                <select id="identifier_type" name="identifier_type" required>
                    <option value="--select--">Select</option>
                    <option value="username">Username</option>
                    <option value="EmailID">Email</option>
                    <option value="MobileNo">Mobile Number</option>
                </select>
            </div>
            <div class="form-group">
                <input type="text" id="identifier_value" name="identifier_value" placeholder="Enter User name / Email / Mobile" required>
                <span class="error-message" id="identifier-error"></span>
            </div>
            <div class="form-group">
                <label style="color: darkgray;" for="security_question">Security Question:</label>
                <select id="security_question" name="security_question" required>
                    <option value="" disabled selected>Select your security question</option>
                    <option value="pet">What is the name of your first pet?</option>
                    <option value="school">What is your School name?</option>
                    <option value="inspire">Who is your inspiration?</option>
                </select>
            </div>
            <div class="form-group">
                <input type="text" id="security-answer" name="security_answer" placeholder="Answer" required>
                <span class="error-message" id="security-answer-error"></span>
            </div>
            <div class="form-group">
                <input type="password" id="new-password" name="new_password" placeholder="New Password" required>
                <span class="error-message" id="password-error"></span>
            </div>
            <div class="form-group">
                <input type="password" id="confirm-password" name="confirm_password" placeholder="Confirm Password" required>
                <span class="error-message" id="confirm-password-error"></span>
            </div>
            <div class="form-group">
                <button type="submit">Reset Password</button>
            </div>
        </form>
    </div>

    <script>
        window.onload = function() {
            const popup = document.getElementById('popup');

            // Check if there is an error or success message from the server
            <% if (request.getAttribute("errorMessage") != null) { %>
                popup.innerText = "<%= request.getAttribute("errorMessage") %>";
                popup.classList.add('error');
                popup.style.display = 'block';
                setTimeout(() => popup.style.display = 'none', 3000);
            <% } else if (request.getAttribute("successMessage") != null) { %>
                popup.innerText = "<%= request.getAttribute("successMessage") %>";
                popup.classList.remove('error');
                popup.style.display = 'block';
                setTimeout(() => popup.style.display = 'none', 3000);
            <% } %>
        }
    </script>
</body>
</html>
