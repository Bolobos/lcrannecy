var lignes = 1;

const btn = document.getElementById("id02");

const download = document.getElementById("id20");

/*const txt = document.getElementById("id01");*/
btn.addEventListener("click", function(e){
    lignes += 1;
    var table = document.getElementById("PrincipalTable");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    cell1.innerHTML = "<input>";
    cell1.querySelector("input").setAttribute("id", "c1"+lignes);
    cell2.innerHTML = "<input>";
    cell2.querySelector("input").setAttribute("id", "c2"+lignes);
    cell3.innerHTML = "<input>";
    cell3.querySelector("input").setAttribute("id", "c3"+lignes);
    cell4.innerHTML = "<input>";
    cell4.querySelector("input").setAttribute("id", "c4"+lignes);
    cell5.innerHTML = "";
    cell5.setAttribute("id", "c5"+lignes);
});



$(document).on('change','#PrincipalTable input', function(e) {

    var data = $(this).val();
    var location = $(this).attr("id");
    var lenId = location.length;

    if (lenId < 4){
        var selligne = location.slice(-1)
    }
    else{
        var selligne = location.slice(-2)
    }
    
    prTotPro = document.getElementById("c5"+selligne);
    //console.log(document.getElementById("c3"+selligne).value);
    prTotPro.textContent = document.getElementById("c3"+selligne).value * document.getElementById("c4"+selligne).value;
    //rTotCag.innerHTML() = "AAAAAAA";
    
    prTotCag = document.getElementById("IDPrTotCag");
    var result = 0;
    console.log(document.getElementById("c51"))
    for (let iBcl = 1; iBcl <= lignes; iBcl++) {
        result = result + Number(document.getElementById("c5"+iBcl).textContent);
    }
    prTotCag.textContent = "";
    prTotCag.textContent = "Prix total par cagette :   " + result;
    

    console.log(data,location,lenId,selligne);
    
    
    
    /*for (let iBcl2 = 1; iBcl2 <= lignes; iBcl2++) {
        
    }*/
    
  });


  function tableToJson(table) {
    var data = [];

    // first row needs to be headers
    var headers = [];
    for (var i=0; i<table.rows[0].cells.length; i++) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
    }

    // go through cells
    for (var i=1; i<table.rows.length; i++) {

        var tableRow = table.rows[i];
        var rowData = {};

        for (var j=0; j<tableRow.cells.length; j++) {
            var yo = document.getElementById(tableRow.cells[j].innerHTML.substring(24,27));
            console.log(yo);
            rowData[ headers[j] ] = yo;
            console.log(rowData[ headers[j] ]);

        }

        data.push(rowData);
    }       

    return data;
}




function dowloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


download.addEventListener("click", function(e){
    var myjson = JSON.stringify(tableToJson(PrincipalTable));
    dowloadObjectAsJson(myjson,"test");
    console.log(myjson);
    console.log(PrincipalTable);
});