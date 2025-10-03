package delivery;

import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import java.nio.file.Paths;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/RestaurantProfile")
@MultipartConfig // This annotation is required for handling file uploads
public class RestaurantProfile extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection con = DBConnection.getCon();
        String Rname = request.getParameter("Rname");
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String mobileno = request.getParameter("number");
        String description = request.getParameter("description");
        Part filePart = request.getPart("photo"); // Retrieves the file input part
        HttpSession session = request.getSession();

        if (con == null) {
            request.setAttribute("errorMessage", "DB Connection is null");
            request.getRequestDispatcher("ResLogin.jsp").forward(request, response);
            return;
        }

        String fileName = null;
        String existingPhotoPath = null;

        try {
            // Step 1: Retrieve the current photo path from the database
            PreparedStatement pst2 = con.prepareStatement("SELECT profileurl FROM restaurantregistration WHERE Rname=?");
            pst2.setString(1, Rname);
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
            String updateQuery = "UPDATE restaurantregistration SET Username=?, email=?, MobileNumber=?, description=?";
            if (fileName != null) {
                updateQuery += ", profileurl=?"; // Update the photo path if a new photo is uploaded
            }
            updateQuery += " WHERE Rname=?";

            PreparedStatement pst1 = con.prepareStatement(updateQuery);
            pst1.setString(1, username);
            pst1.setString(2, email);
            pst1.setString(3, mobileno);
            pst1.setString(4, description);

            if (fileName != null) {
                pst1.setString(5, "uploads/" + fileName); // Save the new photo path
                pst1.setString(6, Rname);
            } else {
                pst1.setString(5, Rname);
            }

            int updateCount = pst1.executeUpdate();

            // Step 4: Update session and handle the result of the update
            if (updateCount > 0) {
                pst2 = con.prepareStatement("SELECT * FROM restaurantregistration WHERE Rname=?");
                pst2.setString(1, Rname);
                rs1 = pst2.executeQuery();

                if (rs1.next()) {
                    List<String> restaurantData = new ArrayList<>();
                    restaurantData.add(rs1.getString(1)); // Rname
                    restaurantData.add(rs1.getString(2)); // Username
                    restaurantData.add(rs1.getString(3)); // Email
                    restaurantData.add(rs1.getString(4)); // MobileNumber
                    restaurantData.add(fileName != null ? "uploads/" + fileName : existingPhotoPath); // Use new or existing photo path
                    restaurantData.add(rs1.getString(9)); // Assuming description is in column 9
                    session.setAttribute("restaurantData", restaurantData);
                }

                request.setAttribute("successMessage", "Profile updated successfully.");
                response.sendRedirect("RestaurantPage.jsp");
            } else {
                request.setAttribute("errorMessage", "Failed to update profile. Please try again.");
                request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("errorMessage", "Database error occurred: " + e.getMessage());
            request.getRequestDispatcher("RestaurantPage.jsp").forward(request, response);
        }
    }
}