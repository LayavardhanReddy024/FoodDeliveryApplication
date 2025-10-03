package delivery;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.google.gson.Gson;

@WebServlet("/FilterDishes")
public class FilterDishesServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String rating = request.getParameter("rating");
        String vegNonVeg = request.getParameter("vegNonVeg");
        String priceRange = request.getParameter("priceRange");
        String activeItem = request.getParameter("activeItem");

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Dish> dishes = new ArrayList<>();

        try {
            con = DBConnection.getCon();
            StringBuilder query = new StringBuilder("SELECT * FROM dishes WHERE 1=1");

            // Add conditions based on filters
            if (rating != null && !rating.isEmpty()) {
                query.append(" AND rating >= ?");
            }
            if (vegNonVeg != null && !vegNonVeg.isEmpty()) {
                if ("veg".equalsIgnoreCase(vegNonVeg)) {
                    query.append(" AND veg_or_nonveg = 'Veg'");
                } else if ("nonveg".equalsIgnoreCase(vegNonVeg)) {
                    query.append(" AND veg_or_nonveg = 'Non-Veg'");
                }
            }
            if (priceRange != null && !priceRange.isEmpty()) {
                if ("200-500".equals(priceRange)) {
                    query.append(" AND price BETWEEN 200 AND 500");
                } else if ("below200".equals(priceRange)) {
                    query.append(" AND price < 200");
                }
            }
            if (activeItem != null && !activeItem.isEmpty()) {
                query.append(" AND category = ?");
            }

            // Prepare the statement
            ps = con.prepareStatement(query.toString());

            // Set parameters if needed
            int paramIndex = 1;
            if (rating != null && !rating.isEmpty()) {
                ps.setString(paramIndex++, rating);
            }
            if (activeItem != null && !activeItem.isEmpty()) {
                ps.setString(paramIndex++, activeItem);
            }

            rs = ps.executeQuery();

            while (rs.next()) {
                Dish dish = new Dish();
                dish.setRestname(rs.getString("restname"));
                dish.setDishname(rs.getString("dishname"));
                dish.setDescription(rs.getString("description"));
                dish.setPrice(rs.getString("price"));
                dish.setImageurl(rs.getString("imageurl"));
                dish.setVegOrNonveg(rs.getString("veg_or_nonveg"));
                dishes.add(dish);
               // System.out.println("Fetched Dish: " + dish.getDishname() + ", " + dish.getRestname());
            }

            // Send the data as JSON response
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            
            // Convert the dishes list to JSON
            Gson gson = new Gson();
            String json = gson.toJson(dishes);
            
            // Output the JSON data
            out.print(json);
            out.flush();
            
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception in fetch dish:");
        } finally {
            DBConnection.closeResources(rs, ps, con);
        }
    }
}
