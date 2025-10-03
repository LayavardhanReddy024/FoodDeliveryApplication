package delivery;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import java.nio.file.Paths;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/EditProfile")
@MultipartConfig // This annotation is required for handling file uploads
public class EditProfile extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con = DBConnection.getCon();
        String name = request.getParameter("Name");
        String email = request.getParameter("email");
        String mobileno = request.getParameter("number");
        Part filePart = request.getPart("photo"); // Retrieves the file input part
        HttpSession session = request.getSession();
        String Uname=(String)session.getAttribute("Username");

        if (con == null) {
            request.setAttribute("errorMessage", "DB Connection is null");
            request.getRequestDispatcher("UserLogin.jsp").forward(request, response);
            return;
        }

        String fileName = null;
        String existingPhotoPath = null;

        try {
            // Step 1: Retrieve the current photo path from the database
            PreparedStatement pst2 = con.prepareStatement("SELECT profileurl FROM userregistration WHERE Username=?");
            pst2.setString(1, Uname);
            ResultSet rs1 = pst2.executeQuery();

            if (rs1.next()) {
                existingPhotoPath = rs1.getString("profileurl");
            }

            // Step 2: Handle the uploaded file, if any
            if (filePart != null && filePart.getSize() > 0) {
                fileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString(); // Get the file name
                String uploadPath = getServletContext().getRealPath("") + File.separator + "uploads"; // Directory to save uploaded files
                File uploadDir = new File(uploadPath);
                if (!uploadDir.exists()) uploadDir.mkdir(); // Create the directory if it doesn't exist

                filePart.write(uploadPath + File.separator + fileName); // Save the file to the server
            }

            // Step 3: Update the database with the new information
            String updateQuery = "UPDATE userregistration SET Name=?, EmailID=?, MobileNO=? ";
            if (fileName != null) {
                updateQuery += ", profileurl=?"; // Update the photo path if a new photo is uploaded
            }
            updateQuery += " WHERE Username=?";

            PreparedStatement pst1 = con.prepareStatement(updateQuery);
            pst1.setString(1, name);
            pst1.setString(2, email);
            pst1.setString(3, mobileno);
         

            if (fileName != null) {
                pst1.setString(4, "uploads/" + fileName); // Save the new photo path
                pst1.setString(5, Uname);
            } else {
                pst1.setString(4, Uname);
            }

            int updateCount = pst1.executeUpdate();

            // Step 4: Update session and handle the result of the update
            if (updateCount > 0) {
                pst2 = con.prepareStatement("SELECT * FROM userregistration WHERE Username=?");
                pst2.setString(1, Uname);
                rs1 = pst2.executeQuery();

                if (rs1.next()) {
                    List<String> userData = new ArrayList<>();
                    userData.add(rs1.getString(1)); // name
                    userData.add(rs1.getString(2)); // Username
                    userData.add(rs1.getString(3)); // Email
                    userData.add(rs1.getString(5)); // MobileNumber
                    userData.add(fileName != null ? "uploads/" + fileName : existingPhotoPath); // Use new or existing photo path
       
                    session.setAttribute("userData", userData);
                }

                request.setAttribute("successMessage", "Profile updated successfully.");
                response.sendRedirect("UserPage.jsp");
            } else {
                request.setAttribute("errorMessage", "Failed to update profile. Please try again.");
                request.getRequestDispatcher("UserPage.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("errorMessage", "Database error occurred: " + e.getMessage());
            request.getRequestDispatcher("UserPage.jsp").forward(request, response);
        }
    }
}