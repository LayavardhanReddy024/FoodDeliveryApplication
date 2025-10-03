package delivery;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.google.gson.Gson;

@WebServlet("/Add")
public class Address extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read JSON data from request body
        StringBuilder jsonString = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                jsonString.append(line);
            }
        }

        // Parse JSON data
        Gson gson = new Gson();
        Map<String, String> data = gson.fromJson(jsonString.toString(), HashMap.class);

        // Extract data from parsed JSON
        String name = data.get("name");
        String phone = data.get("phone");
        String altPhone = data.get("altPhone");
        String address = data.get("address");
        String locality = data.get("locality");
        String landmark = data.get("landmark");
        String pincode = data.get("pincode");
        String city = data.get("city");
        String state = data.get("state");

        // Debug log
        System.out.println("Received address data: " +
            name + " | " + phone + " | " + altPhone + " | " + address + " | " + locality + " | " +
            landmark + " | " + pincode + " | " + city + " | " + state);

        // Retrieve the username from the session
        HttpSession session = request.getSession();
        String username = (String) session.getAttribute("Username");

        if (username == null) {
            sendJsonResponse(response, false, "Session expired. Please log in again.");
            return;
        }

        // Obtain database connection
        try (Connection connection = DBConnection.getCon()) {
            if (connection == null) {
                sendJsonResponse(response, false, "DB Connection is null");
                return;
            }

            // SQL INSERT statement for adding the address
            String sql = "INSERT INTO Address (Uname, phone, altPhone, address, locality, landmark, pincode, city, state, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, name);
                preparedStatement.setString(2, phone);
                preparedStatement.setString(3, (altPhone == null || altPhone.isEmpty()) ? null : altPhone);
                preparedStatement.setString(4, address);
                preparedStatement.setString(5, locality);
                preparedStatement.setString(6, (landmark == null || landmark.isEmpty()) ? null : landmark);
                preparedStatement.setString(7, pincode);
                preparedStatement.setString(8, city);
                preparedStatement.setString(9, state);
                preparedStatement.setString(10, username);

                // Execute the SQL INSERT statement
                int count = preparedStatement.executeUpdate();

                if (count > 0) {
                    // Update session with new address data
                    session.setAttribute("addressData", FetchAddress.getAddress(username));
                    sendJsonResponse(response, true, "Address added successfully.");
                } else {
                    sendJsonResponse(response, false, "Error occurred while adding the address.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            sendJsonResponse(response, false, "SQLException: " + e.getMessage());
        }
    }

    private void sendJsonResponse(HttpServletResponse response, boolean success, String message) throws IOException {
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Map<String, Object> jsonResponse = new HashMap<>();
            jsonResponse.put("success", success);
            jsonResponse.put("message", message);

            Gson gson = new Gson();
            String json = gson.toJson(jsonResponse);
            out.write(json);
            out.flush();
        }
    }
}
