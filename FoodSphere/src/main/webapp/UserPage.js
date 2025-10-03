    

   document.getElementById('searchButton').addEventListener('click', function () {
            const searchInput = document.getElementById('searchInput');
            searchInput.classList.toggle('open');
            searchInput.focus();
        });


    
 //   <!----Sliding Animation after restaurant name-->

   


 //   <!--carousel animation-->
    
       const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
let CurrentIndex = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${CurrentIndex * (items[0].offsetWidth + 15)}px)`;
}

rightArrow.addEventListener('click', () => {
    if (CurrentIndex < items.length - 6) {
        CurrentIndex++;
        updateCarousel();
    }
});

leftArrow.addEventListener('click', () => {
    if (CurrentIndex > 0) {
        CurrentIndex--;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

// script to store items in cart

    
    
   // <!-- js for Read more button -->

   function toggleContent() {
          var moreContent = document.querySelector('.more-content');
          var readMoreButton = document.querySelector('.btn');
          
          if (moreContent.style.display === 'none') {
              moreContent.style.display = 'grid';
              readMoreButton.textContent = 'View Less';
          } else {
              moreContent.style.display = 'none';
              readMoreButton.textContent = 'View More';
          }
      }


//<!-- Script for cart pop-up-->
 
 let cartItemCount = 0; // Initial cart count

// Function to handle Add to Cart click
function addToCart(button) {
    // Increment cart item count
    cartItemCount++;

    // Update the cart count in the header
    document.getElementById('Cart-count').innerText = cartItemCount;

    // Update the cart count in the pop-up
    document.getElementById('cartCount').innerText = cartItemCount + " item(s) in your cart";

    // Add the 'clicked' class to trigger the animations
    button.classList.add('clicked');

    // Display the cart pop-up
    document.getElementById('cartPopup').style.display = 'block';
    
    // Set timeout to remove the 'clicked' class after animation completes
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 2000);  // Match the duration of your animations (2 seconds)
}

// Function to close the pop-up
function closePopup() {
    document.getElementById('cartPopup').style.display = 'none';
}

// Function to navigate to the cart page
function goToCart() {
    window.location.href = 'Cart.jsp'; // Replace with the actual cart page URL
}


 
 
//<!--script for filter button-->
let activeItem = null;
let activeFilters = {};

// Handle carousel item selection
document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        const itemName = this.querySelector('.text-overlay p').textContent.trim();

        // Update active item
        if (activeItem === itemName) {
            // If the same item is clicked, remove it
            activeItem = null;
        } else {
            // Replace with the new item
            activeItem = itemName;
        }

        // Update carousel item styles
        document.querySelectorAll('.carousel-item').forEach(el => {
            if (el.querySelector('.text-overlay p').textContent.trim() === activeItem) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });

        console.log('Active Item:', activeItem);
        applyFilters(); // Apply filters whenever an item is selected
    });
});

// Handle filter toggling
function toggleFilter(element) {
    const filterLabel = element.querySelector('.filter-label').textContent.trim();

    // Handle Veg and Non-Veg mutual exclusion
    if (filterLabel === 'Pure Veg') {
        deselectFilter('Non-Veg');
        activeFilters[filterLabel] = 'veg';
    } else if (filterLabel === 'Non-Veg') {
        deselectFilter('Pure Veg');
        activeFilters[filterLabel] = 'nonveg';
    }

    // Handle price range mutual exclusion
    if (filterLabel === 'Less than Rs. 200') {
        deselectFilter('Rs. 200-Rs. 500');
        activeFilters[filterLabel] = 'below200';
    } else if (filterLabel === 'Rs. 200-Rs. 500') {
        deselectFilter('Less than Rs. 200');
        activeFilters[filterLabel] = '200-500';
    }

    // Toggle the selected class
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        delete activeFilters[filterLabel];
    } else {
        element.classList.add('selected');
    }

    applyFilters(); // Apply filters whenever a filter is toggled
}

// Deselect a specific filter by label text
function deselectFilter(filterLabel) {
    const filterSections = document.querySelectorAll('.filter-section');
    filterSections.forEach(section => {
        if (section.querySelector('.filter-label').textContent.trim() === filterLabel) {
            section.classList.remove('selected');
            delete activeFilters[filterLabel];
        }
    });
}

// Remove filter when close icon is clicked
function removeFilter(event, closeIcon) {
    event.stopPropagation(); // Prevent triggering the toggleFilter function
    const filterSection = closeIcon.closest('.filter-section');
    filterSection.classList.remove('selected');
    const filterLabel = filterSection.querySelector('.filter-label').textContent.trim();
    delete activeFilters[filterLabel];

    applyFilters(); // Apply filters whenever a filter is removed
}
applyFilters();

function applyFilters() {
    // Convert activeFilters to query parameters
    const params = new URLSearchParams();

    for (const filter in activeFilters) {
        if (filter === "Ratings 4.0+") {
            params.append('rating', '4');
        } else if (filter === "Pure Veg") {
            params.append('vegNonVeg', 'veg');
        } else if (filter === "Non-Veg") {
            params.append('vegNonVeg', 'nonveg');
        } else if (filter === "Rs. 200-Rs. 500") {
            params.append('priceRange', '200-500');
        } else if (filter === "Less than Rs. 200") {
            params.append('priceRange', 'below200');
        }
        // Add more conditions as needed for other filters
    }

    // Include active item if available
    if (activeItem) {
        params.append('activeItem', activeItem);
    }

    // Send the filters to the backend via XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'FilterDishes?' + params.toString(), true); // Replace with your servlet URL
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
           
            if (Array.isArray(data) && data.length > 0) {
                updateProductCards(data);
            } else {
                console.log('No dishes found.');
                document.querySelector('.product-grid').innerHTML = '<p>No dishes found.</p>';
            }
        } else {
            console.log('Failed to fetch data.');
        }
    };
    xhr.send();
}

function updateProductCards(dishes) {
    const dishesContainer = document.querySelector('.product-grid');
    const moreItemsContainer = document.querySelector('.more-content');

    dishesContainer.innerHTML = ''; // Clear existing cards in the product-grid
    moreItemsContainer.innerHTML = ''; // Clear existing cards in the more-items

    dishes.forEach((dish, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.src = dish.imageurl;
        img.alt = dish.dishname;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const restNameP = document.createElement('p');
        restNameP.className = 'restaurant-Name';
        restNameP.textContent = dish.restname;

        const dishNameH3 = document.createElement('h3');
        dishNameH3.textContent = dish.dishname;

        const descriptionP = document.createElement('p');
        descriptionP.textContent = dish.description;

        const priceDiv = document.createElement('div');
        priceDiv.className = 'price';
        priceDiv.textContent = '₹' + dish.price;

        infoDiv.appendChild(restNameP);
        infoDiv.appendChild(dishNameH3);
        infoDiv.appendChild(descriptionP);
        infoDiv.appendChild(priceDiv);

        const vegDiv = document.createElement('div');
		vegDiv.id='vegStatus';
        vegDiv.className = dish.vegOrNonveg === 'Veg' ? 'veg' : 'non-veg';
        vegDiv.textContent = dish.vegOrNonveg;
		

        const cartButton = document.createElement('button');
        cartButton.className = 'cart-button';
        cartButton.setAttribute('onclick', 'addToCart(this)');

        const addToCartSpan = document.createElement('span');
        addToCartSpan.className = 'add-to-cart';
        addToCartSpan.textContent = 'Add to cart';

        const addedSpan = document.createElement('span');
        addedSpan.className = 'added';
        addedSpan.innerHTML = '<i class="fa-solid fa-circle-check"></i> Done';

        const cartIcon = document.createElement('i');
        cartIcon.className = 'fa-solid fa-cart-shopping';

        const boxIcon = document.createElement('i');
        boxIcon.className = 'fas fa-box';

        cartButton.appendChild(addToCartSpan);
        cartButton.appendChild(addedSpan);
        cartButton.appendChild(cartIcon);
        cartButton.appendChild(boxIcon);

        card.appendChild(img);
        card.appendChild(infoDiv);
        card.appendChild(vegDiv);
        card.appendChild(cartButton);

        if (index < 8) {
            // Add to product-grid container for the first 8 items
            dishesContainer.appendChild(card);
        } else {
            // Add to more-items container for the rest
            moreItemsContainer.appendChild(card);
        }
    });
}

function addToCart(button) {
    const productCard = button.closest('.product-card');
    const restaurantName = productCard.querySelector('.restaurant-Name').textContent;
    const itemName = productCard.querySelector('h3').textContent;
    const price = parseFloat(productCard.querySelector('.price').textContent.replace('₹', ''));
    const imageUrl = productCard.querySelector('img').src;
	const vegStatus1=productCard.querySelector('#vegStatus').className;
	
	
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    cart[itemName] = {
        restaurantName: restaurantName,
        imageUrl: imageUrl,
        itemName: itemName,
        price: price,
		vegStatus:vegStatus1,
        quantity: cart[itemName] ? cart[itemName].quantity + 1 : 1
    };

    localStorage.setItem('cart', JSON.stringify(cart));
	console.log('Cart updated:', cart);
    updateCartItemCount();

    button.classList.add('clicked');
    document.getElementById('cartPopup').style.display = 'block';

    setTimeout(() => {
        button.classList.remove('clicked');
    }, 2000);
}

function updateCartItemCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('Cart-count').innerText = cartItemCount;
    document.getElementById('cartCount').innerText = cartItemCount + " item(s) in your cart";
}

function closePopup() {
    document.getElementById('cartPopup').style.display = 'none';
}

function goToCart() {
    window.location.href = 'Cart.jsp';
}


//<!--profile logo dropdown-->

    // Toggle the dropdown menu on profile logo click
document.getElementById('profile-logo').addEventListener('click', function() {
    var dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown menu if clicked outside
document.addEventListener('click', function(event) {
    var profileLogo = document.getElementById('profile-logo');
    var dropdownMenu = document.getElementById('dropdown-menu');
    if (!profileLogo.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});



//<!---script for editprofile-->

 // JavaScript to handle opening and closing of the popup

// Get the popup, button, close elements, and file input
const editProfilePopup = document.getElementById('editProfilePopup');
const editProfileBtn = document.getElementById('editProfileBtn');
const closePopup1 = document.getElementById('closebtn');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const editIcon = document.querySelector('.edit-icon'); // The edit icon
const popupProfilePhoto = document.getElementById('popupProfilePhoto');

// Show the popup when the edit profile button is clicked
editProfileBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    editProfilePopup.style.display = 'flex'; // Display popup as a flexbox to apply centering
});

// Hide the popup when the close button is clicked
closePopup1.addEventListener('click', function() {
    editProfilePopup.style.display = 'none';
});

// Close the popup if user clicks outside of the content area
window.addEventListener('click', function(event) {
    if (event.target === editProfilePopup) {
        editProfilePopup.style.display = 'none';
    }
});

// Open file input when the edit icon is clicked
editIcon.addEventListener('click', function() {
    profilePhotoInput.click(); // Trigger the file input click
});

// Handle profile photo change
profilePhotoInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Update the profile photo in the popup
            popupProfilePhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


//<!-- script for password change-->

    // Get elements
    const triggerPasswordPopup = document.getElementById("triggerPasswordPopup");
const passwordPopup = document.getElementById("passwordPopup");
const closePopup1Btn = document.querySelector(".close-popup1");
//const revealPasswordFieldsBtn = document.getElementById("revealPasswordFieldsBtn");
const newPasswordSection = document.getElementById("newPasswordSection");

// Show the popup when the link is clicked
triggerPasswordPopup.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    passwordPopup.style.display = "block";
});

// Close the popup when the 'x' is clicked
closePopup1Btn.addEventListener("click", () => {
    passwordPopup.style.display = "none";
});

// Close the popup when clicking outside the content area
window.addEventListener("click", (event) => {
    if (event.target === passwordPopup) {
        passwordPopup.style.display = "none";
    }
});

// Show password fields if the security question/answer or current password is filled
/*revealPasswordFieldsBtn.addEventListener("click", () => {
    const currentPassword = document.getElementById("currentPassword").value;
    const securityQuestion = document.getElementById("securityQuestion").value;
    const securityAnswer = document.getElementById("securityAnswer").value;
    
    // Check if either the current password is filled or both security question and answer are filled
    if (currentPassword.trim() !== "" || (securityQuestion.trim() !== "" && securityAnswer.trim() !== "")) {
        newPasswordSection.style.display = "block";
        revealPasswordFieldsBtn.style.display = "none";
    } else {
        alert("Please enter your current password or provide a security question and answer before changing the password.");
    }
});*/


//<!--script for check orders-->

    // Get the modal and button elements
const modal = document.getElementById('orderModal');
const openModalLink = document.getElementById('openModalLink');
const closeModalSpan = document.getElementsByClassName('close')[0];

// Open the modal when the link is clicked
openModalLink.onclick = function(event) {
   // event.preventDefault(); // Prevent the default link behavior
   
   displayOrders();
    document.getElementById('orderModal').style.display = "block";
}

function close()
{	document.getElementById('orderModal').style.display= "none";
}
// Close the modal when the 'x' is clicked
closeModalSpan.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if user clicks outside the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
 
        document.getElementById('contactUsBtn').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
});

    
	
	            document.getElementById('AboutUsBtn').addEventListener('click', function(event) {
	        event.preventDefault();
	        document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
	    });
	    
// image scrolling
let currentIndex = 0;

function showSlide(index) {
    const slider = document.querySelector('.slider');
    const totalSlides = document.querySelectorAll('.slider-item').length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100; // Shift slider by 100% for each slide
    slider.style.transform = `translateX(${offset}%)`; // Use backticks for template literals
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}
/*
// Star Rating System  
const stars = document.querySelectorAll('.star-rating .fa');  

stars.forEach(star => {  
    star.addEventListener('click', function() {  
        const rating = this.getAttribute('data-rating');  
        stars.forEach(s => s.classList.remove('selected'));  
        for (let i = 0; i < rating; i++) {  
            stars[i].classList.add('selected');  
        }  
    });  
});  

// Closing the modals
document.querySelectorAll('.close').forEach(closeBtn => {  
    closeBtn.addEventListener('click', () => {  
        closeFeedbackModal(); // Only close feedback modal
    });  
});  

// Send Feedback Button
document.getElementById('sendFeedbackBtn').addEventListener('click', function() {
    // Add logic to send feedback (e.g., via AJAX)
    
    // After sending feedback, close only the feedback modal
    closeFeedbackModal();
});

// Triggering the modal from Check Orders (for demonstration)
document.querySelector('.feedback-btn').addEventListener('click', function() {  
    openFeedbackModal();  
});
*/
function displayOrders() {
   
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Open a GET request to the CheckOrders servlet
    xhr.open('GET', 'CheckOrders?', true); // Make sure the URL is correct for your servlet
    
    // Define what happens when the request loads
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText); // Parse the JSON response
            
            if (Array.isArray(data) && data.length > 0) {
				
                updateOrderCards(data); // Call a function to update the HTML with order items
            } else {
                console.log('No orders found.');
                document.querySelector('.order-item').innerHTML = '<p>No orders found.</p>';
            }
        } else {
            console.log('Failed to fetch data.');
        }
    };
    
    // Send the request
    xhr.send();
}

// Function to dynamically create order cards and update the HTML
function updateOrderCards(orderItems) {
	
    const orderContainer = document.querySelector('.order-container'); // Select the container where order cards will be inserted
    
    // Clear previous orders if any, while keeping the header intact
    orderContainer.innerHTML = '<h1>Previous Orders</h1>';

    orderItems.forEach(order => {
        // Create a div for each order item
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-item'); // Add a class for styling (based on your existing CSS)

        // Construct the HTML content for each order item
        orderCard.innerHTML = `
            <img src="${order.url}" alt="${order.itemName}" class="item-image">
            <div class="item-details">
                <h2>${order.itemName}</h2>
                <p class="item-description">Delicious dish from ${order.restName}.</p>
                <p><strong>Order ID:</strong> ${order.orderId}</p>
				
                <p><strong>Price:</strong> ₹${order.price.toFixed(2)}</p>
                <p><strong>Delivery Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                <button class="feedback-btn" onclick="openFeedbackModal('${order.orderId}','${order.itemName}')">Give Feedback</button>
				${order.feedback ? `<p><strong>Feedback:</strong> ${order.feedback}</p>` : ''}
			    ${order.rating ? generateStars(order.rating) : ''}
            </div>
        `;

        // Append the created card to the container
        orderContainer.appendChild(orderCard);
    });
}


// Function to open the feedback modal (you can add the actual modal functionality later)

// feedback form
// Open the Feedback Modal
 
// Function to open the feedback modal with order details
function openFeedbackModal(orderId, itemName) {
    
    document.getElementById('feedbackModal').style.display = 'block';  
    document.getElementById('orderFeedbackFor').textContent = 'Feedback for ' + itemName;  

    // Store the orderId and itemName in a data attribute for later use
    const feedbackModal = document.getElementById('feedbackModal');
    feedbackModal.setAttribute('data-order-id', orderId);
    feedbackModal.setAttribute('data-item-name', itemName);
}

// Star rating functionality
const stars = document.querySelectorAll('.star-rating .fa');  
stars.forEach(star => {  
    star.addEventListener('click', function() {  
        const rating = this.getAttribute('data-rating');  
        stars.forEach(s => s.classList.remove('selected'));  
        for (let i = 0; i < rating; i++) {  
            stars[i].classList.add('selected');  
        }
        // Store the selected rating in the modal's data attribute
        document.getElementById('feedbackModal').setAttribute('data-rating', rating);
    });  
});  

// Close the feedback modal
function closeFeedbackModal() {  
    document.getElementById('feedbackModal').style.display = 'none';  
    document.getElementById('orderFeedbackFor').textContent = '';  // Reset the text content
}

// Handle Feedback Submission
document.getElementById('sendFeedbackBtn').addEventListener('click', function() {
    const feedbackModal = document.getElementById('feedbackModal');
    const orderId = feedbackModal.getAttribute('data-order-id'); // Get the order ID
    const itemName = feedbackModal.getAttribute('data-item-name'); // Get the item name
    const rating = feedbackModal.getAttribute('data-rating');    // Get the rating
    const feedbackText = document.querySelector('.feedback-text').value; // Get the feedback text

    if (!feedbackText.trim()) {
        console.log('Please enter your feedback.');
        return;
    }

    // AJAX call to send feedback data to the server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'SubmitFeedback', true); // URL of the server-side script
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            displayOrders();
            closeFeedbackModal(); // Close the modal after successful submission
        } else {
            alert('Failed to submit feedback. Please try again.');
        }
    };

    // Send the data to the server
    xhr.send(`orderId=${orderId}&itemName=${encodeURIComponent(itemName)}&rating=${rating}&feedback=${encodeURIComponent(feedbackText)}`);
});
function generateStars(rating) {
    let starHtml = '<div class="star-rating">';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starHtml += '<span class="fa fa-star" style="color: #f4c542;"></span>'; // Filled star with yellow color
        } else {
            starHtml += '<span class="fa fa-star" style="color: #ccc;"></span>'; // Empty star with grey color
        }
    }
    starHtml += '</div>';
    return starHtml;
}


