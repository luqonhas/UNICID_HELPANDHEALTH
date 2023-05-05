// Seleciona o campo de digitação
const form = document.querySelector(".typing-area"),
// Seleciona o valor do ID de saída
incoming_id = form.querySelector(".incoming_id").value,
// Selecioan o input
inputField = form.querySelector(".input-field"),
// Seleciona o botão de enviar mensagem
sendBtn = form.querySelector("button"),
// Seleciona o campo da conversa
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault();
}

// Faz umas animações de liberar ou não o botão de enviar...
inputField.focus();
inputField.onkeyup = ()=>{
    if(inputField.value != ""){
        sendBtn.classList.add("active");
    }else{
        sendBtn.classList.remove("active");
    }
}

// Se clicar no botão de enviar mensagem, insere uma mensagem na conversa no banco de dados
sendBtn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              inputField.value = "";
              scrollToBottom();
          }
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}

// Faz uma animação
chatBox.onmouseenter = ()=>{
    chatBox.classList.add("active");
}

// Faz uma animação
chatBox.onmouseleave = ()=>{
    chatBox.classList.remove("active");
}

// Recebe as conversas no chat e atualiza a cada 500 milisegundos
setInterval(() =>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
            let data = xhr.response;
            chatBox.innerHTML = data;
            if(!chatBox.classList.contains("active")){
                scrollToBottom();
              }
          }
      }
    }
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("incoming_id="+incoming_id);
}, 500);

// Faz uma animação
function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  