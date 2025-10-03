package delivery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class FetchAddress {
public static ResultSet getAddress(String uname) {
		
		try {
			Connection con=DBConnection.getCon();
			String username=uname;
			PreparedStatement ps=con.prepareStatement("select* from address where username=?",ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ps.setString(1, username);
			ResultSet rs=ps.executeQuery();
			
			return rs;
			
		}catch (Exception e) {
			// TODO: handle exception
			
			return null;

		}
		
			}

}