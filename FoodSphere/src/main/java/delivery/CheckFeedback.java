package delivery;

import java.io.IOException;
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

@WebServlet("/CheckFeedback")
public class CheckFeedback extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	System.out.println("in check feedbsck");
        String restaurantName = request.getParameter("restName");
        System.out.println(restaurantName);
        response.setContentType("application/json");
        try (Connection con = DBConnection.getCon()) {
            String query = "SELECT username, feedback, item_name, total_price, veg_or_nonveg, rating ,OrderDate FROM order_items WHERE restaurant_name = ?";
            PreparedStatement ps = con.prepareStatement(query);
            ps.setString(1, restaurantName);
            ResultSet rs = ps.executeQuery();

            List<Feedback> feedbackList = new ArrayList<>();
            while (rs.next()) {
                Feedback fb = new Feedback();
                fb.setUsername(rs.getString("username"));
                fb.setFeedback(rs.getString("feedback"));
                fb.setDishName(rs.getString("item_name"));
                fb.setPrice(rs.getDouble("total_price"));
                fb.setRating(rs.getInt("rating"));
                fb.setVegOrNonVeg(rs.getString("veg_or_nonveg"));
                fb.setOrderDate(rs.getTimestamp("OrderDate").toString());

                feedbackList.add(fb);
            }

            Gson gson = new Gson();
            String json = gson.toJson(feedbackList);
            response.getWriter().write(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public class Feedback {
        private String username;
        private String feedback;
        private String dishName;
        private double price;
        private String vegOrNonVeg;
        private String orderDate;
        private int rating;
        
		public int getRating() {
			return rating;
		}
		public void setRating(int rating) {
			this.rating = rating;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getFeedback() {
			return feedback;
		}
		public void setFeedback(String feedback) {
			this.feedback = feedback;
		}
		public String getDishName() {
			return dishName;
		}
		public void setDishName(String dishName) {
			this.dishName = dishName;
		}
		public double getPrice() {
			return price;
		}
		public void setPrice(double price) {
			this.price = price;
		}
		public String getVegOrNonVeg() {
			return vegOrNonVeg;
		}
		public void setVegOrNonVeg(String vegOrNonVeg) {
			this.vegOrNonVeg = vegOrNonVeg;
		}
		public String getOrderDate() {
			return orderDate;
		}
		public void setOrderDate(String orderDate) {
			this.orderDate = orderDate;
		}
       
        // Getters and Setters
        
    }
}

