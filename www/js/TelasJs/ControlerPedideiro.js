


var PedideiroManager = {

    basePath: function () { return 'http://localhost:64817/api'; },

    loginUsuario : function(){
        
        var data = {
            grant_type: 'password',
            username: $("#txtEmail").val(),
            password: $("#txtSenha").val()
        }

        $.ajax({
            url: this.basePath()+'/security/token',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: data
        })
        .done(function (data) {

            console.log(data);
            //  $("#result-area").append("<p>" + data.access_token + "</p>");
            localStorage.setItem('jtoken', data.access_token);
            window.location.href = "#fornecedores";
           
        })
        .error(function (data) {
            alert('Usuário ou senha inválidos');
            //$("#result-area").append("<p>Usuário ou senha inválidos</p>");
        });



    },//Funcao login de usuario.

    criarUsuario : function(){


        var usuario = null;
        usuario = {
            Nome: $("#txtNome").val(),
            Email: $("#txtEmail").val(),
            Fone: $("#txtTelefone").val(),
            Endereco: $("#txtEndereco").val(),
            Complemento: $("#txtComplemento").val(),
            NumeroCasa: $("#txtNumero").val(),
            Senha: $("#txtSenha").val()


        }

        $(function () {

            $.ajax({
                type: "POST",
                data: JSON.stringify(usuario),
                url: this.basePath + "/pedideiro/usuario/criar",
                contentType: "application/json"

            }).done(function (data) {

                showAlert(data, 'Info', 'OK');
                window.location.href = '#index';
            }).error(function (data) {

                showAlert(data.responseText, 'Erro', 'OK');
            });

        });

    },//Funcao para criar usuario.   

    carregarFornecedores: function () {

        var token = localStorage.getItem('jtoken');

        $.ajax({
            url:   this.basePath() + "/pedideiro/fornecedores/todos",
            type: 'GET',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .done(function (data) {
            $("#lista_fornecedores").empty();
            $.each(data, function (key, item) {
                // Add a list item for the product.
               
                $("#lista_fornecedores").append(
                        " <li>" +
                        " <a href='#fornecedorProdutos' data-transition='slide'>" +
                        " <i class='flaticon-transport643'></i>" +
                        " <div class='list-info'>" +
                        " <h3>"+item.Nome+"</h3>" +
                        " <span class='list-info-footer'><i class='icon-location-6 mini-icon'></i> Conjunto Esperança</span>" +
                        " </div>" +
                        " </a>" +
                        " </li>")
            });
            // $("#result-area").append("<p>" + data + "</p>");
            $('#lista_fornecedores').listview('refresh');
        })
        .error(function (error) {

            if (error.status == 401) {
                window.location.href = '#index';
            }


            //$("#result-area").append("<p>Falha na requisição</p>");
        });



    },//Funcao para lista os fornecedores.
        
    logoffUsuario: function() {

        localStorage.setItem('jtoken', '');
        window.location.href = '#index';

    },//logoff da aplicacao.
    
    


}