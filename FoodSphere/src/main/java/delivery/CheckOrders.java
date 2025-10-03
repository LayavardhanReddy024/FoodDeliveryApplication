package delivery;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/CheckOrders")
public class CheckOrders extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        System.out.println("In CheckOrders servlet");

        try {
            // Establish database connection
            Connection con = DBConnection.getCon();
            
            // Prepare the SQL statement to retrieve order items based on the session's username
            PreparedStatement ps = con.prepareStatement("SELECT * FROM order_items WHERE username=?");
            ps.setString(1, (String) request.getSession().getAttribute("Username")); // Get the username from the session
            ResultSet rs = ps.executeQuery();
            
            // Create a list to hold the order items
            List<OrderItems> orderItems = new ArrayList<>();
            
            // Iterate over the result set and populate the OrderItems list
            while (rs.next()) {
                OrderItems item = new OrderItems();
                item.setOrderId(rs.getString("order_id"));
                item.setItemName(rs.getString("item_name"));
                item.setRestName(rs.getString("restaurant_name"));
                item.setCount(rs.getInt("quantity"));
                item.setPrice(rs.getFloat("price"));
                item.setUrl(rs.getString("image_url"));
                item.setDate(rs.getTimestamp("OrderDate").toString());
                item.setFeedback(rs.getString("feedback"));
                item.setRating(rs.getInt("rating"));
                
                orderItems.add(item); // Add each item to the list
            }

            // Send the data as JSON response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            
            // Convert the orderItems list to JSON
            Gson gson = new Gson();
            String json = gson.toJson(orderItems);
            
            // Output the JSON data
            out.print(json);
            out.flush();
            
        } catch (Exception e) {
            // Handle the exception and send an error response
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error retrieving order items");
        }
    }

    // Inner class representing the OrderItems
    public static class OrderItems {
        private String itemName;
        private String restName;
        private String orderId;
        private String url;
        private int count;
        private float price;
        private String date;
        private String feedback;
        private int rating;
        // Getters and Setters for the fields
        public String getItemName() {
            return itemName;
        }

        public void setItemName(String itemName) {
            this.itemName = itemName;
        }

        public String getRestName() {
            return restName;
        }

        public void setRestName(String restName) {
            this.restName = restName;
        }

        public String getOrderId() {
            return orderId;
        }

        public void setOrderId(String orderId) {
            this.orderId = orderId;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public float getPrice() {
            return price;
        }

        public void setPrice(float price) {
            this.price = price;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

		public String getFeedback() {
			return feedback;
		}

		public void setFeedback(String feedback) {
			this.feedback = feedback;
		}

		public int getRating() {
			return rating;
		}

		public void setRating(int i) {
			this.rating = i;
		}
    }
}
