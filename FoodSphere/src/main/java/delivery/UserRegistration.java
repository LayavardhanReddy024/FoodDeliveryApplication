package delivery;
import java.io.*;
import java.sql.*;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Register
 */
@WebServlet("/userRegister")
public class UserRegistration extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String name=request.getParameter("name");
		String username=request.getParameter("username");
	    String gender=request.getParameter("gender");
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
			request.getRequestDispatcher("UserRegistration.jsp").forward(request,response);
		}
		if(pass.equals(c_pass))
		{
		   try
		     {
			   System.out.println("inside try block");
	         PreparedStatement pst=con.prepareStatement("insert into userregistration(Name,Username,Emailid,Gender,MobileNo,Password,SecurityQuestion,SecurityAnswer) values(?,?,?,?,?,?,?,?)");
	         pst.setString(1,name);
	         pst.setString(2, username);
	         pst.setString(3, emailid);
	         pst.setString(4, gender);
	         pst.setString(5,number);
	         pst.setString(6,pass);
	         pst.setString(7,question);
	         pst.setString(8,answer);
	         pst.executeUpdate();
	         System.out.println("executed");
	         request.setAttribute("successMessage","Registration successful!..");
				request.getRequestDispatcher("UserLogin.jsp").forward(request,response);
	         System.out.println("query executes");
		     }
		   catch(SQLIntegrityConstraintViolationException e) {
			   request.setAttribute("errorMessage","username/email/phone no already exist try another one");
			   request.getRequestDispatcher("UserRegistration.jsp").forward(request,response);
		   }
		     catch(Exception e)
		     {  System.out.println("inside catch"+e);
		    	 request.setAttribute("errorMessage","Exception raised");
		    	 request.getRequestDispatcher("UserRegistration.jsp").forward(request,response);
		     }
		}
			else
			{   System.out.println("inside else ");
				request.setAttribute("errorMessage","password does not match");
				request.getRequestDispatcher("UserRegistration.jsp").forward(request, response);
			}
	}
			

}