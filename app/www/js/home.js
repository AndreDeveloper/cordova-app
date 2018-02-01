$(function(){
    mountEvents();
})

function mountEvents(){
    $("#btnRevInspecao").unbind("click");
    $("#btnRevInspecao").bind("click", function(event){
        renderPage("rev-inspecao");
    });    
}