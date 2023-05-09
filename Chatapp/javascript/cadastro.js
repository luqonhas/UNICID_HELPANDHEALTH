// Inicializa o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJiT7L-tuDBbGyJLsfMGRgc8L7-w9ixFg",
  authDomain: "chatapp-50d89.firebaseapp.com",
  databaseURL: "https://chatapp-50d89-default-rtdb.firebaseio.com",
  projectId: "chatapp-50d89",
  storageBucket: "chatapp-50d89.appspot.com",
  messagingSenderId: "57837999927",
  appId: "1:57837999927:web:ca126f2bc6030ca3f5ecb2",
};

firebase.initializeApp(firebaseConfig);

// Cria uma referência para o banco de dados
var database = firebase.database();

// Cria uma referência para o nó que contém os usuários
var usersRef = database.ref("users");

// Cria uma referência para o local onde a imagem será armazenada no Storage
// var storageRef = firebase.storage().ref().child("fotos");

function Cadastrar(nome, sobrenome, email, senha, foto) {
  if (nome && sobrenome && email && senha) {
    // Cria uma consulta para buscar todos os usuários
    usersRef.once("value").then(async function (dados) {
      // Cria um array para armazenar os e-mails buscados
      var emailsBuscados = [];

      // Itera sobre cada usuário encontrado
      dados.forEach(function (dadoColuna) {
        // Pega o valor da coluna "email" do usuário
        var emailEncontrado = dadoColuna.child("email").val();

        // Adiciona o e-mail ao array
        emailsBuscados.push(emailEncontrado);
      });

      // Verifica se o e-mail não existe no Firebase
      if (!emailsBuscados.includes(email)) {
        // Cadastra no banco de dados
        const unique_id = Math.floor(Math.random() * 100000000);
        const status = "Offline";
        const senha_criptografada = md5(senha);

        // Define a referência correta para a tabela de "users" no Firebase
        const insertUsuario = usersRef.push();

        // Insere o que recebeu para dentro do Firebase
        insertUsuario.set({
          id: unique_id,
          nome: nome,
          sobrenome: sobrenome,
          email: email,
          senha: senha_criptografada,
          foto: foto,
          status: status,
        });

        // Redireciona o usuário de volta para a página de login
        window.location.href = "login.html";
      } else {
        alert("Esse email já foi cadastrado!");
      }
    });
  }
}

// Seleciona o formulário do HTML com todos os inputs e o botão de cadastrar
const form = document.querySelector(".signup form");

// Adiciona um EventListener, que faz com que quando for feito uma requisição dentro desse formulário, possa ser utilizado numa função (como será utilizado abaixo)
form.addEventListener("submit", envioForm);

// Função de envio do formulário
function envioForm(event) {
  event.preventDefault();

  // Captura os valores dos inputs
  const nome = document.getElementById("fname").value;
  const sobrenome = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  // const foto = document.getElementById("image").files[0];
  const foto = "https://firebasestorage.googleapis.com/v0/b/chatapp-50d89.appspot.com/o/pacientes.svg?alt=media&token=f115c134-dd44-497c-9859-ef61e0fa98ad";

  Cadastrar(nome, sobrenome, email, senha, foto);
}
