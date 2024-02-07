<?php
$servername = "localhost";
$username = "anees";
$password = "anees";
$dbname = "btec2024";

// إنشاء اتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // جمع قيم الحقول من النموذج
    $productName = $_POST['productName'];
    $productPrice = $_POST['productPrice'];
    $productDescription = $_POST['productDescription'];
    $productImageUrl = $_POST['productImageUrl'];
    $productColor = $_POST['productColor'];
    $productSize = $_POST['productSize'];

    // استعداد الاستعلام SQL
    $sqlquery = "INSERT INTO products (pname, price, pdescription, image_url, color, psize)
                 VALUES ('$productName', $productPrice, '$productDescription', '$productImageUrl', '$productColor', '$productSize')";

    // تنفيذ الاستعلام
    if ($conn->query($sqlquery) === TRUE) {
        echo "تم إضافة المنتج بنجاح";
    } else {
        echo "خطأ: " . $sqlquery . "<br>" . $conn->error;
    }
}

// إغلاق الاتصال
$conn->close();
?>
