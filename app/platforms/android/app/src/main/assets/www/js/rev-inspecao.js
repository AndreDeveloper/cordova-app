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
    $(".btn_inspecionar").bind("click", function(event){
        id = $(this).attr("id");
        storageInspecaoData(id);
        console.log("chamei");
        location.assign(`/inspecao.html`);
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
            url:`${getEnvironment()}/services/rev/${$("#doc").val()}/_search`,
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
            url:`${getEnvironment()}/services/rev/_search`,
            data: dataJson,
            success: function(data) {                
                $("#resultadoPesquisa").empty();
                $.each(data, function(index, element){
                    $("#resultadoPesquisa").append(mountCard(element));
                })
                hideLoading();
                mountEvents();
            },
            error: function(xhr, error){
                console.log(error);
                hideLoading();
            },
        dataType: 'json',
    });
}

function storageInspecaoData(id){
    $.ajax({
        type:"GET",
        url:`${getEnvironment()}/services/rev/${id}/_search`,
        success: function(data) {                
            if(data[0] != undefined ){
                localStorage.setItem("inspecao.anexo", data[0].Anexo);
                localStorage.setItem("inspecao.AreaSolicitante", data[0].AreaSolicitante);
                localStorage.setItem("inspecao.DataEmissao", data[0].DataEmissao);
                localStorage.setItem("inspecao.Id", data[0].Id);
                localStorage.setItem("inspecao.Item", data[0].Item);
                localStorage.setItem("inspecao.Motivo_ID", data[0].Motivo_ID);
                localStorage.setItem("inspecao.NomeSolicitante", data[0].NomeSolicitante);
                localStorage.setItem("inspecao.NotaFiscal", data[0].NotaFiscal);
                localStorage.setItem("inspecao.NumeroDoc", data[0].NumeroDoc);                
                localStorage.setItem("inspecao.Part_Number_DOC_ID", data[0].Part_Number_DOC_ID);
                localStorage.setItem("inspecao.Quantidade", data[0].Quantidade);
                localStorage.setItem("inspecao.Responsavel_ID", data[0].Responsavel_ID);                                   
            }
        },
        error: function(xhr, error){
            console.log("deu ruim " + error);
        },
        dataType: 'json',
    });
}