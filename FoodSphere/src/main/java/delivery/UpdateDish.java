package delivery;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLIntegrityConstraintViolationException;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
@WebServlet("/UpdateDish")

public class UpdateDish extends HttpServlet{
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
		HttpSession session=request.getSession();
	
		
		Connection con=DBConnection.getCon();
		if(con==null)
		{
			
			session.setAttribute("errorMessage","DB Connection is null");
			request.getRequestDispatcher("RemoveDish.jsp").forward(request,response);
		} 
		String restname = (String)session.getAttribute("restName");
		String dishname=request.getParameter("dishSelect");
		String updatefield=request.getParameter("updateFieldSelect");
		String newValue;
		if(updatefield.equals("veg_or_nonveg"))
		{
			
		  newValue=request.getParameter("vegStatus");
		 
		}
		else if(updatefield.equals("category"))
		{
			newValue=request.getParameter("categorySelect");
		}
		else
		{
			newValue=request.getParameter("newValue");
		}
		try
		{
			
			PreparedStatement pst=con.prepareStatement("update dishes set "+ updatefield+" = ?  where dishname=? and restname=?");
			pst.setString(1,newValue);
			pst.setString(2, dishname);
			pst.setString(3, restname);
			
			int row=pst.executeUpdate();
			session.setAttribute("dishData", FetchData.getDishName((String)session.getAttribute("restName")));
			
			if(row>0)
			{
				session.setAttribute("successMessage", "data updated successfully");
				request.getRequestDispatcher("RestaurantPage.jsp").include(request, response);
			}
			else
			{
				
				session.setAttribute("errorMessage","Data not updated");
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
