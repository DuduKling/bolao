<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$name = $data->name;
$email = $data->email;
$message = $data->message;

$name=htmlspecialchars(strip_tags($name));
$email=htmlspecialchars(strip_tags($email));
$message=htmlspecialchars(strip_tags($message));

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'libs/PHPMailer/Exception.php';
require 'libs/PHPMailer/PHPMailer.php';
require 'libs/PHPMailer/SMTP.php';

$mail = new PHPMailer;
$mail->isSMTP(); 
$mail->SMTPDebug = 0; // 0 = off (for production use) - 1 = client messages - 2 = client and server messages
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';
$mail->Host = "smtp.gmail.com"; // use $mail->Host = gethostbyname('smtp.gmail.com'); // if your network does not support SMTP over IPv6
$mail->Port = 587; // TLS only
$mail->SMTPSecure = 'tls'; // ssl is deprecated
$mail->SMTPAuth = true;
$mail->Username = 'mestresdodisfarce@gmail.com'; // email
$mail->setFrom('contato@bolaoimperial.com', 'Bolão Imperial Team'); // From email and name
$mail->addAddress("eduardokmesiano@gmail.com", "Eduardo Kling"); // to email and name
$mail->Subject = 'Fale Conosco: '.$name.' - Bolão Imperial';

$messageToSend = file_get_contents(__DIR__ . '/emailTemplates/contato.php');
$messageToSend = str_replace('%name%', $name, $messageToSend); 
$messageToSend = str_replace('%email%', $email, $messageToSend);
$messageToSend = str_replace('%message%', $message, $messageToSend);
$mail->msgHTML($messageToSend); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,

$mail->AltBody = 'Nome: '.$name.'| email: '.$email.'| mensagem: '.$message; // If html emails is not supported by the receiver, show this body
// $mail->addAttachment('images/phpmailer_mini.png'); //Attach an image file

if(!$mail->send()){
    http_response_code(401);
    echo json_encode(array(
        "message" => "Ocorreu um problema, tente novamente mais tarde.",
        "error" => "Mailer Error: " . $mail->ErrorInfo
    ));
}else{
    http_response_code(200);
    echo json_encode(array(
        "message" => "Sua mensagem foi enviada com sucesso!"
    ));
}

?>



