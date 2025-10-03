package delivery;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

@WebServlet("/getAddresses")
public class AddressServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
        response.setContentType("application/json");

        
       System.out.println("inside in the get address servlet");
        HttpSession session=request.getSession();
        String username=(String)session.getAttribute("Username");

        Connection con = null;
        PreparedStatement pst = null;
        ResultSet rs = null;
        List<Addrress> addresses = new ArrayList<>();
        try {
        	
            // Database connection setup
           
            con = DBConnection.getCon();

            // Query the database
            pst = con.prepareStatement("SELECT * FROM address where username=?");
            pst.setString(1, username);
            rs = pst.executeQuery();

            // Convert result set to JSON
            
      
            while (rs.next()) {
              Addrress  a = new Addrress();
                    a.setUname(rs.getString("Uname"));
                    a.setPhone(rs.getString("phone"));
                    a.setAltPhone(rs.getString("altPhone"));
                    a.setAddress(rs.getString("address"));
                    a.setLocality(rs.getString("locality"));
                    a.setLandmark(rs.getString("landmark"));
                   a.setPincode(rs.getString("pincode"));
                    a.setCity(rs.getString("city"));
                    a.setState(rs.getString("state"));
                    addresses.add(a);
                    System.out.println("Fetched names in database:"+a.getUname());
                    
               
            }
           
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();
            
            // Output JSON
            Gson gson = new Gson();
            String json = gson.toJson(addresses);
            out.print(json);
            out.flush();
            
          

            
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("exception raised at adding address "+e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        
        
    }

}