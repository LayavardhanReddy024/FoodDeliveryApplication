package delivery;
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
@WebServlet("/UserLogin")
public class UserLogin extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException
	{
		String uname=request.getParameter("username");
		String password=request.getParameter("password");
		Connection con=DBConnection.getCon();
		HttpSession session = request.getSession();
        
		if(con==null)
		{
			request.setAttribute("errorMessage","DB Connection is null");
			request.getRequestDispatcher("UserLogin.jsp").forward(request,response);
		}
		try
		{
		PreparedStatement pst=con.prepareStatement("select * from userregistration where Username=? and password=?");
		pst.setString(1,uname);
		pst.setString(2, password);
		ResultSet rs=pst.executeQuery();
		if(rs.next())
		{
			System.out.println("inside if of userlogin");// If there is a matching user
            List<String> userData = new ArrayList<>();
           userData.add(rs.getString(1));//name
           userData.add(rs.getString(2));//username
           userData.add(rs.getString(3));//emailid
           userData.add(rs.getString(5));//mobile
           userData.add(rs.getString(9));//profile url

           userData.add(rs.getString(6));//password
           
           session.setAttribute("Username", rs.getString(2));
           session.setAttribute("userData", userData);
           session.setAttribute("successMessage", "Login successful");
           System.out.println(session.getAttribute("Username"));
           request.getRequestDispatcher("UserPage.jsp").forward(request, response);
           

		}
		else
		{
			request.setAttribute("errorMessage", "Invalid Login Credentials");
            request.getRequestDispatcher("UserLogin.jsp").forward(request, response);
		}
}
		catch(Exception e)
		{
			System.out.print("error" + e);
            request.setAttribute("errorMessage", "Exception raised");
            request.getRequestDispatcher("UserLogin.jsp").forward(request, response);
		}
	}

	
}