package delivery;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBConnection {
	 static{
	        try {
	            Class.forName("com.mysql.cj.jdbc.Driver");
	        } catch (ClassNotFoundException e) {
	            System.out.println("MySQL JDBC driver not found.");
	        }
	    }
	    public static Connection con;
	    public static Connection getCon(){
	        try{
	           con= DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/foodsphere","root","root");
	           System.out.println("connaction get");
	        }
	        catch (SQLException sq){
	            System.out.println("Connection failed...");
	        }
	        return con;
	    }
		public static void closeResources(ResultSet rs, PreparedStatement ps, Connection con2) {
			// TODO Auto-generated method stub
			try {
				if (rs != null) rs.close();
				if (ps != null) ps.close();
				if (con != null) con2.close();

				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		}
}