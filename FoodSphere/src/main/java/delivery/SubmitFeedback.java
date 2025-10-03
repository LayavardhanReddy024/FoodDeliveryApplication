package delivery;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/SubmitFeedback")
public class SubmitFeedback extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	System.out.println("in feedback submit");
        String orderId = request.getParameter("orderId");
        String itemName = request.getParameter("itemName");  // Get the item name
        String rating = request.getParameter("rating");
        String feedback = request.getParameter("feedback");

        try {
            Connection con = DBConnection.getCon();
            PreparedStatement ps = con.prepareStatement("UPDATE order_items SET feedback = ?, rating = ? WHERE order_id = ? AND item_name = ?");
            ps.setString(1, feedback);
            ps.setInt(2, Integer.parseInt(rating));
            ps.setString(3, orderId);
            ps.setString(4, itemName);  // Bind item name to the query

            int result = ps.executeUpdate();

            if (result > 0) {
                response.setStatus(HttpServletResponse.SC_OK); // Feedback updated successfully
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Feedback submission failed
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // Handle errors
        }
    }
}

