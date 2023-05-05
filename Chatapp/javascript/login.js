// Seleciona o formulário do HTML com todos os inputs e o botão de cadastrar
const form = document.querySelector(".login form"),
// Seleciona o botão de cadastro dentro do formulário HTML
continueBtn = form.querySelector(".button input"),
// Seleciona o campo de erro dentro do formulário HTML
errorText = form.querySelector(".error-text");

form.onsubmit = (e)=>{
    e.preventDefault();
}

// Quando clicar no botão de login...
continueBtn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    // Envia uma requisição para a função PHP de cadastro
    xhr.open("POST", "php/login.php", true);

    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          // Verifica se a requisição deu certo
          if(xhr.status === 200){
              let data = xhr.response;

              // Verifica se a requisição foi um sucesso
              if(data === "success"){
                // Redireciona o usuário para a tela de chats
                location.href = "chats.php";
              }else{
                errorText.style.display = "block";
                errorText.textContent = data;
              }
          }
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}
const progressBar = document.querySelector('.progress-bar');
const submitBtn = document.querySelector('input[type="submit"]');

submitBtn.addEventListener('click', function() {
  progressBar.style.display = 'block';
  let value = 0;
  let progressInterval = setInterval(function() {
    if (value >= 100) {
      clearInterval(progressInterval);
      window.location.href = 'chats.php';
    } else {
      value++;
      progressBar.value = value;
    }
  }, 30);
});
