<?php
    session_start();
    include_once "config.php";

    // Criando variáveis de cada informação dos inputs da página de "Cadastro":

    // Variável do input "Nome"
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    // Variável do input "Sobrenome"
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    // Variável do input "Email"
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    // Variável do input "Senha"
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    // Verifica se alguma dessas variáveis está vazia
    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){

        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            // Cria uma variável com o SELECT no SQL, filtrando apenas os e-mails
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");

            // Verifica se o e-mail que está sendo cadastrado já está cadastrado no banco de dados
            if(mysqli_num_rows($sql) > 0){
                echo "$email - Esse e-mail já está cadastrado!";
            }else{
                if(isset($_FILES['image'])){

                    // Cria variáveis sobre a imagem:

                    // Variável do nome da imagem
                    $img_name = $_FILES['image']['name'];
                    // Variável do tipo da imagem
                    $img_type = $_FILES['image']['type'];
                    // Variável do nome temporário da imagem
                    $tmp_name = $_FILES['image']['tmp_name'];
                    // Variável que "estoura" o nome da imagem pelo ".", por exemplo, 'imagem.png' estourada pelo ".", fica "imagem" e "png"
                    $img_explode = explode('.',$img_name);
                    // Variável da extensão da imagem
                    $img_ext = end($img_explode);
                    // Variável com as extensões que serão aceitas
                    $extensions = ["jpeg", "png", "jpg"];

                    // Verifica se existe algum valor dentro da variável do fim da extensão e das extensões que podem ser aceitas
                    if(in_array($img_ext, $extensions) === true){
                        // Variável dos tipos de imagem
                        $types = ["image/jpeg", "image/jpg", "image/png"];

                        // Verifica se existem os tipos de imagem
                        if(in_array($img_type, $types) === true){
                            // Variável que salva a hora do momento
                            $time = time();

                            // Variável que junta o tempo com o nome da imagem
                            $new_img_name = $time.$img_name;

                            if(move_uploaded_file($tmp_name,"images/".$new_img_name)){
                                $ran_id = rand(time(), 100000000);
                                $status = "Online Agora";
                                $encrypt_pass = md5($password);

                                // INSERT no banco de dados com o cadastro com sucesso
                                $insert_query = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status)
                                VALUES ({$ran_id}, '{$fname}','{$lname}', '{$email}', '{$encrypt_pass}', '{$new_img_name}', '{$status}')");

                                if($insert_query){
                                    // Verifica se o e-mail cadastrado agora está no banco de dados
                                    $select_sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                                    
                                    if(mysqli_num_rows($select_sql2) > 0){
                                        $result = mysqli_fetch_assoc($select_sql2);
                                        $_SESSION['unique_id'] = $result['unique_id'];
                                        echo "success";
                                    }else{
                                        echo "Este endereço de e-mail não existe!";
                                    }
                                }else{
                                    echo "
                                    Algo deu errado. Por favor, tente novamente!";
                                }
                            }
                        }else{
                            echo "
                            Carregue um arquivo de imagem - jpeg, png, jpg";
                        }
                    }else{
                        echo "Carregue um arquivo de imagem - jpeg, png, jpg";
                    }
                }
            }
        }else{
            echo "$email não é um e-mail válido!";
        }
    }else{
        echo "Todos os campos de entrada são obrigatórios!";
    }
?>