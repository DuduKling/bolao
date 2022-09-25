<?php
include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';

header("Access-Control-Allow-Origin: {$env["URL_FRONT"]}");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$inputData = json_decode(file_get_contents("php://input"));

$name = $inputData->name;
$email = $inputData->email;
$userMessage = $inputData->message;

$name=htmlspecialchars(strip_tags($name));
$email=htmlspecialchars(strip_tags($email));
$userMessage=htmlspecialchars(strip_tags($userMessage));

include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/email.php';
$mail = new Email($env);

$subject = 'Fale Conosco: ' . $name . ' - Bolão Imperial';

$message = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/api/assets/emailTemplates/contato.php');
$message = str_replace('%url%', $env["URL_FRONT"], $message);
$message = str_replace('%name%', $name, $message);
$message = str_replace('%email%', $email, $message);
$message = str_replace('%message%', $userMessage, $message);

$altBody = 'Nome: '.$name.'| email: '.$email.'| mensagem: '.$userMessage;

$mailSent = $mail->send($env["MAIL_ADMIN"], $env["MAIL_ADMIN_NAME"], $subject, $message, $altBody);

if (!$mailSent) {
    http_response_code(401);
    echo json_encode(array(
        "message" => "Ocorreu um problema, tente novamente mais tarde. (Error #EEEC1)",
        "error" => "Mailer Error: " . $mail->ErrorInfo
    ));
    exit();
}

http_response_code(200);
echo json_encode(array("message" => "Sua mensagem foi enviada com sucesso!"));
?>