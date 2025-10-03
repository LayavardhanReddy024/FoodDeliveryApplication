package delivery;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Map;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/PlaceOrderServlet")
public class PlaceOrderServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve the order data from the request
        String orderDataJson = request.getParameter("orderData");
        Connection con=DBConnection.getCon();
        HttpSession session = request.getSession();
        
        if (orderDataJson == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Missing order data");
            return;
        }

        // Parse the JSON order data
        Gson gson = new Gson();
        OrderData orderData = gson.fromJson(orderDataJson, OrderData.class);

        String username=(String) session.getAttribute("Username");
        String orderId = orderData.getOrderId();
        String paymentMethod = orderData.getPaymentMethod();
        String shippingAddress = orderData.getShippingAddress();
        double subtotal = orderData.getSubtotal();
        double tax=subtotal*0.1;
        double platformFee=20.0;
        double total=subtotal+tax+platformFee;
        try {
        	
        	String orderQuery = "INSERT INTO orders (order_id, Username, subtotal, tax, platform_fee, total, payment_method, shipping_address) "
                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(orderQuery);
            ps.setString(1, orderId);
            ps.setString(2, username);
            ps.setDouble(3, subtotal);
            ps.setDouble(4, tax);
            ps.setDouble(5, platformFee);
            ps.setDouble(6, total);
            ps.setString(7, paymentMethod);
            ps.setString(8, shippingAddress);
            ps.execute();
            System.out.println("orders data entered successfully");
        }
        catch (Exception e) {
			// TODO: handle exception
        	System.out.println("exception raised while updating orders data "+e);
		}
        // Parse and iterate over cart items
        Map<String, CartItem> cartItems = gson.fromJson(orderData.getCart(), new TypeToken<Map<String, CartItem>>(){}.getType());

        for (Map.Entry<String, CartItem> entry : cartItems.entrySet()) {
            String key = entry.getKey();
            CartItem item = entry.getValue();
            
            
            try {
            	String itemQuery = "INSERT INTO order_items (order_id, item_name, restaurant_name, quantity, price, total_price, image_url, veg_or_nonveg, username) "
                        + "VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
                PreparedStatement ps = con.prepareStatement(itemQuery);
                
                ps.setString(1, orderId);
                ps.setString(2, item.getItemName());
                ps.setString(3, item.getRestaurantName());
                ps.setInt(4, item.getQuantity());
                ps.setDouble(5, item.getPrice());
                ps.setDouble(6, item.getTotalPrice());
                ps.setString(7, item.getImageUrl());
                ps.setString(8, item.getVegOrNonveg());
                ps.setString(9, username);
                ps.executeUpdate();
                System.out.println("order items updated successfully...!");

            }
            catch (Exception e) {
				// TODO: handle exception
            	System.out.println("exception while updating order items...! "+e);
			}{
            	
            }
            
            // Print cart item details to the server logs
            

            // Here, you can store or process the cart items as needed
            // For example, inserting into a database
        }

        // Send a success response
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("Order placed successfully");
    }

    // Define an inner class to represent the order data structure
    private static class OrderData {
        private String orderId;
        private String payment_method;
        private String shipping_address;
        private double subtotal;
        private String cart;

        // Getters and setters
        public String getOrderId() { return orderId; }
        public void setOrderId(String orderId) { this.orderId = orderId; }
        public String getPaymentMethod() { return payment_method; }
        public void setPaymentMethod(String payment_method) { this.payment_method = payment_method; }
        public String getShippingAddress() { return shipping_address; }
        public void setShippingAddress(String shipping_address) { this.shipping_address = shipping_address; }
        public double getSubtotal() { return subtotal; }
        public void setSubtotal(double subtotal) { this.subtotal = subtotal; }
        public String getCart() { return cart; }
        public void setCart(String cart) { this.cart = cart; }
    }

    // Define an inner class to represent the cart item structure
    private static class CartItem {
        private String itemName;
        private String restaurantName;
        private int quantity;
        private double price;
        private double totalPrice;
        private String imageUrl;
        private String vegOrNonveg;

        // Getters and setters
        public String getItemName() { return itemName; }
        public void setItemName(String itemName) { this.itemName = itemName; }
        public String getRestaurantName() { return restaurantName; }
        public void setRestaurantName(String restaurantName) { this.restaurantName = restaurantName; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
        public double getTotalPrice() { return totalPrice; }
        public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getVegOrNonveg() { return vegOrNonveg; }
        public void setVegOrNonveg(String vegOrNonveg) { this.vegOrNonveg = vegOrNonveg; }
    }
}
