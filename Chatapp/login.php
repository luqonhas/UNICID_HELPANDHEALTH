<!-- PÁGINA DO LOGIN -->

<?php
// Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
session_start();

// Verifica se já existe uma sessão existente com algum usuário
if (isset($_SESSION['unique_id'])) {
  // Caso exista, o usuário é redirecionado para a página das Conversas (Chats)
  header("location: chats.php");
}
?>

<!-- A componente do head (início do HTML) -->
<?php include_once "components/head.php"; ?>

<body>
  <div class="wrapper2">
    <section class="form login">

      <!-- Onde está o nome e a caneca -->
      <header>
        <p>Help&Health</p>
        <div class="cssload-coffee"></div>
      </header>

      <!-- Onde está todo formulário com os inputs que serão enviados para o banco de dados -->
      <form action="#" method="POST" enctype="multipart/form-data" autocomplete="off">
        <div class="field input">
          <label>Email</label>
          <input type="text" name="email" placeholder="E-mail..." required>
        </div>
        <div class="field input">
          <label>Senha</label>
          <input type="password" name="password" placeholder="Senha..." required>
          <i class="fas fa-eye"></i>
        </div>
        <div class="field button">
          <input type="submit" name="submit" value="Entrar">
        </div>
      </form>

      <div class="link">Não possui cadastro? <a href="cadastro.php">Cadastre-se</a></div>
    </section>
  </div>

  <!-- Função JS que faz com que apareça ou não a senha -->
  <script src="javascript/pass-show-hide.js"></script>
  <!-- Função JS que faz o login do usuário -->
  <script src="javascript/login.js"></script>
  
</body>

</html>