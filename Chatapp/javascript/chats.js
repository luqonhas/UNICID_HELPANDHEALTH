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

// Cria uma referência para o nó que contém as mensagens
var messagesRef = database.ref("messages");

async function ObtemChaveUsuarioFirebase(idUsuario) {
  let chaveUsuario = "";

  // Consulta para obter a referência da chave onde está o idUsuarioBuscado
  const usuarioRef = await usersRef
    .orderByChild("id")
    .equalTo(idUsuario)
    .once("value");

  usuarioRef.forEach(function (childSnapshot) {
    chaveUsuario = childSnapshot.key;
    return false; // Encerra o loop após encontrar a chave
  });

  return chaveUsuario;
}

function BuscaArrayMensagensFirebase(
  dados,
  idUsuarioLogado,
  idMensagemEnviada
) {
  buscas = [];

  // Itera sobre cada usuário encontrado
  dados.forEach(function (dadoColuna) {
    var objetoBusca = {
      id: dadoColuna.child("id").val(),
      idMensagemEnviada: dadoColuna.child("idMensagemEnviada").val(),
      idMensagemRecebida: dadoColuna.child("idMensagemRecebida").val(),
      mensagem: dadoColuna.child("mensagem").val(),
    };

    if (
      (objetoBusca.idMensagemRecebida == idUsuarioLogado ||
        objetoBusca.idMensagemEnviada == idUsuarioLogado) &&
      (objetoBusca.idMensagemEnviada == idMensagemEnviada ||
        objetoBusca.idMensagemRecebida == idMensagemEnviada) &&
      objetoBusca.id != idUsuarioLogado
    ) {
      var objetoResultado = objetoBusca;
      console.log(objetoResultado);
      // Adiciona a busca encontrada ao array
      buscas.push(objetoResultado);
    }
  });
  return buscas;
}

function BuscaArrayConversasFirebase(dados, nomeColunaBusca, idUsuarioLogado) {
  buscas = [];
  emailLogado = BuscaColunaEspecificaFirebase(
    dados,
    "id",
    "email",
    idUsuarioLogado
  );

  // Itera sobre cada usuário encontrado
  dados.forEach(function (dadoColuna) {
    // Pega o valor da coluna buscada
    var buscaEncontrada = dadoColuna.child(nomeColunaBusca).val();
    var emailEncontrado = dadoColuna.child("email").val();

    // Verifica se o email encontrado é diferente do email do usuário logado
    if (emailLogado != emailEncontrado) {
      // Cria um objeto com os dados encontrados
      var objetoBusca = {
        id: dadoColuna.child("id").val(),
        nome: dadoColuna.child("nome").val(),
        sobrenome: dadoColuna.child("sobrenome").val(),
        email: emailEncontrado,
        status: dadoColuna.child("status").val(),
      };

      // Adiciona a busca encontrada ao array
      buscas.push(objetoBusca);
    }
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
    if (buscaEncontrada == dadoCompara) {
      // Pega o valor da coluna que será retornada
      retorno = dadoColuna.child(nomeColunaRetorno).val();

      if (nomeColunaRetorno == "id") {
        retornoInt = dadoColuna.child(nomeColunaRetorno).val();
      } else if (
        nomeColunaRetorno == "email" ||
        nomeColunaRetorno == "senha" ||
        nomeColunaRetorno == "nome" ||
        nomeColunaRetorno == "sobrenome" ||
        nomeColunaRetorno == "foto" ||
        nomeColunaRetorno == "status"
      ) {
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

// Função para buscar os dados do usuário logado
function preencheDados() {
  // Verifica se o usuário está logado (você pode usar sua própria lógica de verificação)
  if (localStorage.getItem("idUsuario")) {
    const idUsuarioLogado = localStorage.getItem("idUsuario");

    // Busca os dados do usuário no Firebase
    usersRef.once("value").then(function (dados) {
      // Preenche os campos na página
      document.getElementById("user-photo").src = BuscaColunaEspecificaFirebase(
        dados,
        "id",
        "foto",
        idUsuarioLogado
      );
      document.getElementById("user-name").textContent =
        BuscaColunaEspecificaFirebase(dados, "id", "nome", idUsuarioLogado) +
        " " +
        BuscaColunaEspecificaFirebase(
          dados,
          "id",
          "sobrenome",
          idUsuarioLogado
        );
      document.getElementById("user-status").textContent =
        BuscaColunaEspecificaFirebase(dados, "id", "status", idUsuarioLogado);
      var usuariosBuscados = BuscaArrayConversasFirebase(
        dados,
        "email",
        idUsuarioLogado
      );
      var totalBuscas = usuariosBuscados.length;

      // ID do usuário logado em relação as mensagens
      var idMensagemEnviada = idUsuarioLogado;
      var idMensagemRecebida = 0;
      var retornoHTML = "";
      var mensagemAmostra = "";
      var voce = "";
      var offline = "";
      var hide_me;

      if (totalBuscas == 0) {
        document.getElementById("empty-user-list-message").textContent =
          "Nenhuma conversa encontrada...";
      } else if (totalBuscas > 0) {
        // Busca os dados do usuário no Firebase
        messagesRef.once("value").then(function (dadosMessages) {
          mensagensBuscadas = BuscaArrayMensagensFirebase(
            dadosMessages,
            idUsuarioLogado,
            idMensagemEnviada
          );
          totalMensagens = mensagensBuscadas.length;

          if (totalMensagens == 0) {
            document.getElementById("empty-user-list-message").textContent =
              "Nenhuma conversa encontrada...";
          } else if (totalMensagens > 0) {
            var resultadoMensagem = "";

            mensagensBuscadas.forEach(function (mensagem) {
              resultadoMensagem = mensagem.mensagem;
              idMensagemEnviada = mensagem.idMensagemEnviada;
              if (resultadoMensagem.length > 28) {
                mensagemAmostra = resultadoMensagem.substring(0, 28) + "...";
              } else {
                mensagemAmostra = resultadoMensagem;
              }

              if (mensagem.mensagem != "") {
                if (typeof mensagem.idMensagemEnviada != undefined) {
                  voce =
                    idMensagemEnviada == mensagem.idMensagemEnviada
                      ? "Você: "
                      : "";
                } else {
                  voce = "";
                }
              }

              if (
                BuscaColunaEspecificaFirebase(
                  dados,
                  "id",
                  "status",
                  mensagem.idMensagemEnviada
                ) == "Offline"
              ) {
                offline = "offline";
              } else {
                offline = "";
              }

              if (idMensagemEnviada === idUsuarioLogado) {
                hide_me = "hide";
              } else {
                hide_me = "";
              }
            });
            retornoHTML =
              '<a href="chat.php?user_id=' +
              idMensagemEnviada +
              '">' +
              '<div class="content">' +
              "<img src=" +
              BuscaColunaEspecificaFirebase(
                dados,
                "id",
                "foto",
                idMensagemEnviada
              ) +
              ' alt="">' +
              '<div class="details">' +
              "<span>" +
              BuscaColunaEspecificaFirebase(
                dados,
                "id",
                "nome",
                idMensagemEnviada
              ) +
              " " +
              BuscaColunaEspecificaFirebase(
                dados,
                "id",
                "sobrenome",
                idMensagemEnviada
              ) +
              "</span>" +
              "<p>" +
              voce +
              mensagemAmostra +
              "</p>" +
              "</div>" +
              "</div>" +
              '<div class="' +
              "status-dot " +
              (BuscaColunaEspecificaFirebase(
                dados,
                "id",
                "status",
                idMensagemEnviada
              )
                ? "Online"
                : ""
                ? "Offline"
                : "offline") +
              '">' +
              '<i class="fas fa-circle"></i></div>' +
              "</a>";

            document.querySelector(".users-list").innerHTML = retornoHTML;
          }
        });
      }
    });
  } else {
    // Redireciona o usuário de volta para a página de login
    window.location.href = "login.html";
  }
}

// Chama a função para buscar os dados do usuário quando a página é carregada
window.addEventListener("load", preencheDados);

// Seleciona o botão de logout
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", Logout);

async function Logout(event) {
    event.preventDefault();
  
    let idLogout = localStorage.getItem("idUsuario");
  
    if (idLogout) {
      let status = "Offline";
      let chaveUsuario = await ObtemChaveUsuarioFirebase(idLogout);
  
      if (chaveUsuario) {
        // Atualiza o status do usuário no Firebase
        const usuarioRef = usersRef.child(chaveUsuario);
        usuarioRef.update({ status: status });
  
        // Removendo uma sessão específica do localStorage
        localStorage.removeItem("idUsuario");
  
        // Redireciona o usuário para a página de login
        window.location.href = "login.html";
      } else {
        console.error("Chave de usuário inválida");
      }
    } else {
      // Redireciona o usuário para a página de chats
      window.location.href = "chats.html";
    }
  }
  
