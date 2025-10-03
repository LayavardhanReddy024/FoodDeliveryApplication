package delivery;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Feedback class to store feedback details
class Feedback {

    private String dishName;
    private String orderDate;
    private String orderId; // Add orderId for the new data
    private int quantity;
    private double price;

    // Getters and setters for each field
   
 
	public String getDishName() {
		return dishName;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public void setDishName(String dishName) {
		this.dishName = dishName;
	}
	
	
	public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
}

@WebServlet("/fetchFeedbackData")
public class AnalysisServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            String restaurantName = (String) request.getSession().getAttribute("restName");
            if (restaurantName == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Restaurant name not found in session\"}");
                return;
            }

            conn = DBConnection.getCon();  
            String query = "SELECT " +
                           "    COUNT(DISTINCT o.Username) AS totalCustomers, " +
                           "    COUNT(o.order_id) AS totalOrders, " +
                           "    SUM(oi.total_price) AS totalIncome, " +
                           "    SUM(CASE WHEN MONTH(o.order_date) = MONTH(CURRENT_DATE()) THEN oi.total_price ELSE 0 END) AS monthIncome " +
                           "FROM orders o " +
                           "JOIN order_items oi ON o.order_id = oi.order_id " +
                           "WHERE oi.restaurant_name = ? " +
                           "AND o.order_date >= DATE_FORMAT(CURRENT_DATE(), '%Y-%m-01')";
            ps = conn.prepareStatement(query);
            ps.setString(1, restaurantName);
            rs = ps.executeQuery();

            int totalCustomers = 0;
            int totalOrders = 0;
            double totalIncome = 0.0;
            double monthIncome = 0.0;

            if (rs.next()) {
                totalCustomers = rs.getInt("totalCustomers");
                totalOrders = rs.getInt("totalOrders");
                totalIncome = rs.getDouble("totalIncome");
                monthIncome = rs.getDouble("monthIncome");
            }

            List<Feedback> feedbackList = new ArrayList<>();
            String orderDetailsQuery = "SELECT o.order_id, o.order_date, oi.item_name, oi.quantity, oi.total_price " +
                                       "FROM orders o " +
                                       "JOIN order_items oi ON o.order_id = oi.order_id " +
                                       "WHERE oi.restaurant_name = ?";
            ps = conn.prepareStatement(orderDetailsQuery);
            ps.setString(1, restaurantName);
            rs = ps.executeQuery();

            while (rs.next()) {
                Feedback fb = new Feedback();
                fb.setOrderId(rs.getString("order_id")); // Set orderId
                fb.setOrderDate(rs.getTimestamp("order_date").toString());
                fb.setDishName(rs.getString("item_name"));
                fb.setQuantity(rs.getInt("quantity"));
                fb.setPrice(rs.getDouble("total_price"));

                feedbackList.add(fb);
            }

            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("totalCustomers", totalCustomers);
            responseJson.addProperty("totalOrders", totalOrders);
            responseJson.addProperty("totalIncome", totalIncome);
            responseJson.addProperty("monthIncome", monthIncome);
            responseJson.add("orderItems", new Gson().toJsonTree(feedbackList));

            response.getWriter().write(new Gson().toJson(responseJson));

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\":\"Failed to fetch feedback data\"}");
        } finally {
            try {
                if (rs != null) rs.close();
                if (ps != null) ps.close();
                if (conn != null) conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
