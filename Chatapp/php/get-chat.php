<?php
    // Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
    session_start();
    
    // Caso exista uma sessão com algum usuário...
    if(isset($_SESSION['unique_id'])){
        // Inclui um componente com os dados disponíveis para logar no banco de dados
        include_once "config.php";

        // Seleciona o ID de saída
        $outgoing_id = $_SESSION['unique_id'];
        // Seleciona o ID de entrada
        $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']);
        // Variável para mensagens
        $output = "";

        // Seleciona todas as mensagens
        $sql = "SELECT * FROM messages LEFT JOIN users ON users.unique_id = messages.outgoing_msg_id
                WHERE (outgoing_msg_id = {$outgoing_id} AND incoming_msg_id = {$incoming_id})
                OR (outgoing_msg_id = {$incoming_id} AND incoming_msg_id = {$outgoing_id}) ORDER BY msg_id";
        
        // Prepara a busca
        $query = mysqli_query($conn, $sql);

        // Se o resultado da busca for maior que 0...
        if(mysqli_num_rows($query) > 0){
            // Enquanto estiver buscando...
            while($row = mysqli_fetch_assoc($query)){
                // Se a mensagem for de um usuário de saída (usuário logado), cria a mensagem
                if($row['outgoing_msg_id'] === $outgoing_id){
                    $output .= '<div class="chat outgoing">
                                <div class="details">
                                    <p>'. $row['msg'] .'</p>
                                </div>
                                </div>';
                }
                // Se a mensagem for de um usuário de entrada (usuário da conversa), cria a mensagem
                else{
                    $output .= '<div class="chat incoming">
                                <img src="php/images/'.$row['img'].'" alt="">
                                <div class="details">
                                    <p>'. $row['msg'] .'</p>
                                </div>
                                </div>';
                }
            }
        }
        // Se não tiver nenhuma mensagem na conversa...
        else{
            // Retorna uma mensagem
            $output .= '<div class="text">
            Nenhuma mensagem está disponível. Depois de enviar a mensagem, eles aparecerão aqui.</div>';
        }
        // Se não for nenhuma das opções, retorna vazio
        echo $output;
    }
    // Caso não exista uma sessão...
    else{
        // O usuário é redirecionado para a página de Login
        header("location: ../login.php");
    }

?>