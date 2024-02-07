<?php
$servername = "localhost";
$username = "anees";
$password = "anees";
$dbname = "btec2024";

// إنشاء اتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // جمع قيمة حقل البحث
    $searchWord = $_POST['searchWord'];

    // استعداد الاستعلام SQL للبحث عن جميع الأصناف
    $sqlquery = "SELECT * FROM products WHERE color = '$searchWord' OR size = '$searchWord' OR category = '$searchWord'";

    $result = $conn->query($sqlquery);

    if ($result->num_rows > 0) {
        // إخراج بيانات كل صف
        while ($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"] . " - Name: " . $row["name"] . " , color: " . $row["color"] . " , size: " . $row["size"] . " , category: " . $row["category"] . "<br>";
        }
    } else {
        echo "0 results";
    }

    $conn->close();
}
?>
