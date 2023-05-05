<?php
    // Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
    session_start();
    
    // Se existe uma sessão com algum usuário...
    if(isset($_SESSION['unique_id'])){
        // Inclui um componente com os dados disponíveis para logar no banco de dados
        include_once "config.php";

        // Seleciona o ID de saída
        $outgoing_id = $_SESSION['unique_id'];
        // Seleciona o ID de entrada
        $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
        // Seleciona a mensagem
        $message = mysqli_real_escape_string($conn, $_POST['message']);

        // Se a mensagem não estiver vazia...
        if(!empty($message)){
            // Insere no banco de dados
            $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg)
                                        VALUES ({$incoming_id}, {$outgoing_id}, '{$message}')") or die();
        }
    }
    // Caso não exista uma sessão...
    else{
        // O usuário é redirecionado para a página de Login
        header("location: ../login.php");
    }
?>