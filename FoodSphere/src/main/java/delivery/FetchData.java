package delivery;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import jakarta.servlet.http.HttpSession;

public class FetchData {
	
	public static ResultSet getDishName(String restname) {
		
		try {
			Connection con=DBConnection.getCon();
			String resName=restname;
			PreparedStatement ps=con.prepareStatement("select* from dishes where restname=?",ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ps.setString(1, resName);
			ResultSet rs=ps.executeQuery();
			
			return rs;
			
		}catch (Exception e) {
			// TODO: handle exception
			
			return null;

		}
		
			}
}
