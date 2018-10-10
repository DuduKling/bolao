<?php
$servername = "localhost";
$username = "id4178627_bolaoadm";
$password = "s3nhab0lao";
$dbname = "id4178627_bolaodb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>