// Seleciona a barra de pesquisa
const searchBar = document.querySelector(".search input"),
// Seleciona o botão de pesquisa
searchIcon = document.querySelector(".search button"),
// Seleciona o campo da lista de usuários (onde ficará as conversas)
usersList = document.querySelector(".users-list");

// Se clicar no ícone de lupa... Faz umas animações
searchIcon.onclick = ()=>{
  searchBar.classList.toggle("show");
  searchIcon.classList.toggle("active");
  searchBar.focus();
  if(searchBar.classList.contains("active")){
    searchBar.value = "";
    searchBar.classList.remove("active");
  }
}

searchBar.onkeyup = ()=>{
  let searchTerm = searchBar.value;
  if(searchTerm != ""){
    searchBar.classList.add("active");
  }else{
    searchBar.classList.remove("active");
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/search.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          usersList.innerHTML = data;
        }
    }
  }
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("searchTerm=" + searchTerm);
}

// Pesquisa todas as conversas após 500 milisegundos que o usuário acessar a página e preenche o campo da lista de usuários (conversas)
setInterval(() =>{
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/chats.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          let data = xhr.response;
          if(!searchBar.classList.contains("active")){
            usersList.innerHTML = data;
          }
        }
    }
  }
  xhr.send();
}, 500);

