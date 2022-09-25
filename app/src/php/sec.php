<?php

function sec_input($data) {
    global $conn;
    global $userNameTests;

    // echo "regex here: {$data}, ";
    // echo $userNameTests ? 'true ' : 'false ';

    if (preg_match("/^[A-Za-z]+([ |\x20]{1}[A-Za-z]+)?$/i", $data)){
        
        $data = trim($data);    // Remove espaços em branco do início e fim da string.
        //$data = stripslashes($data);    // Remove backslashes (\).
        $data = str_replace("%", "\%", str_replace("_", "\_", $data));   // Remove % e _.
        $data = mysqli_real_escape_string($conn, $data); // Remove caracteres especiais para uso no SQL. Dá escape em NUL (ASCII 0), \n, \r, \, ', ", e Control-Z.
        //$data = str_replace("\'", "", $data);   // 
        //$data = str_replace(",", "", $data);
        $data = htmlspecialchars($data);    // Converte caracteres especiais para entidades de html. (Entidades = &algumacoisa).
        $userNameTests = TRUE;
        // echo "TEST1: ";
        // echo $userNameTests ? 'true ' : 'false ';
        return $data;
    } else {
        $userNameTests = FALSE;
        // echo "TEST2: ";
        // echo $userNameTests ? 'true ' : 'false ';
        echo 'Nome não está no formato correto ou está faltando! Por favor verifique e tente novamente. ';
    }
}

?>