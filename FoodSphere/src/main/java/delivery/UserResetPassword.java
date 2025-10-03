package delivery;
import java.io.*;
import java.sql.*;

import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
@WebServlet("/UserReset")
public class UserResetPassword extends HttpServlet{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
		
		response.setContentType("text/html");
		String type=request.getParameter("identifier_type");
		String value=request.getParameter("identifier_value");
		String question=request.getParameter("security_question");
		String answer=request.getParameter("security_answer");
		String pass=request.getParameter("new_password");
		String cpass=request.getParameter("confirm_password");
		Connection con=DBConnection.getCon();
		if(con==null)
		{
			request.setAttribute("errorMessage","DB Connection is null");
			request.getRequestDispatcher("UserResetPassword.jsp").forward(request,response);
		}
		try
		{
		PreparedStatement pst=con.prepareStatement("select "+type+",SecurityQuestion,SecurityAnswer from userregistration where "+type+"=? and SecurityQuestion=? and SecurityAnswer=?");
		
		
		pst.setString(1, value);
		
		pst.setString(2, question);
	
		pst.setString(3,answer);;
	    ResultSet rs=pst.executeQuery();
	    if(rs.next())
	    {
	    	if(pass.equals(cpass))
	    	{
	    		PreparedStatement pst1=con.prepareStatement("update userregistration set Password = ? where " +type+"= ?");
	    		pst1.setString(1, cpass);
	    		pst1.setString(2, value);
	    		int count=pst1.executeUpdate();
	    		if(count>0)
	    		{
	    			request.setAttribute("successMessage","Password updated successfully");
	    			request.getRequestDispatcher("UserLogin.jsp").forward(request,response);
	    			
	    		}
	    	}
	    	else
	    	{
	    		request.setAttribute("errorMessage", "password does not match");
	    		request.getRequestDispatcher("UserResetPassword.jsp").forward(request,response);
	    		
	    	}
	    	
	    }
	    else
	    {
	    	request.setAttribute("errorMessage","details does not exist");
	    	request.getRequestDispatcher("UserResetPassword.jsp").forward(request,response);
	    }
	    rs.close();
	    pst.close();
	}
		catch(Exception e)
		{
			request.setAttribute("errorMessage","Exception raised");
			request.getRequestDispatcher("UserResetPassword.jsp").forward(request,response);
			
		}
	}
}
