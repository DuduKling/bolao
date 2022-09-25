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
 


//---- database connection will be here
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);
 

//---- retrieve given jwt here
// get posted data
$data = json_decode(file_get_contents("php://input"));
$tipo = $data->type;
$id = $data->id;

// get jwt
$jwt=isset($data->jwt) ? $data->jwt : "";
 


//---- decode jwt here
// if jwt is not empty
if($jwt){

    if($tipo=="resetPass"){
        
        $query = "SELECT *
            FROM users
            WHERE Id = ?
            LIMIT 0,1
        ";
        $stmt = $db->prepare($query);
        $stmt->bindParam(1, $id);

        $stmt->execute();
        $num = $stmt->rowCount();

        if($num>0){
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $id = $row['Id'];
            $password = $row['passwd'];
            $created = $row['created'];
            
            
            $secret = $password . $created;

            try {
                $decoded = JWT::decode($jwt, $secret, array('HS256'));

                $user->password = $data->password;
                $user->id = $id;
                
                if($user->updatePass()){
                    http_response_code(200);
                    echo json_encode(array(
                        "message" => "Senha atualizada com sucesso!"
                    ));

                    return true;
                }

            }catch(Exception $e){
                http_response_code(401);
                echo json_encode(array(
                    "message" => "Não foi possível redefinir sua senha. Código de segurança errado.",
                    "error" => $e->getMessage()
                ));
            }
        }
    }
 
    // if decode succeed, show user details
    try {
 
        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        
        //---- set user property values 
        // set user property values
        $user->completename = $data->name;
        $user->email = $data->email;
        $user->password = $data->password;

        $user->id = $decoded->data->id;
        

        
        if($tipo=="nopass"){
            //---- update user will be here
            // create the product
            if($user->updateNopass()){

                $user->updateInternalInfo();

                //---- regenerate jwt will be here
                // we need to re-generate jwt because user details might be different
                $token = array(
                    "iss" => $iss,
                    "aud" => $aud,
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "exp" => $exp,
                    "data" => array(
                        "id" => $user->id,
                        "completename" => $user->completename,
                        "email" => $user->email
                    )
                );
                $jwt = JWT::encode($token, $key);
                
                // set response code
                http_response_code(200);
                
                // response in json format
                echo json_encode(
                    array(
                        "message" => "Informações atualizadas!",
                        "jwt" => $jwt,
                        "name" => $user->completename,
                        "email" => $user->email,
                        "userImg" => $user->imagePath,
                        "userRole" => $user->role,
                        "id" => $user->id
                    )
                );
            }
            
            // message if unable to update user
            else{
                // set response code
                http_response_code(401);
            
                // show error message
                echo json_encode(array(
                    "message" => "Não foi possível atualizar as informações, favor entrar em contato com o Administrador.",
                    "name" => $user->completename,
                    "email" => $user->email,
                    "id" => $user->id
                ));
            }
        }elseif($tipo=="pass"){
            //---- update user will be here
            // create the product
            if($user->updatePass()){

                $user->updateInternalInfo();

                //---- regenerate jwt will be here
                // we need to re-generate jwt because user details might be different
                $token = array(
                    "iss" => $iss,
                    "aud" => $aud,
                    "iat" => $iat,
                    "nbf" => $nbf,
                    "exp" => $exp,
                    "data" => array(
                        "id" => $user->id,
                        "completename" => $user->completename,
                        "email" => $user->email
                    )
                );
                $jwt = JWT::encode($token, $key);
                
                // set response code
                http_response_code(200);
                
                // response in json format
                echo json_encode(
                    array(
                        "message" => "Senha atualizada!",
                        "jwt" => $jwt,
                        "name" => $user->completename,
                        "email" => $user->email,
                        "userImg" => $user->imagePath,
                        "id" => $user->id
                    )
                );
            }
            
            // message if unable to update user
            else{
                // set response code
                http_response_code(401);
            
                // show error message
                echo json_encode(array(
                    "message" => "Não foi possível atualizar a sua senha, favor entrar em contato com o Administrador.",
                    "name" => $user->completename,
                    "email" => $user->email,
                    "userImg" => $user->imagePath,
                    "id" => $user->id
                ));
            }
        }
    }catch (Exception $e){
    
        // set response code
        http_response_code(401);
    
        // show error message
        echo json_encode(array(
            "message" => "Acesso Negado. Error: Não foi possível decodificar o JWT.",
            "error" => $e->getMessage()
        ));
    }

}else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Acesso Negado. Favor fazer login novamente."));
}
?>



