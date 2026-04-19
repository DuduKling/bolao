<?php

class Auth
{
    public function generateToken($data)
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
        $env = new Env();

        $customJWT = new CustomJWT($env);

        return $customJWT->createToken($data);
    }

    private function validateToken($jwt)
    {
        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/env.php';
        $env = new Env();

        include_once $_SERVER['DOCUMENT_ROOT'] . '/api/assets/config/jwt.php';
        $customJWT = new CustomJWT($env);

        return $customJWT->decodeToken($jwt);
    }

    public function authenticate()
    {
        $jwt = '';
        if (isset($_COOKIE["userJWT"])) {
            $jwt = htmlspecialchars($_COOKIE["userJWT"]);
        }

        if (!isset($jwt) || empty($jwt)) {
            http_response_code(401);
            echo json_encode(array(
                "message" => "Acesso Negado. Favor fazer login novamente. (Error: #AUTH1)"
            ));
            exit();
        }

        $decoded = $this->validateToken($jwt);
        if (empty($decoded)) {
            http_response_code(401);
            echo json_encode(array(
                "message" => "Acesso Negado. (Error: #AUTH2)"
            ));
            exit();
        }

        return $decoded;
    }
}
