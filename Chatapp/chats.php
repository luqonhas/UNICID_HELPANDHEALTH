<!-- PÁGINA DAS CONVERSAS (CHATS) -->

<?php
  // Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
  session_start();
  
  // Inclui um componente com os dados disponíveis para logar no banco de dados
  include_once "php/config.php";
  
  // Verifica se já existe uma sessão existente com algum usuário
  if (isset($_SESSION['unique_id'])) {
    // Caso exista, o usuário é redirecionado para a tela do Chat
    header("location: chats.php");
  }
?>

<?php include_once "compontents/head.php"; ?>
<body>
  <div class="wrapper">
    <section class="users">
      <header>
        <div class="content">
          <?php 
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE unique_id = {$_SESSION['unique_id']}");
            if(mysqli_num_rows($sql) > 0){
              $row = mysqli_fetch_assoc($sql);
            }
          ?>
          <img src="php/images/<?php echo $row['img']; ?>" alt="">
          <div class="details">
            <span><?php echo $row['fname']. " " . $row['lname'] ?></span>
            <p><?php echo $row['status']; ?></p>
          </div>
        </div>
        <a href="php/logout.php?logout_id=<?php echo $row['unique_id']; ?>" class="logout">Logout</a>
      </header>
      <div class="search">
        
        <input type="text" placeholder="Digite...">
        <button><i class="fas fa-search"></i></button>
      </div>
      <div class="users-list">
  
      </div>
    </section>
  </div>

  <script src="javascript/users.js"></script>

</body>
</html>
