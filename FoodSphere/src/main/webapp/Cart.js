// Script For Cart

/*document.querySelector('.previous-btn').addEventListener('click', function() {
    window.location.href = 'UserPage.jsp'; // Replace with the actual URL of your user page
});
 */
let selectedAddress = "address not fetched";
function fetchAddresses() {
	
    const xhr = new XMLHttpRequest();
  xhr.open('GET', 'getAddresses', true); // Replace with your actual API URL
    xhr.onload = function() {
        if (xhr.status === 200) {
			
            const data = JSON.parse(xhr.responseText);
            if (Array.isArray(data) && data.length > 0) {
                updateAddressList(data);
            } else {
                document.querySelector('.address-card').innerHTML = '<p>No addresses found.</p>';
            }
        } else {
            
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send();
}

// Update the saved addresses section
function updateAddressList(addresses) {
	
    const addressContainer = document.querySelector('.saved-addresses');
    addressContainer.innerHTML = ''; // Clear existing addresses

    // Add a heading for the address section
    const heading = document.createElement('h2');
    heading.textContent = 'Select Delivery Address';
    addressContainer.appendChild(heading);

    // Iterate through addresses and create the address cards
    addresses.forEach((address, index) => {
        const addressCard = document.createElement('label');
        addressCard.className = 'address-card';

        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'address';
        radioInput.className = 'radio-btn';
        radioInput.value = index;

        const addressDetails = document.createElement('div');
        addressDetails.className = 'address-details';

        const fullNameP = document.createElement('p');
        fullNameP.className = 'address-fullname';
        fullNameP.innerHTML = `<strong>Name:</strong> ${address.Uname}`;

        const phoneP = document.createElement('p');
        phoneP.className = 'address-phone';
        phoneP.innerHTML = `<strong>Phone:</strong> ${address.phone}`;

        const addressP = document.createElement('p');
        addressP.className = 'address-address';
        addressP.innerHTML = `<strong>Address:</strong> ${address.address}, ${address.locality}`;

        const cityStatePincodeP = document.createElement('p');
        cityStatePincodeP.innerHTML = `<strong>City:</strong> ${address.city}, <strong>State:</strong> ${address.state}, <strong>Pincode:</strong> ${address.pincode}`;

        addressDetails.appendChild(fullNameP);
        addressDetails.appendChild(phoneP);
        addressDetails.appendChild(addressP);
        addressDetails.appendChild(cityStatePincodeP);

        addressCard.appendChild(radioInput);
        addressCard.appendChild(addressDetails);

        addressContainer.appendChild(addressCard);
    });

    // Add "+ Add New Address" button
    const addNewAddressDiv = document.createElement('div');
    addNewAddressDiv.className = 'add-new-address-text';
    const addNewAddressText = document.createElement('p');
    addNewAddressText.id = 'show-new-address-form';
    addNewAddressText.style.cursor = 'pointer';
    addNewAddressText.style.color = '#2874f0';
    addNewAddressText.textContent = '+ Add New Address';
    addNewAddressDiv.appendChild(addNewAddressText);
    addressContainer.appendChild(addNewAddressDiv);

    // Add "Confirm Address" button
    const formGroupDiv = document.createElement('div');
    formGroupDiv.className = 'form-group';
    const confirmButton = document.createElement('button');
    confirmButton.type = 'submit';
    confirmButton.className = 'save-btn';
    confirmButton.id = 'confirm-address-btn';
    confirmButton.textContent = 'Confirm Address';
    formGroupDiv.appendChild(confirmButton);
    addressContainer.appendChild(formGroupDiv);

    
   

    // Event listener to show the new address form
    document.getElementById('show-new-address-form').addEventListener('click', function() {
        document.getElementById('new-address-form').style.display = 'block';
        document.querySelector('.saved-addresses').style.display = 'none';
    });

    // Event listener to confirm address selection
    document.getElementById('confirm-address-btn').addEventListener('click', function(event) {
        event.preventDefault();
        const AddressSelected = document.querySelector('input[name="address"]:checked');
        if (AddressSelected) {
            const selectedAddressDetails = addresses[AddressSelected.value];
			 selectedAddress = Object.entries(selectedAddressDetails)
			    .map(([key, value]) => `${key}: ${value}`)
			    .join(", ");

			
            console.log('Selected address:', selectedAddress);
			
            document.querySelector('.address-management').style.display = 'none';
            document.querySelector('#payment-container').style.display = 'block';
            
        } else {
            alert('Please select an address.');
        }
    });

    // Event listener for the "Go Back" button to hide the new address form
    
}
document.addEventListener('DOMContentLoaded', function() {
	
    fetchAddresses();
});

 
// Script for Cart Container
let subtotal=0;
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {}; // Load cart from local storage

    const cartContainer = document.querySelector('.cart-container');
    const subtotalElement = document.querySelector('.subtotal span:last-child');
    const taxElement = document.querySelector('.tax span:last-child');
    const platformFeeElement = document.querySelector('.platformFee span:last-child');
    const totalElement = document.querySelector('.total span:last-child');
    const checkoutButton = document.querySelector('.checkout-button');
    const taxRate = 0.1; // Assuming 10% tax rate

    // Function to update the cart container with items from the cart dictionary
    function updateCartContainer() {
        cartContainer.innerHTML = ''; // Clear the cart container

         subtotal = 0;
        for (let item in cart) {
            const cartItem = cart[item];
            const itemTotalPrice = cartItem.price * cartItem.quantity;
            subtotal += itemTotalPrice;
			
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${cartItem.imageUrl}" alt="${cartItem.itemName}" class="product-image">
                    <div class="product-details">
                         <p class="resturant-Name">${cartItem.restaurantName}
                        <h3>${cartItem.itemName}</h3>
                        <h3 style="margin-top:10px">price:₹${cartItem.price}<h3></p>
                       
                    </div>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-item="${item}">-</button>
                        <input type="text" value="${cartItem.quantity}" class="quantity" readonly>
                        <button class="increase-quantity" data-item="${item}">+</button>
                    </div>
                    <div class="item-price">
                        ₹${itemTotalPrice.toFixed(2)}
                    </div>
                    <button class="remove-item" data-item="${item}">❌</button>
                </div>
            `;
        }

        updateCart(subtotal);

        // Attach event listeners to the quantity controls and remove buttons
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        const removeButtons = document.querySelectorAll('.remove-item');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.dataset.item;
                if (cart[itemName].quantity > 1) {
                    cart[itemName].quantity -= 1;
                } else {
                    delete cart[itemName];
                }
                localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                updateCartContainer(); // Update cart container
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.dataset.item;
                cart[itemName].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                updateCartContainer(); // Update cart container
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.dataset.item;
                delete cart[itemName];
                localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                updateCartContainer(); // Update cart container
            });
        });
    }

    // Function to update cart calculations
    function updateCart(subtotal) {
        let platformFee = subtotal > 0 ? 20 : 0;
        const tax = subtotal * taxRate;
        const total = subtotal + tax + platformFee;

        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        platformFeeElement.textContent = `₹${platformFee.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }

    // Event listener for the checkout button
    checkoutButton.addEventListener('click', function() {
        // Hide the cart container and the fixed-bottom-container
        cartContainer.style.display = 'none';
        document.querySelector('.fixed-bottom-container').style.display = 'none';
       // document.querySelector('.previous-arrow').style.display = 'none';
        
        // Display the address management container
        document.querySelector('.address-management').style.display = 'block';
    });

    // Ensure the address-management container is initially hidden
    document.querySelector('.address-management').style.display = 'none';

    updateCartContainer(); // Initial load of cart items
});




//  Script for Address Container
        
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-container ');
    const fixedContainer = document.querySelector('.fixed-bottom-container');
    const addressManagement = document.querySelector('.address-management');
    const savedAddresses = document.querySelector('.saved-addresses');
    const newAddressForm = document.getElementById('new-address-form');
    const paymentContainer = document.querySelector('#payment-container');
    const checkoutButton = document.querySelector('.checkout-button');
    const confirmSavedAddressButton = document.querySelector('.saved-addresses .save-btn'); // Saved addresses "Confirm Address"
    const confirmNewAddressButton = document.querySelector('.add-new-address .save-btn'); // New address "Confirm Address"

    // Show the new address form and hide saved addresses when clicking "+ Add New Address"
    document.getElementById('show-new-address-form').addEventListener('click', function() {
        newAddressForm.style.display = 'block';
        savedAddresses.style.display = 'none';
    });

    // Confirm and proceed with a saved address
    confirmSavedAddressButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission if button is inside a form
        const selectedAddress = savedAddresses.querySelector('input[type="radio"]:checked');
        if (selectedAddress) {
            // Hide the address management container
            addressManagement.style.display = 'none';
            // Show the payment container
            paymentContainer.style.display = 'block';
        } else {
            alert("Please select a saved address before confirming.");
        }
    });

    // Handle form submission from the new address form
    confirmNewAddressButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        // Assuming form validation has been done at this point
        if (validateNewAddressForm()) {
            // Hide the new address form and show payment container
            addressManagement.style.display = 'none';
            paymentContainer.style.display = 'block';
        } else {
            alert("Please fill out all required fields.");
        }
    });

    // Helper function to validate new address form
    function validateNewAddressForm() {
        const requiredFields = newAddressForm.querySelectorAll('input[required], textarea[required]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                return false;
            }
        }
        return true;
    }

    // Add a "Go Back" button in the new address form
    const goBackButtonInForm = document.createElement('button');
    goBackButtonInForm.textContent = 'Go Back';
    goBackButtonInForm.type = 'button';
    goBackButtonInForm.className = 'go-back-btn';
    newAddressForm.appendChild(goBackButtonInForm);

    // Add a "Go Back" button in the saved addresses section
    const goBackButtonInSavedAddresses = document.createElement('button');
    goBackButtonInSavedAddresses.textContent = 'Go Back';
    goBackButtonInSavedAddresses.type = 'button';
    goBackButtonInSavedAddresses.className = 'go-back-btn';
    savedAddresses.appendChild(goBackButtonInSavedAddresses);

    // Go back to the saved addresses when clicking "Go Back" in the new address form
    goBackButtonInForm.addEventListener('click', function() {
        newAddressForm.style.display = 'none';
        savedAddresses.style.display = 'block';
    });

    // Go back to the cart container when clicking "Go Back" in the saved addresses section
    goBackButtonInSavedAddresses.addEventListener('click', function() {
        addressManagement.style.display = 'none';
        cartContainer.style.display = 'block';
        fixedContainer.style.display = 'block';
        document.querySelector('.previous-arrow').style.display = 'block';
    });

    // Handle checkout button click (previous functionality)
    checkoutButton.addEventListener('click', function() {
        cartContainer.style.display = 'none';
        addressManagement.style.display = 'block';
    });

    // Ensure the containers are initially hidden as needed
    addressManagement.style.display = 'none';
    paymentContainer.style.display = 'none';
});


// Script for Payment Container & confirmation-container
const orderId=0;
document.querySelector('.continue-btn').addEventListener('click', function() {
	
	showConfirmation(orderId);
    // Hide the payment container
    document.querySelector('#payment-container').style.display = 'none';
    
    // Show the confirmation container
    document.querySelector('#confirmation-container').style.display = 'block';

    // Trigger confetti fireworks
    const duration = 5 * 1000; // Duration of confetti in milliseconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval); // Stop the interval when the duration ends
            return;
        }

        const particleCount = 50 * (timeLeft / duration);
       
    }, 250);
});

function placeOrder(event) {
	const orderId = generateOrderId();
	console.log(orderId)

  // Check if the address has been selected
  if (selectedAddress === "address not fetched") {
    alert("Please select an address before placing the order.");
    return;
  }

  
  const cart = JSON.parse(localStorage.getItem('cart'));

  let subtotal = 0;
  const cartItems = {};

  for (let item in cart) {
    const cartItem = cart[item];
    const itemTotalPrice = cartItem.price * cartItem.quantity;
    subtotal += itemTotalPrice;

    cartItems[item] = {
      itemName: cartItem.itemName,
      restaurantName: cartItem.restaurantName,
      quantity: cartItem.quantity,
      price: cartItem.price,
      totalPrice: itemTotalPrice.toFixed(2),
      imageUrl: cartItem.imageUrl,
      vegOrNonveg: cartItem.vegStatus
	  
    };
  }

  const paymentMethod = document.querySelector("input[name='payment']:checked").value;

  const orderData = {
    orderId: orderId,
    payment_method: paymentMethod,
    shipping_address: selectedAddress,
    subtotal: subtotal,
    cart: JSON.stringify(cartItems)
  };

  console.log("Order Data:", orderData);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "PlaceOrderServlet", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log("Server Response:", xhr.responseText);

      if (xhr.status === 200) {
		
		let cart = {};
		localStorage.setItem('cart', JSON.stringify(cart));

        
      } else {
        alert("Failed to place the order. Please try again.");
      }
    }
  };


  xhr.send(`orderData=${encodeURIComponent(JSON.stringify(orderData))}`);
}

	//generate order id
function generateOrderId(length = 8) {
	    // Characters to use for generating the order ID
	    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    let orderId = '';

	    // Generate a random order ID
	    for (let i = 0; i < length; i++) {
	        const randomIndex = Math.floor(Math.random() * characters.length);
	        orderId += characters[randomIndex];
	    }
		

	    return orderId;
	}
	
	function showConfirmation(orderId) {
	    // Get the current date and time
		
	    const currentDate = new Date();
	    
	    // Set the order ID
	    document.getElementById('order-id').textContent = `#${orderId}`;

	    // Format the current date as "24th August 2024"
	    const options = { day: 'numeric', month: 'long', year: 'numeric' };
	    const estimatedDeliveryDate = currentDate.toLocaleDateString('en-GB', options);
	    document.getElementById('delivery-date').textContent = estimatedDeliveryDate;

	    // Add 15 minutes to the current time for the delivery time
	    currentDate.setMinutes(currentDate.getMinutes() + 15);
	    const estimatedDeliveryTime = currentDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
	    document.getElementById('delivery-time').textContent = estimatedDeliveryTime;

	    // Display the confirmation container
	    
	}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addressForm');

	form.addEventListener('submit', async (event) => {
	    event.preventDefault(); // Prevent the default form submission
        // Create a FormData object from the form
        const formData = new FormData(form);
       console.log('form data ',formData)
        // Convert FormData to a plain object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            // Send the form data via POST request
            const response = await fetch('/FoodSphere/Add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Check if the request was successful
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
				
                // You can handle the response here, e.g., show a success message
            } else {
                console.error('Error:', response.statusText);
                // Handle errors here, e.g., show an error message
            }
        } catch (error) {
            console.error('Request failed', error);
            // Handle network errors or other issues here
        }
		document.getElementById('new-address-form').style.display = 'none';
	    document.querySelector('.saved-addresses').style.display = 'block';
		fetchAddresses();
    });
});


