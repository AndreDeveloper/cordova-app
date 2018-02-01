$(document).ready(function(){
    loadSelectFields();
    mountEvents();
    $('#form').attr('action', `${getEnvironment()}/services/rev`);
});

function mountEvents(){
    $("#partNumber").on("keyup", function(event){
        partNumberAutocomplete();
    });
    $("#partNumber").on("change", function(event){
        fillPnDescricao();
    });
    
    $("#salvar").unbind("click");
    $("#salvar").bind("click", function(event){
        postData();
    });
}

function loadSelectFields(){
    // carrega motivos
    showLoading();
    $.ajax({
        type:"GET",
        url:`${getEnvironment()}/services/rev-motivo`,
        success: function(data) {
            $("#motivo").empty();
            $.each(data, function(index, element){
                $("#motivo").append(`<option value="${element.Id}">${element.Descricao}</option>`);
            })

            $.ajax({
                type:"GET",
                url:`${getEnvironment()}/services/rev-responsavel`,
                success: function(data) {
                    $("#responsavel").empty();
                    $.each(data, function(index, element){
                        $("#responsavel").append(`<option value="${element.Id}">${element.Nome}</option>`);
                    })
                    $('select').material_select();
                    hideLoading();
                },
                error: function(xhr, error){
                    hideLoading();
                },
                dataType: 'json',
            });
        },
        error: function(xhr, error){
            hideLoading();
        },
        dataType: 'json',
    });
}

function partNumberAutocomplete(){
    if ($("#partNumber").val().length >= 2){
        $.ajax({
            type:"GET",
            url:`${getEnvironment()}/services/part_bin/${$("#partNumber").val()}`,
            success: function(data) {
                var dados = "{";
                $.each(data, function(index, element){
                    dados += "\"" + element.PART_CODE + "\":\"\","
                });
                dados = dados.substring(0, dados.length - 1);
                dados += "}";
                var json="";
                try {
                    json = JSON.parse(dados);
                    $('#partNumber').autocomplete({
                        data: json,
                        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                        onAutocomplete: function(val) {
                        // Callback function when value is autcompleted.
                        },
                        minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
                    });
                } catch (error) {
                    
                }                
            },
            error: function(xhr, error){
                console.log("deu ruim " + error);
            },
            dataType: 'json',
        });
    }
}

function fillPnDescricao(){
    showLoading();
    $.ajax({
        type:"GET",
        url:`${getEnvironment()}/services/part_bin/${$("#partNumber").val()}`,
        success: function(data) {
            try {                
                if(data[0].DESCRICAO != undefined)
                {
                    $("#pnDescricao").val(data[0].DESCRICAO);
                }else{
                    $("#pnDescricao").val("Part number inexistente!");
                }
            } catch (error) {
                $("#pnDescricao").val("Part number inexistente!");
            }
            
            Materialize.updateTextFields();
            hideLoading();
        },
        error: function(xhr, error){
            console.log(error);
            hideLoading();
        },
        dataType: 'json',
    });
}

function postData(){
    showLoading();
    
    $("#form").ajaxSubmit({
        error: function(err) {
            showAlert("Ocorreu um erro ao incluir a revisão, Erro:" + err.responseText,"error");
            hideLoading();            
        },
        success: function(response) {                
            showAlert("Revisão incluida com sucesso!","success");
            hideLoading();                
            clearCampos();
        }
    });
    
    return false;    
}

function clearCampos(){
    $("form input").each(function(index, element){
        $(element).val("");
    });
    $("html").scrollTop(0);
}