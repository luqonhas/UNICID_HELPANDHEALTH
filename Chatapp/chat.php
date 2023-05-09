<!-- PÁGINA DA CONVERSA (CHAT) -->

<!DOCTYPE html>

<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Help&Health</title>
  <link rel="stylesheet" href="styles/style.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
</head>

<body>
  <script src="utils/verification.js" defer></script>

  <div class="wrapper">
    <section class="chat-area">

      <!-- Onde está o botão de voltar para todas as conversas, o nome, a foto e o status -->
      <header>

        <?php
        // Pega o ID do usuário da conversa
        $user_id = mysqli_real_escape_string($conn, $_GET['user_id']);
        // Prepara uma busca de todos os usuários com o mesmo ID da variável acima no banco de dados
        $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$user_id}");

        // Caso o resultado da busca seja maior que 0...
        if (mysqli_num_rows($sql) > 0) {
          // Seleciona a linha exata na qual está o usuário
          $row = mysqli_fetch_assoc($sql);
        } else {
          // Redireciona o usuário para tela de Conversas (Chats)
          header("location: chats.php");
        }
        ?>

        <!-- Botão de voltar para a tela de Conversas (Chats) -->
        <a href="chats.php" class="back-icon"><i class="fas fa-arrow-left"></i></a>

        <!-- Foto de perfil do usuário da conversa -->
        <img src="php/images/<?php echo $row['img']; ?>" alt="">

        <div class="details">
          <span>
            <!-- Nome + sobrenome do usuário da conversa -->
            <?php echo $row['fname'] . " " . $row['lname'] ?>
          </span>
          <p>
            <!-- Status do usuário da conversa -->
            <?php echo $row['status']; ?>
          </p>
        </div>
      </header>

      <!-- Campo no qual ficará toda a conversa do usuário logado com o usuário da conversa -->
      <div class="chat-box">
        <!-- Aqui dentro será preenchido pelo JavaScript -->
      </div>

      <!-- Input no qual é utilizado para digitar o que você quer enviar para o outro usuário -->
      <form action="#" class="typing-area">
        <input type="text" class="incoming_id" name="incoming_id" value="<?php echo $user_id; ?>" hidden>
        <input type="text" name="message" class="input-field" placeholder="Mensagem..." autocomplete="off">
        <button><i class="fab fa-telegram-plane"></i></button>
      </form>
    </section>
  </div>

  <!-- Função JS que preenche o campo de conversa -->
  <script src="javascript/chat.js"></script>

</body>

</html>