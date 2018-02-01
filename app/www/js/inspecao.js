$(function(){
    $("#observacao, #parecerTecnico").characterCounter();
    loadSelectFields();
    mountEvents();   
    loadData(); 
})

function mountEvents(){
    $("#partNumber").on("keyup", function(event){
        partNumberAutocomplete();
    });
    $("#partNumber").on("change", function(event){
        fillPnDescricao();
    });
}

function loadSelectFields(){
    // carrega motivos
    showLoading();
    $.ajax({
        type:"GET",
        url:`${Environment}/services/rev-motivo`,
        success: function(data) {
            $("#motivo").empty();
            $.each(data, function(index, element){
                $("#motivo").append(`<option value="${element.Id}">${element.Descricao}</option>`);
            })
            loadComponents();
            hideLoading();                        
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
            url:`${Environment}/services/part_bin/${$("#partNumber").val()}`,
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
        url:`${Environment}/services/part_bin/${$("#partNumber").val()}`,
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

function loadData(){
    id = localStorage.getItem("idRevisao");
    $.ajax({
        type:"GET",
        url:`${Environment}/services/rev/${id}/_search`,
        success: function(data) {                
            if(data[0] != undefined ){                                             
                $("select option").each(function(index, element){
                    if( $(element).prop('value') == data[0].Motivo_ID ) { 
                        $("#motivo").val(`${data[0].Motivo_ID}`);
                    }
                });
                $("#motivo").material_select();
                $("#qdadeInspecionada").val(data[0].Quantidade);
                Materialize.updateTextFields();
            }
        },
        error: function(xhr, error){
            console.log("deu ruim " + error);
        },
        dataType: 'json',
    });
}

