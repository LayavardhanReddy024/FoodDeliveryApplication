<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="java.util.*,java.sql.*" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food-Sphere</title>
    <link rel="stylesheet" href="UserPage.css">
    <link rel="icon" href="https://icon-library.com/images/library-icon-png/library-icon-png-28.jpg" type="image/icon type">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>

<body>
<%
List<String> userData = (List<String>) session.getAttribute("userData");
       %>

    
    
<!-- Dropdown Menu -->
<div id="dropdown-menu" class="dropdown-menu">
    <a href="#" id="editProfileBtn"><i class="fa-solid fa-user-edit nav-icon"></i> &emsp;Edit Profile</a>
    <a href="#" id="openModalLink" ><i class="fa-solid fa-concierge-bell nav-icon" ></i>&emsp;Check Orders</a>
    <a href="#" id="triggerPasswordPopup"><i class="fa-solid fa-key nav-icon"></i>&emsp;Change Password</a>
    <a href="/FoodSphere/Logout"><i class="fa-solid fa-sign-out-alt nav-icon"></i>&emsp;Logout</a>
</div>

<!-- Popup Window for edit profile-->
<div id="editProfilePopup" class="popup">
    <div class="popup-content">
        <span class="close-btn" id="closebtn" onClick="close();">&times;</span>
        <h2>Edit Profile</h2>
        <form id="editProfileForm" action="/FoodSphere/EditProfile" method="post" enctype="multipart/form-data">
            <div class="profile-photo-section">
                <div class="profile-photo-wrapper">
                    <img src="<%= userData.get(4) %>" alt="Profile Photo" class="profile-photo" id="popupProfilePhoto">
                    <span class="edit-icon"><i class="fa-solid fa-pencil-alt"></i></span>
                </div>
                <input type="file" id="profilePhotoInput" accept="image/*" style="display:none;" name="photo">
            </div>

            <fieldset>
                <legend>Edit Profile Information</legend>
                <label for="Name">Name:</label>
                <input type="text" id="Name" name="Name" value="<%=userData.get(0) %>"><br>


                <label for="email">Email ID:</label>
                <input type="email" id="email" name="email" value="<%=userData.get(2) %>"><br>

                <label for="number">MobileNo:</label>
                <input type="number" id="number" name="number" value="<%= userData.get(3) != null ? userData.get(3).toString() : "" %>"><br>

                <center><button type="submit">Save</button></center>
            </fieldset>
        </form>
    </div>
</div>

<!----pop-up for change password-->
<div id="passwordPopup" class="pop1">
    <div class="popup1-content">
        <span class="close-popup1">&times;</span>
        <h2>Change Password</h2>
        <form id="changePasswordForm" action="/FoodSphere/userUpdatePassword" method="get">
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
<!---- pop-up for check orders-->
<div id="orderModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <div class="order-container">
            <h1>Previous Orders</h1>

            

           

            
        </div>
    </div>
</div>

<!-- Feedback Modal -->
<div id="feedbackModal" class="modal1">
    <div class="modal-content1">
        <span class="close" onclick="closeFeedbackModal()">&times;</span>
        <h2>Give Feedback</h2>
        <p id="orderFeedbackFor"></p>
        
        <div class="star-rating">
            <span class="fa fa-star" data-rating="1"></span>
            <span class="fa fa-star" data-rating="2"></span>
            <span class="fa fa-star" data-rating="3"></span>
            <span class="fa fa-star" data-rating="4"></span>
            <span class="fa fa-star" data-rating="5"></span>
        </div>

        <textarea rows="4" class="feedback-text" placeholder="Type your feedback"></textarea>

       <button id="sendFeedbackBtn" class="send-feedback-btn">Send Feedback</button>

    </div>
</div>
    <header>
       <!-- Profile Logo -->
<div id="profile-logo" class="profile-logo">
     <img src="<%= userData.get(4) %>" alt="Profile Logo">
</div>

        <div class="logo">
                <img src="https://github.com/obito1947/Food-delivery-/blob/main/WhatsApp_Image_2024-08-16_at_00.11.14_9ae1571f-removebg-preview.png?raw=true" alt="Food-Sphere Logo" class="shadow-image">
                <center><h1>Food- Sphere</h1></center>
        </div>

        <div class="header-content">
            <div class="search-container">
                <input type="text" id="searchInput" name="query" class="search-input" placeholder="Search..." />
                <button id="searchButton" class="search-button" action="/search" method="GET" target="_blank">
                    <i class="fa-solid fa-search"></i>
                </button>
            </div>
            <div class="Cart-icon" id="Cart-icon">
                <h1 ><a href="Cart.jsp" style="text-decoration: none;"> 🛒</a></h1> <span class="Cart-count" 
                 id="Cart-count">0</span>
             </div>
        </div>
    </header>

    <nav>
        <ul>
            <li><a href="#"><i class="fa-solid fa-home nav-icon"></i> Home</a></li>
            <li><a href="#"><i class="fa-solid fa-shop nav-icon"></i> Shop</a></li>
            <li><a href="#"><i class="fa-solid fa-concierge-bell nav-icon"></i> Services</a></li>
            <li><a href="#" id="AboutUsBtn"><i class="fa-solid fa-info-circle nav-icon"></i> About</a></li>
            <li><a href="#" id="contactUsBtn" ><i class="fa-solid fa-envelope nav-icon"></i> Contact Us</a></li>
        </ul>
    </nav>

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


    <div class="main-content">
        <div class="carousel-container">
            <button class="arrow left-arrow">&#10094;</button>
            <div class="carousel">
                <div class="carousel-item" data-name="Biryani">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Biriyani-removebg-preview.webp" alt="Biriyani">
                    </a>
                    <div class="text-overlay" >
                        <p>Biryani</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Pizza">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/pizza-removebg-preview%20(2).webp" alt="Pizza" style="width: 100%;">
                    </a>
                    <div class="text-overlay">
                        <p>Pizza</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Burger">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Burger-removebg-preview.webp" alt="Burger" style="width: 100%;">
                    </a>
                    <div class="text-overlay">
                        <p><br>Burger</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Rolls">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Rolls-removebg-preview.webp" alt="Rolls">
                    </a>
                    <div class="text-overlay">
                        <p><br>Rolls</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Shakes">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Shakes-removebg-preview.webp" alt="Shakes">
                    </a>
                    <div class="text-overlay">
                        <p>Shakes</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Cakes/Dessert">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Cakes-removebg-preview%20(1).webp" alt="Cakes">
                    </a>
                    <div class="text-overlay">
                        <p><br>Cakes/Desserts</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Naan's">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Naan_s-removebg-preview.webp" alt="Naan's">
                    </a>
                    <div class="text-overlay">
                        <p>Naan's</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Noodles">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Noodles-removebg-preview.webp" alt="Noodles" style="height: 50%;">
                    </a>
                    <div class="text-overlay">
                        <p>Noodles</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Fried-Rice">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Friedrice-removebg-preview.webp" alt="Fried-Rice" style="width: 100%; height: 1205;" >
                    </a>
                    <div class="text-overlay">
                        <p>Fried-Rice</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Startersi">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Staters-removebg-preview.webp" alt="Staters">
                    </a>
                    <div class="text-overlay">
                        <p>Staters</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Ice Creams">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Icecream-removebg-preview.webp" alt="Ice Creams">
                    </a>
                    <div class="text-overlay" >
                        <p>Ice Creams</p>
                    </div>
                </div>
                <div class="carousel-item" data-name="Curries">
                    <a >
                        <img src="https://raw.githubusercontent.com/obito1947/Food-delivery-/main/images/Curries-removebg-preview.webp" alt="Curries" style="height: 50%;">
                    </a>
                    <div class="text-overlay">
                        <p>Curries</p>
                    </div>
                </div>
            </div>
            <button class="arrow right-arrow">&#10095;</button>
        </div>
        

        <div class="filter-container">
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="filter-item filter-label">Filter&ensp;<i class="fa-solid fa-filter"></i></div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="filter-item filter-label">Sort By</div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="contents">
                    <div class="filter-item filter-label">New on FoodSphere</div>
                </div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="contents">
                    <div class="filter-item filter-label">Ratings 4.0+</div>
                </div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="contents">
                    <div class="filter-item filter-label">Pure Veg</div>
                </div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="contents">
                    <div class="filter-item filter-label">Non-Veg</div>
                </div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="contents">
                    <div class="filter-item filter-label">Less than Rs. 200</div>
                </div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
            
            <div class="filter-section" onclick="toggleFilter(this)">
                <div class="contents">
                    <div class="filter-item filter-label">Rs. 200-Rs. 500</div>
                </div>
                <span class="close-filter" onclick="removeFilter(event, this)">✕</span>
            </div>
        </div>
        
        
        
    <div class="section">
        <p></p><br>
        <div class="product-grid">
            
    
            <div class="product-card">
                <img src="https://www.indianpolitics.co.in/wp-content/uploads/2021/02/dosa_c.jpg" alt="item 1">
                <div class="info">
                    <p class="resturant-Name">Restaurant Name </p>
                    <h3>item 1</h3>
                    <p>Description of item 1.</p>
                    <div class="price">₹99.99<i>₹119.99</i></div>
                </div>
                <div class="veg">Veg</div>
                <button class="cart-button" onclick="addToCart(this)">
                    <span class="add-to-cart">Add to cart</span>
                    <span class="added"><i class="fa-solid fa-circle-check"></i> Done</span>
                    <i class="fa-solid fa-cart-shopping"></i>   
                    <i class="fas fa-box"></i>
                </button>
            </div>
    
            <div class="product-card">
                <img src="https://images2.alphacoders.com/108/1085778.jpg" alt="item 2">
                <div class="info">
                    <p class="resturant-Name">Restaurant Name </p>
                    <h3>item 2</h3>
                    <p>Description of item 2.</p>
                    <div class="price">₹89.99<i>₹99.99</i></div>
                </div>
                <div class="non-veg">Non-Veg</div>
                <button class="cart-button" onclick="addToCart(this)">
                    <span class="add-to-cart">Add to cart</span>
                    <span class="added"><i class="fa-solid fa-circle-check"></i> Done</span>
                    <i class="fa-solid fa-cart-shopping"></i>   
                    <i class="fas fa-box"></i>
                </button>
                
            </div>
    

          
            
        </div>
        <span class="more-content">
               
              
                   
            
            </span>
        <p></p><br>
        <center><span class="btn" onclick="toggleContent()">View More</span></center>
    </div>
    <!-- Cart pop-up -->
        <!-- Cart pop-up -->
<div class="cart-popup" id="cartPopup">
    <span class="close" onclick="closePopup()">×</span>
    <div class="cart-content">
        <p id="cartCount">
            <span id="cartCountNumber">1 item</span> in your cart
        </p>
      <!--   <a class="view-cart-link" href="Cart.jsp">View Cart 🛒</a>  -->
<a class="view-cart-link" onclick="goToCart()">View Cart 🛒</a> 

    </div>
</div>

        <p></p><br>
        <section class="about-section" id="about-section">
            <div class="container">
                <h1>About Food Sphere</h1>
                <p>Welcome to <strong>Food Sphere</strong>, your ultimate online food delivery platform designed to bring
                     the best dining experiences right to your doorstep. Whether you're craving a gourmet meal from your 
                     favorite restaurant, a quick snack, or something healthy, Food Sphere has got you covered.</p>
                <p>Our mission is to connect food lovers with a wide array of culinary delights from local eateries, 
                    popular chains, and unique hidden gems. We pride ourselves on offering a seamless, user-friendly 
                    platform where you can explore diverse menus, customize your orders, and enjoy fast, reliable 
                    delivery—all with just a few clicks.</p>
                <p>At Food Sphere, we believe that great food should be accessible to everyone, anytime, anywhere. We re 
                    dedicated to providing top-notch customer service, ensuring that your meals are prepared fresh, delivered
                     promptly, and meet your expectations every time.</p>
            </div>
        </section>
        
        <p></p><br><br>
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
        </div>
    </footer>

<script src="UserPage.js"></script> 
</body>

</html>