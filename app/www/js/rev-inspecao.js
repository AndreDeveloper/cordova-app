$(function(){
    mountEvents();
})

function mountEvents(){
    $("#partNumber").on("keyup", function(event){
        partNumberAutocomplete();
    });

    $("#doc").on("keyup", function(event){    
        docAutocomplete();
    });

    $("#btnPesquisarRev").unbind("click");
    $("#btnPesquisarRev").bind("click", function(event){
        searchRev();
    });

    $("#btnNovaRev").unbind("click");
    $("#btnNovaRev").bind("click", function(event){
        renderPage("nova-rev")
    });

    $(".btn_inspecionar").unbind("click");
    $(".btn_inspecionar").bind("click", function(event){
        id = $(this).attr("id");
        storageInspecaoData(id);
        console.log("chamei");
        location.assign(`/inspecao.html`);
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
                dados += "}"                
                $('#partNumber').autocomplete({
                    data: JSON.parse(dados),
                    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                    onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                    },
                    minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
            },
            error: function(xhr, error){
                console.log("deu ruim " + error);
            },
            dataType: 'json',
        });
    }
}

function docAutocomplete(){
    if ($("#doc").val().length >= 2){
        $.ajax({
            type:"GET",
            url:`${Environment}/services/rev/${$("#doc").val()}/_search`,
            success: function(data) {                
                var dados = "{";
                $.each(data, function(index, element){
                    dados += "\"" + element.NumeroDoc + "\":\"\","
                });
                dados = dados.substring(0, dados.length - 1);
                dados += "}";                     
                $('#doc').autocomplete({
                    data: JSON.parse(dados),
                    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                    onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                    },
                    minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
                });
            },
            error: function(xhr, error){
                console.log("deu ruim " + error);
            },
            dataType: 'json',
        });
    }
}

function searchRev(){
    showLoading();
    var dataJson = {
        NumeroDoc: $("#doc").val(),
        status: $("#status").val(),
        partCode: $("#partNumber").val()
    }
        $.ajax({
            type:"POST",
            url:`${Environment}/services/rev/_search`,
            data: dataJson,            
            success: function(data) {                
                if(data.length > 0){
                    localStorage.setItem("pesquisa-response", JSON.stringify(data));
                    hideLoading();
                    renderPage("pesquisa-response");
                }else{
                    hideLoading();
                    showAlert("Nenhuma rev encontrada.", mensagem.tipo.info);
                }                
            },
            error: function(xhr, error){
                console.log(error);
                hideLoading();
            },
        dataType: 'json',
    });
}
