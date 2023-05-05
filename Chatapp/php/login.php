<?php 
    session_start();
    include_once "config.php";

    // Criando variáveis de cada informação dos inputs da página de "Login":

    // Variável do input "Email"
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    // Variável do input "Senha"
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Verifica se alguma dessas variáveis está vazia
    if(!empty($email) && !empty($password)){
        // Cria uma variável com o SELECT no SQL, filtrando apenas os e-mails
        $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");

        // Verifica se existe um e-mail cadastrado no banco de dados com o e-mail que está no input
        if(mysqli_num_rows($sql) > 0){
            // Variável que pega a linha na qual está localizada o e-mail existente
            $row = mysqli_fetch_assoc($sql);
            // Variável que de criptografa a senha inserida no input
            $user_pass = md5($password);
            // Variável que pega a senha criptografada no banco de dados
            $enc_pass = $row['password'];
            
            // Verifica se a senha criptografada no input é a mesma senha criptografada do banco de dados
            if($user_pass === $enc_pass){
                // Variável para o status do usuário
                $status = "Online";
                // Variável que atualiza o status do usuário com um UPDATE no banco de dados
                $sql2 = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");
                
                // Verifica se o UPDATE foi feito com sucesso
                if($sql2){
                    // Cria uma sessão na página com o usuário
                    $_SESSION['unique_id'] = $row['unique_id'];
                    echo "success";
                }else{
                    echo "Algo deu errado. Por favor, tente novamente!";
                }
            }else{
                echo "E-mail ou senha está incorreto!";
            }
        }else{
            echo "$email - Este e-mail não existe!";
        }
    }else{
        echo "Todos os campos de entrada são obrigatórios!";
    }
?>