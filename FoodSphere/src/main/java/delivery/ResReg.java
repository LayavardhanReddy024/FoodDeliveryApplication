package delivery;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLIntegrityConstraintViolationException;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
@WebServlet("/resreg")
public class ResReg extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
	{
		String Rname=request.getParameter("name");
		String username=request.getParameter("username");
		String emailid=request.getParameter("email");
		String pass=request.getParameter("pass");
		String c_pass=request.getParameter("confirm_pass");
		String number =request.getParameter("mobile");
		String question=request.getParameter("security_question");
		String answer=request.getParameter("security_answer");
		Connection con=DBConnection.getCon();
		
		
		if(con==null)
		{
			System.out.println("inside if con check");
			request.setAttribute("errorMessage","DB Connection is null");
			request.getRequestDispatcher("RestaurantRegistration.jsp").forward(request,response);
		}
		if(pass.equals(c_pass))
		{
		   try
		     {
			   System.out.println("inside try block");
	         PreparedStatement pst=con.prepareStatement("insert into Restaurantregistration(Rname,Username,Email,MobileNumber,pass,SecurityQuestion,SecurityAnswer) values(?,?,?,?,?,?,?)");
	         pst.setString(1,Rname);
	         pst.setString(2, username);
	         pst.setString(3, emailid);
	         pst.setString(4,number);
	         pst.setString(5,pass);
	         pst.setString(6,question);
	         pst.setString(7,answer);
	         pst.executeUpdate();
	         
	         request.setAttribute("successMessage","Registration successful!..");
				request.getRequestDispatcher("ResLogin.jsp").forward(request,response);
	         System.out.println("query executes");
		     }
		   catch(SQLIntegrityConstraintViolationException e) {
			   request.setAttribute("errorMessage","username/email/phone no already exist try another one");
			   request.getRequestDispatcher("RestaurantRegistration.jsp").forward(request,response);
		   }
		     catch(Exception e)
		     {  System.out.println("inside catch"+e);
		    	 request.setAttribute("errorMessage","Exception raised");
		    	 request.getRequestDispatcher("RestaurantRegistration.jsp").forward(request,response);
		     }
		}
			else
			{   System.out.println("inside else ");
				request.setAttribute("errorMessage","password does not match");
				request.getRequestDispatcher("RestaurantRegistration.jsp").forward(request, response);
			}
	}
			

}