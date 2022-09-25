<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$inputData = json_decode(file_get_contents("php://input"));

$email = $inputData->email;

$email = htmlspecialchars(strip_tags($email));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/database.php';
$db = new DatabaseConnection($env);

$query = "SELECT *
    FROM users
    WHERE email = :email
    LIMIT 0,1";

$stmt = $db->prepare($query);

$stmt->bindParam(':email', $email);

$stmt->execute();
$num = $stmt->rowCount();

if ($num <= 0) {
    http_response_code(400);
    echo json_encode(array("message" => "Não foi possível encontrar este e-mail. Verifique se digitou corretamente. (Error #EEER1)"));
    exit();
}

$row = $stmt->fetch(PDO::FETCH_ASSOC);

$id = $row['Id'];
$completename = $row['name'];

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
$customJWT = new CustomJWT($env);

$jwt = $customJWT->createToken(array(
    "id" => $id,
    "completename" => $completename,
    "email" => $email
));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/email.php';
$mail = new Email($env);

$subject = 'Redefinição de senha - Bolão Imperial';

$message = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/api/assets/emailTemplates/reset_password.php');
$message = str_replace('%url%', $env["URL_FRONT"], $message);
$message = str_replace('%id%', $id, $message);
$message = str_replace('%jwt%', $jwt, $message);

$altBody = 'Acesse o link: {$env["URL_FRONT"]}/user/esqueci/'.$jwt;

$mailSent = $mail->send($email, $completename, $subject, $message, $altBody);

if (!$mailSent) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Ocorreu um problema, tente novamente mais tarde. (Error #EEER2)",
        "error" => "Mailer Error: " . $mail->ErrorInfo
    ));
    exit();
}

http_response_code(200);
echo json_encode(array("message" => "Verifique sua caixa de e-mail para continuar a redefinir a sua senha."));
?>