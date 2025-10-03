package delivery;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/reslogin")
public class ResLogin extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String uname = request.getParameter("username");
        String password = request.getParameter("password");
        Connection con = DBConnection.getCon();
        System.out.println("hi");
        HttpSession session = request.getSession();
        
        if (con == null) {
            request.setAttribute("errorMessage", "DB Connection is null");
            request.getRequestDispatcher("ResLogin.jsp").forward(request, response);
            return;
        }

        try {
        	System.out.println("inside reslogin try");
            PreparedStatement pst = con.prepareStatement("select * from restaurantregistration where username=? and pass=?");
            pst.setString(1, uname);
            pst.setString(2, password);
            ResultSet rs = pst.executeQuery();
            System.out.println("query executed inside reslogin");

            if (rs.next()) { 
            	System.out.println("inside if of reslogin");// If there is a matching user
                List<String> restaurantData = new ArrayList<>();
                restaurantData.add(rs.getString(1)); //resaturent name
                restaurantData.add(rs.getString(2)); //user name
                restaurantData.add(rs.getString(3));  //email
                restaurantData.add(rs.getString(4)); //mobile
                restaurantData.add(rs.getString(8));  //url
                restaurantData.add(rs.getString(9));  //description
                
                System.out.println("added inside if of reslogin");
                
                session.setAttribute("restName", rs.getString(1));
                session.setAttribute("dishData", FetchData.getDishName(rs.getString(1)));
                session.setAttribute("restaurantData", restaurantData);
                session.setAttribute("successMessage", "Login successful");
                request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
            } else { // No matching user found
                request.setAttribute("errorMessage", "Invalid Login Credentials");
                request.getRequestDispatcher("ResLogin.jsp").forward(request, response);
            }
        } catch (Exception e) {
            System.out.print("error" + e);
            request.setAttribute("errorMessage", "Exception raised");
            request.getRequestDispatcher("ResLogin.jsp").forward(request, response);
        }
        
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	// TODO Auto-generated method stub
    	doGet(req, resp);
    }
}
