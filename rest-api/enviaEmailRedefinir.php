<?php
// required headers
header("Access-Control-Allow-Origin: http://localhost/rest-api-auth/");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/database.php';
include_once 'objects/user.php';

$database = new Database();
$db = $database->getConnection();


$data = json_decode(file_get_contents("php://input"));
$email = $data->email;

include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'libs/PHPMailer/Exception.php';
require 'libs/PHPMailer/PHPMailer.php';
require 'libs/PHPMailer/SMTP.php';



$query = "SELECT *
    FROM users
    WHERE email = ?
    LIMIT 0,1
";

$stmt = $db->prepare($query);

$email=htmlspecialchars(strip_tags($email));
$stmt->bindParam(1, $email);

$stmt->execute();
$num = $stmt->rowCount();

if($num>0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $id = $row['Id'];
    $completename = $row['name'];
    $password = $row['passwd'];
    $imagePath = $row['imagePath'];
    $created = $row['created'];

    $token = array(
        "iss" => $iss,
        "aud" => $aud,
        "iat" => $iat,
        "nbf" => $nbf,
        "exp" => $exp,
        "data" => array(
            "id" => $id,
            "completename" => $completename,
            "email" => $email
        )
    );

    $secret = $password . $created;
    
    $jwt = JWT::encode($token, $secret);
    
    
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
$mail->Password = 'xxxxxxxxxxxxxx'; // password
    $mail->setFrom('contato@bolaoimperial.com', 'Bolão Imperial Team'); // From email and name
    $mail->addAddress($email, $completename); // to email and name
    $mail->Subject = 'Redefinição de senha - Bolão Imperial';
    
    $message = file_get_contents(__DIR__ . '/emailTemplates/reset_password.php'); 
    $message = str_replace('%id%', $id, $message); 
    $message = str_replace('%jwt%', $jwt, $message); 
    $mail->msgHTML($message); //$mail->msgHTML(file_get_contents('contents.html'), __DIR__); //Read an HTML message body from an external file, convert referenced images to embedded,


    $mail->AltBody = 'Acesse o link: https://bolaodogui.000webhostapp.com/user/esqueci/'.$jwt; // If html emails is not supported by the receiver, show this body
    // $mail->addAttachment('images/phpmailer_mini.png'); //Attach an image file
    
    if(!$mail->send()){
        http_response_code(401);
        echo json_encode(array(
            "message" => "Mailer Error: " . $mail->ErrorInfo
        ));
    }else{
        http_response_code(200);
        echo json_encode(array(
            "message" => "Verifique sua caixa de e-mail para continuar a redefinir a sua senha."
        ));
    }

    
}else{
    http_response_code(401);
    echo json_encode(array(
        "message" => "Não foi possível encontrar este e-mail. Verifique se digitou corretamente."
    ));
}


// $to = $email;
// $subject = "testando assunto";
// $message = "merdagem aqui";
// $header = "MIME-Version: 1.0\n";
// $header .= "Content-type: text/html; charset=iso-8859-1\n";
// $header .= "From: $email\n";

// mail($to, $subject, $message, $header);

?>



