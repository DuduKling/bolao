<?php
require $_SERVER['DOCUMENT_ROOT'] . '/api/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class Email {
    public $mail = null;

    public function __construct($env) {
        $mail = new PHPMailer(true);

        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = $env["MAIL_HOST"];                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = $env["MAIL_USERNAME"];                     //SMTP username
        $mail->Password   = $env["MAIL_PASSWORD"];                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = $env["MAIL_PORT"];                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        if ($env["MAIL_DEBUG"] == "true") {
            $mail->SMTPDebug = SMTP::DEBUG_SERVER; //Enable verbose debug output
        }

        //Recipients
        $mail->setFrom($env["MAIL_FROM"], $env["MAIL_FROM_NAME"]);
        // $mail->addAddress('ellen@example.com');               //Name is optional
        // $mail->addReplyTo('info@example.com', 'Information');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        $this->mail = $mail;
        return $this->mail;
    }

    public function send($recipient, $recipientName, $subject, $message, $altBody) {
        $this->mail->isHTML(true); //Set email format to HTML

        $this->mail->addAddress($recipient, $recipientName);     //Add a recipient

        $this->mail->Subject = $subject;
        $this->mail->Body = $message;
        $this->mail->AltBody = $altBody;

        return $this->mail->send();
    }
}
?>