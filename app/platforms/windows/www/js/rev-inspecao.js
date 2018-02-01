$(document).ready(function() {            
    mountEvents();
});

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

    $(".btn_inspecionar").unbind("click");
    $(".btn_inspecionar").bind("click", function(){
        id = $(this).attr("id");
        location.assign(`/inspecao/${id}`);
    });
}

function mountCard(rev){
    return `<div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey lighten-4">
            <div class="card-content white-text">
              <span class="card-title black-text bold">DOC: ${rev.NumeroDoc}</span>              
              <table>
                <tbody>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Status</span></td>
                        <td><span class="flow-text">${rev.descricaoStatus}</span></td>
                    </tr>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Item</span></td>
                        <td><span class="flow-text">${rev.Item}</span></td>
                    </tr>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Part_Code</span></td>
                        <td><span class="flow-text">${rev.partCodeDocDescricao}</span></td>
                    </tr>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Descrição</span></td>
                        <td><span class="flow-text">${rev.partNumberDocDescricao}</span></td>
                    </tr>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Quantidade</span></td>
                        <td><span class="flow-text">${rev.Quantidade}</span></td>
                    </tr>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Motivo</span></td>
                        <td><span class="flow-text">${rev.motivoDescricao}</span></td>
                    </tr>
                    <tr>
                        <td><span class="Heading h5 black-text bold">Area Socilitante:</span></td>
                        <td><span class="flow-text">${rev.AreaSolicitante}</span></td>
                    </tr>
                </tbody>
              </table>                                  
            </div>
            <div class="card-action center-align">
              <a id="${rev.NumeroDoc}" class="waves-effect waves-light green accent-4 btn btn_inspecionar"><i class="material-icons right">edit</i>Inspecionar</a>              
            </div>
          </div>
        </div>
      </div>`
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
            url:`${getEnvironment()}/services/rev/${$("#doc").val()}`,
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
            url:`${getEnvironment()}/services/rev/pesquisa`,
            data: dataJson,
            success: function(data) {                
                $("#resultadoPesquisa").empty();
                $.each(data, function(index, element){
                    $("#resultadoPesquisa").append(mountCard(element));
                })
                hideLoading();
            },
            error: function(xhr, error){
                console.log(error);
                hideLoading();
            },
        dataType: 'json',
    });
}