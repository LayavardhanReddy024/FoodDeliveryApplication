package delivery;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;


@WebServlet("/AddDish")
public class AddDish extends HttpServlet {
    private static final long serialVersionUID = 1L;

    // SQL query to insert data into the dishes table
    private static final String INSERT_DISH_SQL = "INSERT INTO dishes (restname, dishname, description, price, category, veg_or_nonveg, availstatus, imageurl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Retrieve form data
    	HttpSession session=request.getSession();
    	System.out.println("servlets called!.. ");
        String restname = (String)session.getAttribute("restName"); // You may want to adjust this to get the actual restaurant name if it's dynamic
        String dishname = request.getParameter("dishname");
        String description = request.getParameter("description");
        String price = request.getParameter("price");
        String category = request.getParameter("category");
        String vegOrNonveg = request.getParameter("veg_nonveg");
        boolean availstatus = request.getParameter("availstatus") != null;
        String imageurl = request.getParameter("imageurl");

        // Establish database connection
        try (Connection connection = DBConnection.getCon();
             PreparedStatement preparedStatement = connection.prepareStatement(INSERT_DISH_SQL)) {
        	
            // Set parameters for the SQL query
            preparedStatement.setString(1, restname);
            preparedStatement.setString(2, dishname);
            preparedStatement.setString(3, description);
            preparedStatement.setString(4, price);
            preparedStatement.setString(5, category);
            preparedStatement.setString(6, vegOrNonveg);
            preparedStatement.setBoolean(7, availstatus);
            preparedStatement.setString(8, imageurl);
            
            // Execute the query
            int result = preparedStatement.executeUpdate();
            
            //fetch dish data//
            session.setAttribute("dishData", FetchData.getDishName((String)session.getAttribute("restName")));
            // Check if the insertion was successful
            if (result > 0) {
            	session.setAttribute("successMessage", "dish added successfully..!");
                request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
            } else {
            	session.setAttribute("errorMessage", "dish not be added!..");
                request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
            }
        } catch (SQLException e) {
        	session.setAttribute("errorMessage", "Databse excaption raised!..");
            request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
        }
    }
}
