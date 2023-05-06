<!-- PÁGINA DO CADASTRO -->

<?php
// Inicia uma sessão de requisições com POST ou GET, possibilitando que cadastre ou faça login, ou até mesmo envie alguma informação para o banco dados
session_start();

// Verifica se já existe uma sessão existente
if (isset($_SESSION['unique_id'])) {
  // Caso exista, o usuário é redirecionado para a página das Conversas (Chats)
  header("location: login.php");
}
?>

<!-- A componente do head (início do HTML) -->
<?php include_once "components/head.php"; ?>

<body>
  <div class="wrapper2">
    <section class="form signup">

      <!-- Onde está o nome e a caneca -->
      <header>
        <p>Help&Health</p>
        <div class="cssload-coffee"></div>
      </header>

      <!-- Onde está todo formulário com os inputs que serão enviados para o banco de dados -->
      <form action="#" method="POST" enctype="multipart/form-data" autocomplete="off">
        <div class="error-text"></div>
        <div class="name-details">
          <div class="field input">
            <label>Nome</label>
            <input type="text" id="fname" placeholder="Nome..." required>
          </div>
          <div class="field input">
            <label>Sobrenome</label>
            <input type="text" id="lname" placeholder="Sobrenome..." required>
          </div>
        </div>
        <div class="field input">
          <label>Email</label>
          <input type="text" id="email" placeholder="E-mail..." required>
        </div>
        <div class="field input">
          <label>Senha</label>
          <input type="password" id="password" placeholder="Senha..." required>
          <i class="fas fa-eye"></i>
        </div>
        <div class="field image">
          <label>Seleciona uma foto de perfil:</label>
          <input type="file" id="image"  accept=".jpg,.jpeg,.png" required>
        </div>
        <div class="field button">
          <input type="submit" name="submit" value="Entrar">
        </div>
      </form>

      <div class="link">Já possui cadastro? <a href="login.php">Login</a></div>
    </section>
  </div>

  <!-- Função JS que faz com que o Firebase funcione -->
  <script src="https://www.gstatic.com/firebasejs/4.3.0/firebase.js"></script>
  <!-- Função JS que faz com que apareça ou não a senha -->
  <script src="javascript/pass-show-hide.js"></script>
  <!-- Função JS que faz o cadastro do usuário -->
  <script src="javascript/cadastro.js"></script>

</body>

</html>