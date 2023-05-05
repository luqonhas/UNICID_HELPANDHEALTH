<?php
    // Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
    session_start();

    // Inclui um componente com os dados disponíveis para logar no banco de dados
    include_once "config.php";

    // Seleciona o ID de saída
    $outgoing_id = $_SESSION['unique_id'];
    // Seleciona o texto no input de pesquisa
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']);

    // Seleciona no banco de dados os nomes que tem semelhança com o texto digitado no input de pesquisa
    $sql = "SELECT * FROM users WHERE NOT unique_id = {$outgoing_id} AND (fname LIKE '%{$searchTerm}%' OR lname LIKE '%{$searchTerm}%') ";
    // Variável de mensagem
    $output = "";
    // Prepara a busca
    $query = mysqli_query($conn, $sql);

    // Se o resultado da busca for maior que 0...
    if(mysqli_num_rows($query) > 0){
        // Inclui um componente que insere as conversas com os nomes semelhantes ao texto digitado
        include_once "data.php";
    }
    // Se não...
    else{
        // Retorna uma mensagem
        $output .= 'Nenhum usuário encontrado';
    }
    // Se não for nenhuma das opções, retorna vazio
    echo $output;
?>