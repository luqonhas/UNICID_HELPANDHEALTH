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
var storageRef = firebase.storage().ref().child("fotos");



// Salva o usuário no Firebase
function salvarUsuario(id, nome, sobrenome, email, senha, foto, status) {
  // Define a referência correta para a tabela de "users" no Firebase
  const insertUsuario = usersRef.push();

  // Insere o que recebeu para dentro do Firebase
  insertUsuario.set({
    id: id,
    nome: nome,
    sobrenome: sobrenome,
    email: email,
    senha: senha,
    foto: foto,
    status: status
  });

  // Redireciona para a página de Login
  window.location.href = 'login.php';
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
  const foto = document.getElementById("image").files[0];

  if (nome && sobrenome && email && senha && foto) {
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
        // Salva a imagem no storage do Firebase:
        const tempo = new Date().getTime();
        var extensions = ["jpeg", "png", "jpg"];
        var novoNomeImagem = `${tempo}_${foto.name}`;
        var extensaoImagem = novoNomeImagem.split(".")[1];

        if (extensions.includes(extensaoImagem)) {
          var imagemRef = storageRef.child(`images/${novoNomeImagem}`);
          await imagemRef.put(foto);
          const imagemUrl = await imagemRef.getDownloadURL();

          // Cadastra no banco de dados
          const unique_id = Math.floor(Math.random() * 100000000);
          const status = "Online Agora";

          // Faz o upload do arquivo para o Storage
          imagemRef.put(foto).then(function (dados) {
            // Salva o usuário
            salvarUsuario(
              unique_id,
              nome,
              sobrenome,
              email,
              senha,
              imagemUrl,
              status
            );
          });
        } else {
          alert('Carregue um arquivo de imagem: jpeg, png ou jpg"', error);
        }
      } else {
        alert("Esse email já foi cadastrado!");
      }
    });
  }
}