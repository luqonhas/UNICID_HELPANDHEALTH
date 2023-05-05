<?php
  // Conexão com o banco de dados:

  // Nome do servidor
  $hostname = "localhost";
  // Nome do usuário
  $username = "root";
  // Senha do usuário
  $password = "";
  // Nome do banco de dados do projeto
  $dbname = "chatapp";

  $conn = mysqli_connect($hostname, $username, $password, $dbname);
  if(!$conn){
    echo "Erro de conexão com o banco de dados: ".mysqli_connect_error();
  }
?>
