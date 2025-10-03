<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fetch Student Data</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
        #fetchButton {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            margin-top: 20px;
        }
        #fetchButton:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

    <h1>Student Data</h1>
    <button id="fetchButton">Fetch Student Data</button>

    <table id="studentTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            <!-- Rows will be added dynamically here -->
        </tbody>
    </table>

    <script>
        document.getElementById('fetchButton').addEventListener('click', function() {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "FetchStudentServlet", true); // Replace with your servlet URL
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const students = JSON.parse(xhr.responseText);
                    const studentTable = document.querySelector("#studentTable tbody");

                    studentTable.innerHTML = ""; // Clear existing rows

                    students.forEach(student => {
                        const row = document.createElement("tr");

                        const idCell = document.createElement("td");
                        idCell.textContent = student.id;

                        const nameCell = document.createElement("td");
                        nameCell.textContent = student.name;

                        const ageCell = document.createElement("td");
                        ageCell.textContent = student.age;

                        row.appendChild(idCell);
                        row.appendChild(nameCell);
                        row.appendChild(ageCell);

                        studentTable.appendChild(row);
                    });
                } else {
                    console.error("Failed to fetch data.");
                }
            };
            xhr.send();
        });
    </script>

</body>
</html>
