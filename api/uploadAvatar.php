<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 



//---- files for decoding jwt will be here
// required to encode json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
include_once 'config/database.php';
include_once 'objects/user.php';
 
$database = new Database();
$db = $database->getConnection();


$jwt = $_POST["jwt"];
 
if($jwt){
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        $userID = $decoded->data->id;

        $uploadOk = 1;
        if ($_FILES["file"]["size"] > 500000) {
            $uploadOk = 0;
        }
        $imageFileType = strtolower(pathinfo($_FILES["file"]["name"],PATHINFO_EXTENSION));
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif"){
            $uploadOk = 0;
        }

        if($uploadOk){
            $upFile = $_FILES['file'];
            $tmpName = $upFile['tmp_name'];
    
            $fileName = $upFile['name'];
            $fileNamePieces = explode(".", $fileName);
    
            $finalFileName = '/imagens/users/'. $fileNamePieces[0] ."-".time(). ".".$fileNamePieces[1];
    
            $error = (int) $upFile['error'];
            if($error == 0){
                if(move_uploaded_file($tmpName, dirname(__FILE__, 2).$finalFileName)){
                    
                    $query = "UPDATE users SET
                        imagePath = :imagePath
                        WHERE id = :id";
                    $stmt = $db->prepare($query);
    
                    $stmt->bindParam(':imagePath', $finalFileName);
                    $stmt->bindParam(':id', $userID);
    
                    if($stmt->execute()){

                        http_response_code(200);
                        echo json_encode(array(
                            "message" => "Foto atualizada com sucesso!",
                            "userImg" => $finalFileName 
                        ));

                    }else{

                        http_response_code(401);
                        echo json_encode(array(
                            "message" => "Não foi possível atualizar a imagem no banco. Fale com o Administrador."
                        ));
                    }
                }else{

                    http_response_code(401);
                    echo json_encode(array(
                        "message" => "Problemas ao mover o arquivo para o servidor. Fale com o Administrador."
                    ));
                }
            }else{

                http_response_code(401);
                echo json_encode(array(
                    "message" => "Problemas ao enviar o arquivo para o servidor. Fale com o Administrador."
                ));
            }
        }else{
            http_response_code(401);
            echo json_encode(array(
                "message" => "Formato ou tamanho do arquivo indisponíveis para upload."
            ));
        }
    }catch(Exception $e){

        http_response_code(401);
        echo json_encode(array(
            "message" => "Acesso Negado. Error: Não foi possível decodificar o JWT.",
            "error" => $e->getMessage()
        ));
    }
}else{

    http_response_code(401);
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente."));
}
?>






