<%@page import="java.sql.ResultSet"%>
<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food-Sphere</title>
    <link rel="stylesheet" href="RestaurantPage.css">
    <link rel="icon" href="https://github.com/obito1947/Food-delivery-/blob/main/WhatsApp_Image_2024-08-16_at_00.11.14_9ae1571f-removebg-preview.png?raw=true" type="image/icon type">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" >
    
    
    <% 
    String successMessage = (String) session.getAttribute("successMessage");
    String errorMessage = (String) session.getAttribute("errorMessage");
    String message=null;
    if (successMessage != null) {
        message = successMessage;
    } else if (errorMessage != null) {
        message = errorMessage;
      
    }
    if (message!=null ){
%>
        <script>
            window.onload = function() {
                const scrollPosition = sessionStorage.getItem('scrollPosition');
                if (scrollPosition) {
                    window.scrollTo(0, scrollPosition);
                    sessionStorage.removeItem('scrollPosition');
                }

                // Display the success popup
                const successPopup = document.getElementById('successPopup');
                if (successPopup) {
                    successPopup.style.display = 'block';

                    // Hide the popup after 5 seconds
                    setTimeout(function() {
                        successPopup.style.display = 'none';
                    }, 5000);
                }
            };
        </script>
<%
        // Remove the session attribute after displaying the message
        session.removeAttribute("successMessage");
    }
%>


</head>

<body>
   <%
List<String> restaurantData = (List<String>) session.getAttribute("restaurantData");
       %>

     <!-- Profile Logo -->
     <div id="profile-logo" class="profile-logo">
        <img src="<%= restaurantData.get(4) %>" 
           alt="Profile Logo">
    </div>
     
    <div id="sidebar" class="sidebar">
    <div class="sidebar-content">
        <div class="profile-photo-wrapper">
            <img src="<%= restaurantData.get(4) %>"
                 alt="Profile Photo" class="sidebar-profile-photo" id="sidebarProfilePhoto">
        </div>
<% 
       

if (restaurantData != null && !restaurantData.isEmpty()) {
%>
    <p class="sidebar-profile-name"><%= restaurantData.get(0) %></p>
    <p>&bull;&ensp;UserName: <%=  restaurantData.get(1) %></p>
    <p>&bull;&ensp;Email: <%=  restaurantData.get(2) %></p>
    <p>&bull;&ensp;MobileNo:<%= restaurantData.get(3) %>:</p>
    <% System.out.println("completed of side bar"); %>
<%
} else {
    out.println("<p>No data available for the restaurant.</p>");
}
%>

      <div class="actions-container">
                <p class="trigger-change-password">
                    <a href="#" id="triggerPasswordPopup"><i class="fa-solid fa-key"></i>&emsp;Change Password</a>
                </p>
                <p class="edit-profile">
                
                    <a href="#" id="editProfileBtn"><i class="fa-solid fa-user-edit"></i>&emsp;Edit info</a>
                </p>
            </div>
            <hr>
            <p class="logout"><a href="/FoodSphere/Logout"><i class="fa-solid fa-sign-out-alt"></i>&emsp;Logout</a></p>
    </div>
</div>
<!----pop-up for change password-->
<!----pop-up for change password-->
<div id="passwordPopup" class="pop1">
    <div class="popup1-content">
        <span class="close-popup1">&times;</span>
        <h2>Change Password</h2>
        <form id="changePasswordForm" action="/FoodSphere/updatePassword" method="get">
            <fieldset class="security-section">
                <legend>Security Check</legend>
                <label for="currentPassword">Current Password:</label>
                <input type="password" id="currentPassword" name="currentPassword" >
               
              <center>  <legend>New Password</legend></center>
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword">

                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </fieldset>

         
            <center><button type="submit">Save</button></center>
        </form>
    </div>
</div>
    
   <!-- Popup Window -->
<div id="editProfilePopup" class="popup">
    <div class="popup-content">
        <span class="close-btn" id="closePopup">&times;</span>
        <h2>Edit Profile</h2>
        <form id="editProfileForm" action="/FoodSphere/RestaurantProfile" method="post" enctype="multipart/form-data">
            <div class="profile-photo-section">
                <div class="profile-photo-wrapper">
                    <img src="<%= restaurantData.get(4) %>"
                         alt="Profile Photo" class="profile-photo" id="popupProfilePhoto">
                    <span class="edit-icon"><i class="fa-solid fa-pencil-alt"></i></span>
                </div>
                <input type="file" id="profilePhotoInput" accept="image/*" style="display:none;" name="photo">
            </div>

            <fieldset>
                <legend>Edit Profile Information</legend>
                
                <input type="hidden" name="Rname" value="<%= restaurantData.get(0)%>" ><br>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="<%= restaurantData.get(1)%>"><br>

                <label for="email">Email ID:</label>
                <input type="email" id="email" name="email" value="<%= restaurantData.get(2)%>"><br>
				
				<label for="description">Description:</label>
                <textarea id="description" name="description"><%= restaurantData.get(5) != null ? restaurantData.get(5) : "" %></textarea><br>
                <input type="number" name="number" value="<%= restaurantData.get(3) != null ? restaurantData.get(3).toString() : "" %>">
                
              
                
               <center><button type="submit">Save</button></center> 
            </fieldset>
        </form>
    </div>
</div>
    

    <div id="main-content" class="main-content">

    <header>
        <div class="logo">
                <img src="https://github.com/obito1947/Food-delivery-/blob/main/WhatsApp_Image_2024-08-16_at_00.11.14_9ae1571f-removebg-preview.png?raw=true" alt="Food-Sphere Logo" class="shadow-image">
                <center><h1>Food- Sphere</h1></center>
        </div>
    </header>
    <nav>

        <ul>
            <li><a href="Resturantpage.html"><i class="fa-solid fa-home nav-icon"></i> Home</a></li>
            <li><a href="#" id="AboutUsBtn"><i class="fa-solid fa-info-circle nav-icon"></i> About</a></li>
            <li><a href="#" id="contactUsBtn" ><i class="fa-solid fa-envelope nav-icon"></i> Contact Us</a></li>
        </ul>
    </nav>
    <div  class="resturant-section">
        <h2><%= session.getAttribute("restName") %></h2>
    </div>
    <div class="slider-container">
        <div class="slider-wrapper">
            <div class="slider">
              <div class="slider-item" >  <img src="https://thumbs.dreamstime.com/b/vector-illustration-your-design-order-food-home-guy-lucky-to-bicycle-hand-holds-smartphone-delivery-concept-224621273.jpg" alt="Image 1" /></div>
              
                  <div class="slider-item" > <img src="https://wallpapercave.com/wp/wp10400621.jpg"alt="Image 2"/></div>

                    <div class="slider-item" > <img src="https://i.pinimg.com/originals/cc/b2/02/ccb20235b94c60385df5d1b9c863688f.jpg"alt="Image 3"/></div>

                      <div class="slider-item" > <img src="https://azurlane.netojuu.com/images/0/0d/Skin_BG_519.png" alt="Image 4" /></div>

                        <div class="slider-item" > <img src="https://th.bing.com/th/id/R.e9979bbc326dd4a8ba7d982c31dbe072?rik=iLYH3kSvlDOR7A&riu=http%3a%2f%2fexecutivebillingsource.org%2fimages%2fheaderbanner%2fbanner_60f3756a71a33.jpg&ehk=yuWoFY4WtUvWAoiyf2cmjVLWaNtENaULGxnHgAE93iI%3d&risl=&pid=ImgRaw&r=0" alt="Image 5" /></div>
                          <!-- Add more images as needed -->
            </div>
        </div>
        <button class="prev" onclick="prevSlide()">❮</button>
        <button class="next" onclick="nextSlide()">❯</button>
    </div><br>

<div class="section">
    <p></p><br>
    <div class="product-grid">

        <!-- Item 1 -->
        <div class="product-card">
            <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/images/Food.webp"
                alt="item 1" class="item" data-modal="item1Modal"> 
            <div class="info">
                <h3 class="item" data-modal="item1Modal">Add Dish</h3>
            </div>
        </div>
        
        <div id="successPopup" class="success-popup">
            <p><%=message %></p>
        </div>
        <!-- Modal for Item 1 -->
        <div id="item1Modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <div class="body">
                    <div class="form-container">
                        <h2>Add New Dish</h2>
                        <form action="/FoodSphere/AddDish" method="POST" id="updateDishForm">
                            <div class="form-group">
                                <input type="text" id="dishname" name="dishname" required placeholder=" ">
                                <label for="dishname">Dish Name</label>
                            </div>
                            <div class="form-group">
                                <textarea id="description" name="description" placeholder=" "></textarea>
                                <label for="description">Description</label>
                            </div>
                            <div class="form-group">
                                <input type="text" id="price" name="price" required placeholder=" ">
                                <label for="price">Price</label>
                            </div>
                            <div class="form-group">
                                <select id="category" name="category" placeholder="category" required>
                                     <option value="" disabled selected></option> 
                                    <option value="Starter">Starter</option>  
                                    <option value="Biryani">Biryani</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Mandi">Mandi</option> 
                                    <option value="Salad">Salad</option>
                                    <option value="Sandwich">Sandwich</option>
                                    <option value="Soup">Soup</option>
                                    <option value="Seafood">Seafood</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Ice Cream">Ice Cream</option>
                                    <option value="Cake">Cake</option>
                
                                    <option value="Soft Drink">Soft Drink</option>
                                    <option value="Juice">Juice</option>
                                    <option value="Coffee">Coffee</option>
                                  
                                    <option value="Smoothie">Smoothie</option>
                
                               </select>
                            </div>
                            <div class="form-group veg-status">
                                
                                <input type="radio" id="veg" name="veg_nonveg" value="Veg" required>
                                <label for="veg">Veg</label>
                                <input type="radio" id="nonveg" name="veg_nonveg" value="Non-Veg">
                                <label for="nonveg">Non-Veg</label>
                            </div>
                            <div class="form-group avail-status">
                                <input type="checkbox" id="availstatus" name="availstatus" value="1" checked>
                                <label for="availstatus">Available</label>
                            </div>
                            <div class="form-group">
                                <input type="url" id="imageurl" name="imageurl" placeholder=" ">
                                <label for="imageurl">Image URL</label>
                            </div>
                            <div class="button-group">
                                <button type="submit" onclick="yourSubmitFunction()">Add Dish</button>
                                <button type="reset">Reset</button>
                            </div>
                        </form>
                    </div>
                    </div>
            </div>
        </div>

        <!-- Item 2 -->
        <div class="product-card">
            <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/images/UpdateFood.webp"
                alt="item 2" class="item" data-modal="item2Modal">
            <div class="info">
                <h3 class="item" data-modal="item2Modal" onclick="yourSubmitFunction()">Update Dish</h3>
            </div>
        </div>
        <!-- Modal for Item 2 -->
        <div id="item2Modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <div class="form-container2">
                    <h2>Update Dish Details</h2>
                    <form id="updateDishForm" action="/FoodSphere/UpdateDish" method="post">
                        <!-- Select Dish -->
                        <div class="form-group">
                            <label for="dishSelect">Select Dish</label>
                            <select id="dishSelect" name="dishSelect" required>
                                <option value="" disabled selected>Select a dish</option>
                            <%
							    ResultSet dishData = (ResultSet) session.getAttribute("dishData");
							    if (dishData != null) {
							    	
							        try {
							            while (dishData.next()) {
							            	
							%>
							                <option value="<%= dishData.getString("dishname")%>">
							                    <%= dishData.getString("dishname")%>
							                </option>
							<%
							            }
							        } catch (Exception e) {
							           
							        }
							    } else {
							    	
							    }
							%>

                            </select>
                        </div>
                
                        <!-- Select Detail to Update -->
                        <div class="form-group">
                            <label for="updateFieldSelect">Select Detail to Update</label>
                            <select id="updateFieldSelect" name="updateFieldSelect" required>
                                <option value="" disabled selected>Select a detail</option>
                                <option value="dishname">Dish Name</option>
                                <option value="description">Description</option>
                                <option value="price">Price</option>
                                <option value="category">Category</option>
                                <option value="availstatus">Availability Status</option>
                                <option value="imageurl">Image URL</option>
                                <option value="veg_or_nonveg">Veg/Non-Veg Status</option>
                            </select>
                        </div>
                
                        <!-- Input for New Value -->
                        <div class="form-group hidden" id="newValueGroup">
                            <label for="newValue">Enter New Value</label>
                            <input type="text" id="newValue" name="newValue">
                        </div>
                
                        <!-- Category Selection Box -->
                        <div class="form-group hidden" id="categorySelectGroup">
                            <label for="categorySelect">Select Category</label>
                            <select id="categorySelect" name="categorySelect">
                                <option value="" disabled selected>Select a category</option>
                                <option value="Appetizer">Appetizer</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Beverage">Beverage</option>
                            </select>
                        </div>
                
                        <!-- Veg/Non-Veg Radio Buttons -->
                        <div class="form-group hidden" id="vegStatusGroup">
                            <label>Veg/Non-Veg Status</label>
                            <div class="radio-group">
                                <label><input type="radio" name="vegStatus" value="Vegetarian"> Veg</label>
                                <label><input type="radio" name="vegStatus" value="Non-Vegetarian"> Non-Veg</label>
                            </div>
                        </div>
                
                        <!-- Update Button -->
                        <button type="submit" class="update-button" onclick="yourSubmitFunction()">Update Dish</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Item 3 -->
        <div class="product-card">
            <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/images/deletefood_landscape.webp"
                alt="item 3" class="item" data-modal="item3Modal">
            <div class="info">
                <h3 class="item" data-modal="item3Modal"> Remove Dish</h3>
            </div>
        </div>
        <!-- Modal for Item 3 -->
        <div id="item3Modal" class="modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <div class="form-container3">
                    <h2>Remove Dish</h2>
                    <form action="/FoodSphere/RemoveDish" method="POST" id="removeDishForm">
                        <div class="form-group">
                            <select id="dishname" name="dishname" required>
                                <option value="" disabled selected>Select Dish</option>
                                <!-- Options should be dynamically populated from the database -->
                                
                                <%
							     ResultSet dishData1 = (ResultSet) session.getAttribute("dishData");
							    if (dishData1 != null) 
							    { 
							    	
							        try {
							        	
							        	
							        	dishData1.beforeFirst();
							        			
							            while (dishData1.next()) {
							            	
							            	
							%>
							                <option value="<%= dishData1.getString("dishname")%>">
							                    <%= dishData1.getString("dishname")%>
							                </option>
							<%
							            }
							        } catch (Exception e) {
							        	System.out.println("exception raised "+e);
							        }
							    } else {
							    	System.out.println("data is not available");
							    }
							%>

                              
                            </select>
                            <label for="dishname">Dish Name</label>
                        </div>
                        <button type="submit" onclick="yourSubmitFunction()" >Remove Dish</button>
                        <div class="confirmation-message">
                            This action cannot be undone.
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Item 4 -->
        <div class="product-card">
            <img src="https://freedesignfile.com/upload/2015/02/Vector-set-of-restaurant-menu-design-graphics-01.jpg"
                alt="item 4" class="item" data-modal="item4Modal">
            <div class="info">
                <h3 class="item" data-modal="item4Modal">Check Menu</h3>
            </div>
        </div>
        <!-- Item 5 -->
        <div class="product-card">
            <img src="https://th.bing.com/th/id/R.f8ba7461e513da166fd662507d5844c0?rik=FwqmFAsRapFSnw&riu=http%3a%2f%2fmoney.gigamundo.com%2fwp-content%2fuploads%2f2021%2f07%2fstock-market-today-1102201-scaled.jpg&ehk=kiJ%2fh3zUqdTAlySgYin%2bYxi%2fbTx7zh6NHEmV1rHd6%2f4%3d&risl=&pid=ImgRaw&r=0"
                alt="item 5" class="item" data-modal="item5Modal" onclick="updateAnalysis()">
            <div class="info">
                <h3 class="item" data-modal="item5Modal" onclick="updateAnalysis()">View Analysis</h3>

            </div>
        </div>
        <!-- Modal for Item 5 -->
        <div id="item5Modal" class="modal">
            <div class="modal-content1">
                <span class="close-button">&times;</span>
                <div class="container4">
                    <h1>Restaurant Report Analysis</h1>
            
                    <div class="statistics">
                        <div class="stat-card">
                            <h2 id="totalOrders">0</h2>
                            <p>Total Orders This Month</p>
                        </div>
                        <div class="stat-card">
                            <h2 id="monthIncome">$0</h2>
                            <p>Income This Month</p>
                        </div>
                        <div class="stat-card">
                            <h2 id="totalIncome">$0</h2>
                            <p>Total Income</p>
                        </div>
                        <div class="stat-card">
                            <h2 id="totalCustomers">0</h2>
                            <p>Total Customers</p>
                        </div>
                    </div>
            
                    <div class="order-history">
                        <h2>Previous Orders</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Dish Name</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody id="orderTableBody">
                                <!-- Orders will be dynamically inserted here -->
                            </tbody>
                        </table>
                        <div id="noOrdersMessage" class="no-orders">No orders placed yet.</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Item 6 -->
        <div class="product-card">
            <img src="https://th.bing.com/th/id/R.20143cd2824099495437cac2b06014db?rik=6M7qb3nyOfMAbQ&riu=http%3a%2f%2ftrailheadtechnology.com%2fwp-content%2fuploads%2f2021%2f07%2ffeedback.jpg&ehk=RPyhXemdpVi8D1mTaYb2E5I%2bc2Utkt843%2b0QyRsb68o%3d&risl=&pid=ImgRaw&r=0"
                alt="item 6" class="item" data-modal="item6Modal" onclick="openFeedbackModal('<%= restaurantData.get(0) %>')">
            <div class="info">
                <h3 class="item" data-modal="item6Modal" onclick="openFeedbackModal('<%= restaurantData.get(0) %>')">View Feedback</h3>
            </div>
        </div>
        <!-- Modal for Item 6 -->
        <div id="item6Modal" class="modal">
		  <div id="feedbackModal" class="modal2">
		    <div class="modal-content2">
		        <span class="close-button" onclick="closeFeedbackModal()">&times;</span>
		        <div class="feedback-container">
		            <h2>Customer Feedback</h2>
		            <!-- Feedback cards will be inserted here dynamically -->
		        </div>
		    </div>
		</div>
		            
        </div>

    </div>
    <div id="extra-content" class="container3" style="display: none;">
        <h1 class="container3-title">Menu</h1>
       
     
     
    				  <%
							     ResultSet dishData2 = (ResultSet) session.getAttribute("dishData");
							    if (dishData2 != null) 
							    { 
							    	
							        try {
							        	
							        	
							        	dishData2.beforeFirst();
							        			
							            while (dishData2.next()) {
							            	
							            	
							%>
							              
							    <div class="card">
							        <div class="card-image">
							            <img src="<%=dishData2.getString("imageurl")%>" alt="noodles">
							        </div>
							        <div class="card-text">
							            <p class="card-meal-type">
							               <%=dishData2.getString("restname")%>
							            </p>
							            <div class="card-title-row">
							                <h2 class="card-title"><%=dishData2.getString("dishname")%></h2>
							                <% if(((String)dishData2.getString("veg_or_nonveg")).equals("Non-Veg")){ %>
							                <span class="vegornot-box non-veg">Non-Veg</span>
							                <%} else { %>
							                <span class="vegornot-box veg">Veg</span>
							                <%} %>
							            </div>
							            <p class="card-body description"><%=dishData2.getString("description")%></p>
							            <p class="price">₹<%=dishData2.getString("price")%></p>
							        </div>
							    </div>  
							               
							<%
							            }
							        } catch (Exception e) {
							        	System.out.println("exception raised "+e);
							        }
							    } else {
							    	System.out.println("data is not available");
							    }
							%>
       
  </div>

    <section class="about-section" id="about-section">
        <div class="container">
            <h1>About <%= restaurantData.get(0) %></h1>
            <p>Welcome to <strong><%= restaurantData.get(0) %></strong>
            <%= restaurantData.get(5) %>
                 promptly, and meet your expectations every time.</p>
        </div>
    </section>
    <script>
        document.getElementById('AboutUsBtn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
});

    </script>

</div>

        <div id="contact-section" class="contact-section">
            <h2>Contact Us</h2>
            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <form>
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <textarea rows="5" placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
        </div>
   
    
        <footer>
            <div class="footer-content">
                        <div class="footer-link-section">
                            <ul>
                                <li><a href="mailto:support@muhilanstore.com">support@muhilanstore.com</a></li>
                                <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
                                <li><a href="#">1234 Market St, San Francisco, CA</a></li>
                            </ul>
                         </div>
                    <div class="social-icons">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                    <p>&copy; 2024 Muhilan Store. All rights reserved.</p>
                </div>
           
        </footer>
    
        <script type="text/javascript" src="RestaurantPage.js"></script>
    </body>
</html>
    