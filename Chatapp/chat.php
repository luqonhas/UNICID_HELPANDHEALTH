<!-- PÁGINA DA CONVERSA (CHAT) -->

<?php
// Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
session_start();

// Inclui um componente com os dados disponíveis para logar no banco de dados
include_once "php/config.php";

// Verifica se naõ existe uma sessão existente com algum usuário
if (!isset($_SESSION['unique_id'])) {
  // Caso não exista mesmo, o usuário é redirecionado para a página de Login
  header("location: login.php");
}
?>

<!-- A componente do head (início do HTML) -->
<?php include_once "components/head.php"; ?>

<body>
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