package delivery;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLIntegrityConstraintViolationException;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
@WebServlet("/RemoveDish")
public class RemoveDish extends HttpServlet{
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
		HttpSession session=request.getSession();
		response.setContentType("text/html");
		String dishname=request.getParameter("dishname");
		String restname = (String)session.getAttribute("restName");
		Connection con=DBConnection.getCon();
		
	
	if(con==null)
	{
		
		session.setAttribute("errorMessage","DB Connection is null");
		request.getRequestDispatcher("RemoveDish.jsp").forward(request,response);
	} 
	try
	{
		
		PreparedStatement pst=con.prepareStatement("delete from dishes where dishname=? and restname=?");
		pst.setString(1, dishname);
		pst.setString(2, restname);
		int count=pst.executeUpdate();
		session.setAttribute("dishData", FetchData.getDishName(restname));
		if(count>0)
		{
			
			session.setAttribute("successMessage", "dish removed successfully");
			request.getRequestDispatcher("RestaurantPage.jsp").include(request, response);
		}
		else
		{
			
			session.setAttribute("errorMessage","SQL Exception raised");
			request.getRequestDispatcher("RestaurantPage.jsp").include(request, response);
		}
	}
	catch(Exception e)
	{
		
		session.setAttribute("errorMessage","Exception raised");
		request.getRequestDispatcher("RestaurantPage.jsp").include(request, response);
	}

	}
}
