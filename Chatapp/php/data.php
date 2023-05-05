<?php
// Enquanto a variável $row (a linha exata do usuário logado no banco de dados) estiver buscando as conversas (usuários) que existem no banco de dados...
while ($row = mysqli_fetch_assoc($query)) {
    // Seleciona todas as mensagens que existem do usuário logado
    $sql2 = "SELECT * FROM messages WHERE (incoming_msg_id = {$row['unique_id']}
                OR outgoing_msg_id = {$row['unique_id']}) AND (outgoing_msg_id = {$outgoing_id} 
                OR incoming_msg_id = {$outgoing_id}) ORDER BY msg_id DESC LIMIT 1";

    // Variável que faz a busca no banco de dados
    $query2 = mysqli_query($conn, $sql2);
    // Variável salva a linha exata da conversa
    $row2 = mysqli_fetch_assoc($query2);

    // Caso o resultado das buscas sejam maior que 0, retorna as mensagens que o usuário tem naquela conversa, mas caso não seja maior que 0, retorna uma mensagem
    (mysqli_num_rows($query2) > 0) ? $result = $row2['msg'] : $result = "Nenhuma mensagem disponível";

    // Caso o resultado final (a variável de cima "$result"), que no caso seria a última mensagem que fica aparecendo como uma pré-visualização na conversa tenha a quantidade de caracteres maior que 28, corta o resto da conversa e coloca "..." (por exemplo, "suco de maracujá é muit..."), mas caso não seja maior que 28 caracteres, não corta a mensagem (por exemplo, "suco de maracujá")
    (strlen($result) > 28) ? $msg = substr($result, 0, 28) . '...' : $msg = $result;

    // Se existe um ID de saída...
    if (isset($row2['outgoing_msg_id'])) {
        // Caso a variável com o ID de saída seja igual ao ID de saída que está no banco de dados, define se a mensagem é sua ou não
        ($outgoing_id == $row2['outgoing_msg_id']) ? $you = "Você: " : $you = "";
    } else {
        $you = "";
    }

    // Caso o status no banco de dados seja "Offline now", fica como "offline", caso não, não aparece nada
    ($row['status'] == "Offline now") ? $offline = "offline" : $offline = "";

    // Caso a variável com o ID de saída seja igual ao ID de usuário que está no banco de dados, define uma variável com "hide" ou vazia
    ($outgoing_id == $row['unique_id']) ? $hid_me = "hide" : $hid_me = "";

    // Retorna um código HTML com o campo da conversa
    $output .= '<a href="chat.php?user_id=' . $row['unique_id'] . '">
                    <div class="content">
                        <img src="php/images/' . $row['img'] . '" alt="">
                        <div class="details">
                            <span>' . $row['fname'] . " " . $row['lname'] . '</span>
                            <p>' . $you . $msg . '</p>
                        </div>
                    </div>
                    
                    <div class="status-dot ' . $offline . '"><i class="fas fa-circle"></i></div>
                </a>';
}
?>