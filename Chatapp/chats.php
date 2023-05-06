<!-- PÁGINA DAS CONVERSAS (CHATS) -->

<?php
// Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
session_start();

// Inclui um componente com os dados disponíveis para logar no banco de dados
include_once "php/config.php";

// Verifica se já existe uma sessão existente com algum usuário
// if (!isset($_SESSION['unique_id'])) {
//   // Caso não exista mesmo, o usuário é redirecionado para a página de Login
//   header("location: login.php");
// }
?>

<!-- A componente do head (início do HTML) -->
<?php include_once "components/head.php"; ?>

<body>
  <div class="wrapper">
    <section class="users">

      <!-- Onde está o nome, a foto, o status e o botão de deslogar -->
      <header>
        <div class="content">

          <?php
          // Busca no banco de dados o usuário que está com o ID na sessão do navegador
          $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$_SESSION['unique_id']}");

          // Caso possua algum usuário com o ID...
          if (mysqli_num_rows($sql) > 0) {
            // Cria uma variável da linha exata do banco de dados para ser usado depois
            $row = mysqli_fetch_assoc($sql);
          }
          ?>

          <!-- Coloca a foto a partir do nome da foto que está no banco de dados e busca na pasta dentro do Wamp -->
          <img src="php/images/<?php echo $row['img']; ?>" alt="">

          <div class="details">
            <span>
              <!-- Coloca o nome do usuário + o sobrenome -->
              <?php echo $row['fname'] . " " . $row['lname'] ?>
            </span>
            <p>
              <!-- Coloca o status do usuário naquele momento -->
              <?php echo $row['status']; ?>
            </p>
          </div>
        </div>

        <!-- Botão para deslogar do sistema -->
        <a href="php/logout.php?logout_id=<?php echo $row['unique_id']; ?>" class="logout">Logout</a>
      </header>

      <!-- Barra de pesquisa de usuários -->
      <div class="search">
        <input type="text" placeholder="Digite...">
        <button><i class="fas fa-search"></i></button>
      </div>

      <!-- Campo no qual ficará todos as conversas desse usuário -->
      <div class="users-list">
        <!-- Aqui dentro será preenchido pelo JavaScript -->
      </div>
    </section>
  </div>

  <!-- Função JS que preenche o campo de conversas -->
  <script src="javascript/chats.js"></script>

</body>

</html>