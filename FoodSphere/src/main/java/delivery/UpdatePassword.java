package delivery;
import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
@WebServlet("/updatePassword")
public class UpdatePassword extends HttpServlet{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException
	{
		Connection con=DBConnection.getCon();
		HttpSession session=request.getSession();
		String current=request.getParameter("currentPassword");
		String rname=(String)session.getAttribute("restName");
		String newPassword=request.getParameter("newPassword");
		String confirmPassword=request.getParameter("confirmPassword");
		String passw;
		if(con==null)
		{
			 request.setAttribute("errorMessage", "DB Connection is null");
	            request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
	            return;
		}
		try
		{
			System.out.println("inside try of update profile");
			PreparedStatement pst=con.prepareStatement("select Pass from restaurantregistration where Rname=?");
			pst.setString(1, rname);
			ResultSet rs=pst.executeQuery();
			System.out.println("query executed update 1");
			if(rs.next())
			{
				System.out.println("if inside update profile");
				passw=rs.getString(1);
				System.out.println(rs.getString(1));
				
					if(newPassword.equals(confirmPassword))
					{
						System.out.println("current password checking");
						PreparedStatement pst1=con.prepareStatement("update restaurantregistration set Pass=? where Rname=?");
						pst1.setString(1, newPassword);
						pst1.setString(2, rname);
						int count=pst1.executeUpdate();
						System.out.println("executed query 2");
						if(count>0)
						{
							System.out.println("password updated");
							session.setAttribute("successMessage", "password updated successfully");
					         request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
							
						}
						else
						{
							session.setAttribute("errorMessage", "exception raised");
					         request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
						}
						
					}
					else
					{
						session.setAttribute("errorMessage", "password does not match");
				         request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
					}
			}
				
				
			
			else
			{
				System.out.println("else in update profile 1");
				 session.setAttribute("errorMessage", "data does not exist");
		         request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
				
			}
			
		}
		catch(Exception e)
		{
			System.out.println("exception"+e);
			 session.setAttribute("errorMessage", "Exception raised");
	         request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
		}
	}

}