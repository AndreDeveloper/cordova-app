$(function(){    
    var revisoes = JSON.parse(localStorage.getItem("pesquisa-response"));    
    $.each(revisoes, function(index, element){
        appendHtml(mountCard(element));        
    });
    mountEvents();        
});

function mountEvents(){
    $(".btn_inspecionar").unbind("click");
    $(".btn_inspecionar").bind("click", function(event){
        id = $(this).attr("id");
        localStorage.clear();
        localStorage.setItem("idRevisao", id);
        renderPage("inspecao")        
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