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
      ordem: dadoColuna.child("ordem").val(),
    };

    if (
      (objetoBusca.idMensagemRecebida == idUsuarioLogado ||
        objetoBusca.idMensagemEnviada == idUsuarioLogado) &&
      (objetoBusca.idMensagemEnviada == idMensagemEnviada ||
        objetoBusca.idMensagemRecebida == idMensagemEnviada)
    ) {
      var objetoResultado = objetoBusca;

      // Adiciona a busca encontrada ao array
      buscas.push(objetoResultado);
    }
  });

  return buscas;
}

function BuscaUsuarioURLFirebase(dados, nomeColunaBusca, idUsuarioURL) {
  let idRetorno = 0;

  // Itera sobre cada usuário encontrado
  dados.forEach(function (dadoColuna) {
    // Pega o valor da coluna buscada
    var buscaEncontrada = dadoColuna.child(nomeColunaBusca).val();

    if (buscaEncontrada == idUsuarioURL) {
      idRetorno = buscaEncontrada;
    }
  });

  return idRetorno;
}

function BuscaUsuarioURLInfosFirebase(dados, idUsuarioURL) {
  buscas = [];
  emailUsuarioURL = BuscaColunaEspecificaFirebase(
    dados,
    "id",
    "email",
    idUsuarioURL
  );

  // Itera sobre cada usuário encontrado
  dados.forEach(function (dadoColuna) {
    var emailEncontrado = dadoColuna.child("email").val();

    // Verifica se o email encontrado é diferente do email do usuário logado
    if (emailUsuarioURL == emailEncontrado) {
      // Cria um objeto com os dados encontrados
      var objetoBusca = {
        id: dadoColuna.child("id").val(),
        nome: dadoColuna.child("nome").val(),
        sobrenome: dadoColuna.child("sobrenome").val(),
        email: emailEncontrado,
        status: dadoColuna.child("status").val(),
        foto: dadoColuna.child("foto").val(),
      };

      // Adiciona a busca encontrada ao array
      buscas.push(objetoBusca);
    }
  });
  return buscas;
}

// Seleciona o campo de digitação
const form = document.querySelector(".typing-area"),
  // Seleciona o valor do ID de saída
  incoming_id = form.querySelector(".incoming_id").value,
  // Selecioan o input
  inputField = form.querySelector(".input-field"),
  // Seleciona o campo da conversa
  chatBox = document.querySelector(".chat-box");

// Faz uma animação
chatBox.onmouseenter = () => {
  chatBox.classList.add("active");
};

// Faz uma animação
chatBox.onmouseleave = () => {
  chatBox.classList.remove("active");
};

// Faz uma animação
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.onsubmit = (e) => {
  e.preventDefault();
};

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

var retornoChatHTML = "";

function pegaChat() {
  // Busca os dados do usuário no Firebase
  usersRef.once("value").then(function (dadosUsuario) {
    // Obtém o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuarioURL = urlParams.get("user_id");
    const idUsuarioLogado = localStorage.getItem("idUsuario");

    if (localStorage.getItem("idUsuario")) {
      let idMensagemEnviada = idUsuarioLogado;
      let idMensagemRecebida = idUsuarioURL;
      let retornoHTML = "";

      messagesRef.once("value").then(function (dadosMessages) {
        const mensagensEncontradas = BuscaArrayMensagensFirebase(
          dadosMessages,
          idUsuarioLogado,
          idMensagemEnviada
        );

        // Ordenar as mensagens com base na propriedade "ordem"
        mensagensEncontradas.sort((a, b) => a.ordem - b.ordem);

        let totalMensagensEncontradas = mensagensEncontradas.length;

        if (totalMensagensEncontradas == 0) {
          var retornoMensagemHTML =
            '<div class="text">Nenhuma mensagem está disponível. Depois de enviar a mensagem, elas aparecerão aqui.</div>';
          document.querySelector(".chat-box").innerHTML = retornoMensagemHTML;
        } else if (totalMensagensEncontradas > 0) {
          let retornoMensagemHTML = "";

          mensagensEncontradas.forEach(function (mensagem) {
            let retornoMensagemHTML = mensagensEncontradas.map(function (
              mensagem
            ) {
              if (mensagem.idMensagemEnviada == idMensagemEnviada) {
                return `<div class="chat incoming">
                          <img src=${BuscaColunaEspecificaFirebase(
                            dadosUsuario,
                            "id",
                            "foto",
                            idMensagemEnviada
                          )} alt="">
                          <div class="details">
                              <p>${mensagem.mensagem}</p>
                          </div>
                        </div>`;
              } else {
                return `<div class="chat incoming">
                          <img src=${BuscaColunaEspecificaFirebase(
                            dadosUsuario,
                            "id",
                            "foto",
                            idMensagemRecebida
                          )} alt="">
                          <div class="details">
                              <p>${mensagem.mensagem}</p>
                          </div>
                        </div>`;
              }
            });

            retornoMensagemHTML = retornoMensagemHTML.join(""); // Converter o array em uma string

            document.querySelector(".chat-box").innerHTML = retornoMensagemHTML;

            // if (mensagem.idMensagemEnviada == idMensagemEnviada) {
            //   retornoMensagemHTML += `<div class="chat incoming">
            //           <img src=${BuscaColunaEspecificaFirebase(
            //             dadosUsuario,
            //             "id",
            //             "foto",
            //             idMensagemEnviada
            //           )} alt="">
            //           <div class="details">
            //               <p>${mensagem.mensagem}</p>
            //           </div>
            //         </div>`;
            // } else {
            //   retornoMensagemHTML += `<div class="chat incoming">
            //           <img src=${BuscaColunaEspecificaFirebase(
            //             dadosUsuario,
            //             "id",
            //             "foto",
            //             idMensagemRecebida
            //           )} alt="">
            //           <div class="details">
            //               <p>${mensagem.mensagem}</p>
            //           </div>
            //         </div>`;
            // }
          });

          // document.querySelector(".chat-box").innerHTML = retornoMensagemHTML;
          // retornoChatHTML = retornoMensagemHTML;
        }
      });
    } else {
      // O usuário é redirecionado para a página de Login
      window.location.href = "../login.html";
    }
  });
}

// Seleciona o botão de enviar mensagem
const sendBtn = document.getElementById("sendBtn");

function inserirMensagem(htmlChat) {
  if (localStorage.getItem("idUsuario")) {
    // Obtém o ID do usuário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuarioURL = urlParams.get("user_id");
    const idUsuarioLogado = localStorage.getItem("idUsuario");

    // Seleciona a mensagem
    const mensagem = document.getElementById("message").value;

    if (mensagem != "" && mensagem.length > 0) {
      messagesRef.once("value").then(function (dadosMessages) {
        const unique_id = Math.floor(Math.random() * 100000000);

        // Define a referência correta para a tabela de "menssages" no Firebase
        const insertMensagem = messagesRef.push();

        mensagensBuscadas = BuscaArrayMensagensFirebase(
          dadosMessages,
          idUsuarioLogado,
          idUsuarioLogado
        );

        totalMensagensBuscadas = mensagensBuscadas.length;

        // Insere o que recebeu para dentro do Firebase
        insertMensagem.set({
          id: unique_id,
          idMensagemEnviada: idUsuarioLogado,
          idMensagemRecebida: idUsuarioURL,
          id_usuario: idUsuarioLogado,
          mensagem: mensagem,
          ordem: ++totalMensagensBuscadas,
        });

        document.getElementById("message").value = "";

        pegaChat();
      });
    }
  } else {
    // O usuário é redirecionado para a página de Login
    window.location.href = "../login.html";
  }
}

sendBtn.addEventListener("click", inserirMensagem);

function preencherDados() {
  // Obtém o ID do usuário da URL
  const urlParams = new URLSearchParams(window.location.search);
  const idUsuarioURL = urlParams.get("user_id");

  // Busca os dados do usuário no Firebase
  usersRef.once("value").then(function (dadosUsuario) {
    let idUsuarioURLBuscado = BuscaUsuarioURLFirebase(
      dadosUsuario,
      "id",
      idUsuarioURL
    );

    if (idUsuarioURLBuscado == idUsuarioURL) {
      // Seleciona tudo sobre este usuário
      let infosBuscadasUsuarioURL = BuscaUsuarioURLInfosFirebase(
        dadosUsuario,
        idUsuarioURL
      );
      infosBuscadasUsuarioURL.forEach(function (info) {
        resultadoMensagem = info.mensagem;
        idMensagemEnviada = info.idMensagemEnviada;
        document.getElementById("user-photo").src = info.foto;
        document.getElementById("user-name").textContent =
          info.nome + " " + info.sobrenome;
      });

      pegaChat();
    } else {
      // Redireciona o usuário para tela de Conversas (Chats)
      window.location.href = "chats.html";
    }
  });
}

// Chama a função para buscar os dados do usuário quando a página é carregada
window.addEventListener("load", preencherDados);
