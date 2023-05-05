<?php
    // Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
    session_start();

    // Se existe uma sessão com algum usuário...
    if(isset($_SESSION['unique_id'])){
        // Inclui um componente com os dados disponíveis para logar no banco de dados
        include_once "config.php";

        // Seleciona o ID do usuário que estava logado no sistema
        $logout_id = mysqli_real_escape_string($conn, $_GET['logout_id']);

        // Verifica se o ID de logout existe...
        if(isset($logout_id)){
            // Variável com o novo status
            $status = "Offline now";
            // Atualiza o status do usuário deslogado no banco de dados
            $sql = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id={$_GET['logout_id']}");
            
            // Após atualizar o status...
            if($sql){
                // Remove a sessão
                session_unset();
                session_destroy();
                // Redireciona o usuário para a página de Login
                header("location: ../login.php");
            }
        }
        // Caso o ID de logout não exista...
        else{
            // Redireciona o usuário para a página de Conversas (Chats)
            header("location: ../chats.php");
        }
    }
    // Caso não exista uma sessão...
    else{
        // O usuário é redirecionado para a página de Login
        header("location: ../login.php");
    }
?>