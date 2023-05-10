// Obtém o nome da página atual
var currentPage = window.location.pathname.split("/").pop();

// Verifica se o usuário está na página de chats ou chat
if (currentPage === "chat.html" || currentPage === "chats.html") {
  if (!localStorage.getItem("idUsuario")) {
    // Redireciona o usuário de volta para a página de login
    window.location.href = "login.html";
  }
} else if (currentPage === "login.html" || currentPage === "cadastro.html") {
  if (localStorage.getItem("idUsuario")) {
    // Redireciona o usuário para a página de chats
    window.location.href = "chats.html";
  }
}
