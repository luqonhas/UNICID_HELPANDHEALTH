<?php 
  session_start();
  if(isset($_SESSION['unique_id'])){
    header("location: users.php");
  }
?>

<?php include_once "header.php"; ?>
<body>
  <div class="wrapper2">
    <section class="form login">
    <header><p>PSYQWEB</p><div class="cssload-coffee"></div></header>
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
      
      <div class="link">Não possui cadastro? <a href="cadastro.php">Cadastre-se</a></div>
      <progress class="progress-bar" value="0" max="100"></progress>

    </section>
  </div>
  
  <script src="javascript/pass-show-hide.js"></script>
  <script src="javascript/login.js"></script>
  
</div>
</form>
</body>
</html>
