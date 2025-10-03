/**
 * 
 */
 
            document.getElementById('contactUsBtn').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' });
        });
    
        
      
        // Toggle sidebar when profile logo is clicked
        document.getElementById('profile-logo').addEventListener('click', function(event) {
            document.getElementById('sidebar').classList.toggle('active');
            event.stopPropagation();  // Prevent click event from propagating to the body
        });
    
        // Close the sidebar if clicking outside of it
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('sidebar');
            const profileLogo = document.getElementById('profile-logo');
    
            // Check if the click happened outside the sidebar and profile logo
            if (!sidebar.contains(event.target) && !profileLogo.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });
    
    
    
       // Get all modal buttons
// Get all items that can trigger a modal
var items = document.querySelectorAll('.item');

// Iterate over each item and add click event listeners
items.forEach(function(item) {
    item.addEventListener('click', function() {
        var modalId = this.getAttribute('data-modal');
        var modal = document.getElementById(modalId);
        modal.style.display = "block";
    });
});

// Get all elements that close the modal
var closeButtons = document.querySelectorAll('.close-button');

// Add click event to close the modal
closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var modal = button.closest('.modal');
        modal.style.display = "none";
    });
});

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}


        

    
       document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        const modal = document.getElementById(this.getAttribute('data-modal'));
        if (modal) {
            modal.style.display = "block";
        }
    });
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = "none";
    });
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
};

document.querySelector('[data-modal="item4Modal"]').addEventListener('click', function() {
    const extraContent = document.getElementById('extra-content');
    if (extraContent.style.display === 'flex') {
        extraContent.style.display = 'none';
    } else {
        extraContent.style.display = 'flex';
    }
});


    
    // Get elements
    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfilePopup = document.getElementById("editProfilePopup");
    const closePopup = document.getElementById("closePopup");
    const sidebarProfilePhoto = document.getElementById("sidebarProfilePhoto");
    const popupProfilePhoto = document.getElementById("popupProfilePhoto");
    const profilePhotoInput = document.getElementById("profilePhotoInput");
    const editIcons = document.querySelectorAll('.edit-icon'); // Select all edit icons
    
    // Open popup on Edit Profile click
    editProfileBtn.addEventListener("click", () => {
        // Sync the popup profile photo with the current sidebar profile photo
        popupProfilePhoto.src = sidebarProfilePhoto.src;
        editProfilePopup.style.display = "block";
    });
    
    // Close popup on close button click
    closePopup.addEventListener("click", () => {
        editProfilePopup.style.display = "none";
    });
    
    // Close popup on outside click
    window.addEventListener("click", (event) => {
        if (event.target === editProfilePopup) {
            editProfilePopup.style.display = "none";
        }
    });
    
    // Open file dialog on photo or edit icon click
    function triggerFileInput() {
        profilePhotoInput.click();
    }
    
    popupProfilePhoto.addEventListener("click", triggerFileInput);
    editIcons.forEach(icon => {
        icon.addEventListener("click", triggerFileInput);
    });
    
    // Change profile photo
    profilePhotoInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Update both the popup and sidebar photos
                popupProfilePhoto.src = e.target.result;
                sidebarProfilePhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });



		    // Get elements
		    const triggerPasswordPopup = document.getElementById("triggerPasswordPopup");
		const passwordPopup = document.getElementById("passwordPopup");
		const closePopup1Btn = document.querySelector(".close-popup1");
		const revealPasswordFieldsBtn = document.getElementById("revealPasswordFieldsBtn");
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
		revealPasswordFieldsBtn.addEventListener("click", () => {
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
		});




    // Example script to handle form submission
    
    document.getElementById('updateDishForm').addEventListener('reset', function() {
        document.getElementById('updateDishForm').reset();
    });



    const updateFieldSelect = document.getElementById('updateFieldSelect');
    const newValueGroup = document.getElementById('newValueGroup');
    const newValueInput = document.getElementById('newValue');
    const categorySelectGroup = document.getElementById('categorySelectGroup');
    const vegStatusGroup = document.getElementById('vegStatusGroup');

    updateFieldSelect.addEventListener('change', function () {
        // Hide all dynamic input fields
        newValueGroup.classList.add('hidden');
        newValueInput.removeAttribute('required');
        categorySelectGroup.classList.add('hidden');
        vegStatusGroup.classList.add('hidden');

        const selectedField = updateFieldSelect.value;

        if (selectedField === 'price') {
            newValueGroup.classList.remove('hidden');
            newValueInput.type = 'number';
            newValueInput.placeholder = 'Enter new price';
            newValueInput.setAttribute('required', 'true');
        } else if (selectedField === 'description') {
            newValueGroup.classList.remove('hidden');
            newValueInput.type = 'text';
            newValueInput.placeholder = 'Enter new description';
            newValueInput.setAttribute('required', 'true');
        } else if (selectedField === 'dishname') {
            newValueGroup.classList.remove('hidden');
            newValueInput.type = 'text';
            newValueInput.placeholder = 'Enter new name';
            newValueInput.setAttribute('required', 'true');
        } else if (selectedField === 'availstatus') {
            newValueGroup.classList.remove('hidden');
            newValueInput.type = 'text';
            newValueInput.placeholder = 'Enter new availability status';
            newValueInput.setAttribute('required', 'true');
        } else if (selectedField === 'imageurl') {
            newValueGroup.classList.remove('hidden');
            newValueInput.type = 'text';
            newValueInput.placeholder = 'Enter new image URL';
            newValueInput.setAttribute('required', 'true');
        } else if (selectedField === 'category') {
            categorySelectGroup.classList.remove('hidden');
        } else if (selectedField === 'veg_or_nonveg') {
            vegStatusGroup.classList.remove('hidden');
        }
    });

    document.getElementById('removeDishForm').addEventListener('submit', function(event) {
        if (!confirm('Are you sure you want to remove this dish? This action cannot be undone.')) {
            event.preventDefault();
        }
    });


    // Example data, replace with actual data fetched from your backend
    const reportData = {
        totalOrders: 56,
        monthIncome: 1345.67,
        totalIncome: 8903.45,
        totalCustomers: 120,
        previousOrders: [
            { id: 1, date: '2024-08-01', dishName: 'Pasta', quantity: 2, totalPrice: 19.99 },
            { id: 2, date: '2024-08-03', dishName: 'Pizza', quantity: 1, totalPrice: 12.99 },
            { id: 3, date: '2024-08-05', dishName: 'Salad', quantity: 3, totalPrice: 21.50 },
            // Add more orders as needed
        ]
    };

    document.getElementById('totalOrders').textContent = reportData.totalOrders;
    document.getElementById('monthIncome').textContent = `$${reportData.monthIncome.toFixed(2)}`;
    document.getElementById('totalIncome').textContent = `$${reportData.totalIncome.toFixed(2)}`;
    document.getElementById('totalCustomers').textContent = reportData.totalCustomers;

    const orderTableBody = document.getElementById('orderTableBody');
    const noOrdersMessage = document.getElementById('noOrdersMessage');

    if (reportData.previousOrders.length > 0) {
        noOrdersMessage.style.display = 'none';

        reportData.previousOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.dishName}</td>
                <td>${order.quantity}</td>
                <td>$${order.totalPrice.toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
        });
    } else {
        noOrdersMessage.style.display = 'block';
    }



    function saveScrollPosition() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    }

    function yourSubmitFunction() {
        saveScrollPosition();
        // Simulate a redirect (e.g., form submission or window.location.href change)
      
    }
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
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

function openFeedbackModal(restaurantName) {
    // Show the modal
	
    document.querySelector('.modal-content2').style.display = 'block';

    // Send AJAX request to fetch feedback data for the restaurant
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `CheckFeedback?restName=${encodeURIComponent(restaurantName)}`, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const feedbackData = JSON.parse(xhr.responseText);
            const feedbackContainer = document.querySelector('.feedback-container');

            // Clear existing feedback
            feedbackContainer.innerHTML = `<h2>Customer Feedback</h2>`;

            // Populate feedback cards
            feedbackData.forEach(feedback => {
				console.log(feedback);
                let ratingStars = generateStars(feedback.rating); // Assuming rating is a part of feedback

                const feedbackCard = `
                    <div class="feedback-card">
                        <h3>${feedback.username}</h3>
                        <p>"${feedback.feedback}"</p>
                        <div class="dish-name">Dish: ${feedback.dishName}</div>
                        <div class="rating">Rating: ${ratingStars}</div>
                        <div class="timestamp">${new Date(feedback.orderDate).toLocaleDateString()}</div>
                    </div>
                `;

                feedbackContainer.innerHTML += feedbackCard;
            });
        } else {
            console.error('Error fetching feedback');
        }
    };
    xhr.send();
}

// Function to generate rating stars
function generateStars(rating) {
	console.log(rating);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        // Check if the current star index is less than or equal to the rating
        if (i <= rating) {
            stars += '<span class="fa fa-star star-colored" style="color: #f4c542;"></span>'; // Filled star
        } else {
            stars += '<span class="fa fa-star" style="color: #ccc;"></span>'; // Empty star
        }
    }
    return stars;
}


// Close feedback modal
function closeFeedbackModal() {
    document.querySelector('.modal-content2').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';

        // Function to fetch order data
        function fetchOrderData() {
           
            fetch('/fetchFeedbackData')  // The path to your servlet
                .then(response => response.json())
                .then(data => {
                    // Elements to update
                    const totalOrdersElement = document.getElementById('totalOrders');
                    const monthIncomeElement = document.getElementById('monthIncome');
                    const totalIncomeElement = document.getElementById('totalIncome');
                    const totalCustomersElement = document.getElementById('totalCustomers');
                    const orderTableBody = document.getElementById('orderTableBody');
                    const noOrdersMessage = document.getElementById('noOrdersMessage');

                    // Update total orders and income
                    totalOrdersElement.textContent = data.totalOrders || 0;
                    totalIncomeElement.textContent = `$${data.totalIncome || 0}`;

                    // Update order items table
                    if (data.orderItems.length > 0) {
                        noOrdersMessage.style.display = 'none';  // Hide "no orders" message
                        orderTableBody.innerHTML = '';  // Clear existing table rows

                        // Loop through order items and populate the table
                        data.orderItems.forEach(item => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${item.orderId}</td>
                                <td>${item.orderDate}</td>
                                <td>${item.itemName}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.totalPrice}</td>
                            `;
                            orderTableBody.appendChild(row);
                        });
                    } else {
                        noOrdersMessage.style.display = 'block';  // Show "no orders" message if no data
                    }
                })
                .catch(error => {
                    console.error('Error fetching order data:', error);
                });
        }

        // Close the modal when the close button is clicked
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Close the modal when clicking outside of the modal content
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Fetch data when modal is opened
        fetchOrderData();
    }

    // Add event listener to "View Analysis" button
    document.querySelector('.item[data-modal="item5Modal"]').addEventListener('click', function () {
        openModal('item5Modal');
    });
});

    // Function to fetch and update the data for the restaurant report
    function updateAnalysis() {
        // Show an alert to debug
        

        fetch('fetchFeedbackData')  // Adjust this path to your actual servlet URL
            .then(response => response.json())
            .then(data => {
                // Elements to update
                const totalOrdersElement = document.getElementById('totalOrders');
                const monthIncomeElement = document.getElementById('monthIncome');
                const totalIncomeElement = document.getElementById('totalIncome');
                const totalCustomersElement = document.getElementById('totalCustomers');
                const orderTableBody = document.getElementById('orderTableBody');
                const noOrdersMessage = document.getElementById('noOrdersMessage');

                // Sample data format received (adjust based on your backend structure):
                // {
                //   totalOrders: 10,
                //   monthIncome: 500,
                //   totalIncome: 1000,
                //   totalCustomers: 50,
                //   orderItems: [
                //     { orderId: '123', orderDate: '2023-09-10', itemName: 'Pizza', quantity: 2, totalPrice: 20.00 },
                //     { orderId: '124', orderDate: '2023-09-12', itemName: 'Burger', quantity: 1, totalPrice: 10.00 }
                //   ]
                // }

                // Update total orders, income, and customers
                totalOrdersElement.textContent = data.totalOrders || 0;
                monthIncomeElement.textContent = `₹${data.monthIncome || 0}`;
                totalIncomeElement.textContent = `₹${data.totalIncome || 0}`;
                totalCustomersElement.textContent = data.totalCustomers || 0;

                // Update order items table
                if (data.orderItems && data.orderItems.length > 0) {
                    noOrdersMessage.style.display = 'none';  // Hide "no orders" message
                    orderTableBody.innerHTML = '';  // Clear existing table rows

                    // Loop through order items and populate the table
                    data.orderItems.forEach(item => {
						console.log(item)
                        const row = document.createElement('tr');
                        row.innerHTML = `
						
                            <td>${item.orderId}</td>
                            <td>${item.orderDate}</td>
                            <td>${item.dishName}</td>
                            <td>${item.quantity}</td>
                            <td>₹${item.price}</td>
                        `;
                        orderTableBody.appendChild(row);
                    });
                } else {
                    noOrdersMessage.style.display = 'block';  // Show "no orders" message if no data
                }
            })
            .catch(error => {
                console.error('Error fetching order data:', error);
            });
    }

    // Attach the event listener for the modal open event to trigger fetching the data
   

    

