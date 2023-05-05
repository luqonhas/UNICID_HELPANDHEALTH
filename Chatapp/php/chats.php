<?php
    // Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
    session_start();

    // Inclui um componente com os dados disponíveis para logar no banco de dados
    include_once "config.php";

    // ID de saída do usuário
    $outgoing_id = $_SESSION['unique_id'];

    // Seleciona todos os usuários existente no banco de dados, apenas ignorando o usuário que está logado
    $sql = "SELECT * FROM users WHERE NOT unique_id = {$outgoing_id} ORDER BY user_id DESC";
    
    // Variável responsável pela pesquisa no banco de dados
    $query = mysqli_query($conn, $sql);
    // Variável responsável em retornar mensagens sobre o retorno
    $output = "";

    // Caso o resultado da busca de conversas seja IGUAL a 0
    if(mysqli_num_rows($query) == 0){
        // Retorna uma mensagem na página
        $output .= "Nenhuma conversa encontrada...";
    }
    // Caso seja maior que 0...
    else if(mysqli_num_rows($query) > 0){
        // Inclui o componente de dados (o que preencherá no campo "users-list" no chats.php)
        include_once "data.php";
    }
    // Caso não seja nenhuma dessas opções, retorna vazio
    echo $output;
?>