
// Cria uma referência para o banco de dados
var database = firebase.database();

// Cria uma referência para o nó que contém os usuários
var usersRef = database.ref("users");

async function ObtemChaveUsuarioFirebase(idUsuario) {
  let chaveUsuario = "";

  // Consulta para obter a referência da chave onde está o idUsuarioBuscado
  const usuarioRef = await usersRef.orderByChild("id").equalTo(idUsuario).once("value");

  usuarioRef.forEach(function (childSnapshot) {
    chaveUsuario = childSnapshot.key;
    return false; // Encerra o loop após encontrar a chave
  });

  return chaveUsuario;
}

function BuscaArrayColunasFirebase(dados, nomeColunaBusca) {
  buscas = [];

  // Itera sobre cada usuário encontrado
  dados.forEach(function (dadoColuna) {
    // Pega o valor da coluna buscada
    var buscaEncontrada = dadoColuna.child(nomeColunaBusca).val();

    // Adiciona a busca encontrada ao array
    buscas.push(buscaEncontrada);
  });

  return buscas;
}

function BuscaColunaEspecificaFirebase(
  dados,
  nomeColunaBusca,
  nomeColunaRetorno,
  dadoCompara
) {
  retornoString = "";
  retornoInt = 0;

  // Itera sobre cada usuário encontrado
  dados.forEach(function (dadoColuna) {
    // Pega o valor da coluna buscada
    var buscaEncontrada = dadoColuna.child(nomeColunaBusca).val();

    // Verifica se a busca atual é o que precisa ser buscado
    if (buscaEncontrada === dadoCompara) {
      // Pega o valor da coluna que será retornada
      retorno = dadoColuna.child(nomeColunaRetorno).val();

      if (nomeColunaRetorno == "id") {
        retornoInt = dadoColuna.child(nomeColunaRetorno).val();
      } else if (nomeColunaRetorno == "email" || nomeColunaRetorno == "senha") {
        retornoString = dadoColuna.child(nomeColunaRetorno).val();
      }
    }
  });

  if (retornoString != "") {
    return retornoString;
  } else {
    return retornoInt;
  }
}

// Função que faz a autenticação do usuário
function Login(email, senha) {
  if (email && senha) {
    // Cria uma consulta para buscar todos os usuários
    usersRef.once("value").then(async function (dados) {
      // Cria um array para armazenar os e-mails buscados
      var emailsBuscados = BuscaArrayColunasFirebase(dados, "email");
      let idUsuarioBuscado = BuscaColunaEspecificaFirebase(
        dados,
        "email",
        "id",
        email
      );

      // Verifica se o e-mail existe no Firebase
      if (emailsBuscados.includes(email)) {
        // Busca a senha do usuário com o e-mail inserido
        let senhaUsuarioBuscado = BuscaColunaEspecificaFirebase(
          dados,
          "email",
          "senha",
          email
        );
        // Criptografa a senha inserida
        let senhaInseridaCriptografada = md5(senha);

        if (senhaUsuarioBuscado === senhaInseridaCriptografada) {
          const status = "Online";
          const chaveUsuario = await ObtemChaveUsuarioFirebase(idUsuarioBuscado);

          // Atualiza o status do usuário no Firebase
          const usuarioRef = usersRef.child(chaveUsuario);
          usuarioRef.update({ status: status });

          // Salva o id do usuário no localStorage
          localStorage.setItem("idUsuario", idUsuarioBuscado);

          // Redireciona o usuário para a página de chats
          window.location.href = "formulario.html";

        } else {
          alert("E-mail e/ou senha incorretos!");
        }
      } else {
        alert("Usuário não encontrado!");
      }
    });
  }
}



// Seleciona o formulário do HTML com todos os inputs e o botão de cadastrar
const btnLogin = document.getElementById("btnLogin");

// Adiciona um EventListener, que faz com que quando for feito uma requisição dentro desse formulário, possa ser utilizado numa função (como será utilizado abaixo)
btnLogin.addEventListener("click", envioForm);

function envioForm(event) {
  event.preventDefault();
  // Captura os valores dos inputs
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  Login(email, senha);
}