// Seleciona o Input de "Senha"
const pswrdField = document.querySelector(".form input[type='password']"),
// Seleciona o ícone de "Olho"
toggleIcon = document.querySelector(".form .field i");

// Quando clicar no ícone de "Olho"...
toggleIcon.onclick = () =>{
  // Se o Input está com o tipo de senha...
  if(pswrdField.type === "password"){
    // Altera o tipo do Input para texto
    pswrdField.type = "text";
    // Altera o ícone
    toggleIcon.classList.add("active");
  }
  // Se não...
  else{
    // Altera o tipo do Input para senha
    pswrdField.type = "password";
    // Altera o ícone
    toggleIcon.classList.remove("active");
  }
}
