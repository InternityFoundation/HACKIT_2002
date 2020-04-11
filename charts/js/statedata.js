var state_code = [];    // holds statecode in format "IN-AS"
var state_confirm = [];
var state_active = [];
var state_recover = [];
var state_decease = [];
function load_data() {
    // load json file for odisha state
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.covid19india.org/data.json", false );
    xmlHttp.send( null );
    var bodytext = xmlHttp.responseText;

    data_json=JSON.parse(bodytext);

    var indiaTotalConfirmed=0;
    var indiaTotalActive=0;
    var indiaTotalRecovered=0;
    var indiaTotalDeceased=0;
    indiaTotalConfirmed += parseInt(data_json.statewise[0].confirmed);
    indiaTotalActive += parseInt(data_json.statewise[0].active);
    indiaTotalRecovered += parseInt(data_json.statewise[0].recovered);
    indiaTotalDeceased += parseInt(data_json.statewise[0].deaths);

    // register statecode and stats from each state
    for(var i=1; i<data_json.statewise.length; i++) {
        state_code[i] = "IN-"+data_json.statewise[i].statecode;
        state_confirm[i] = parseInt(data_json.statewise[i].confirmed);
        state_active[i] = parseInt(data_json.statewise[i].active);
        state_recover[i] = parseInt(data_json.statewise[i].recovered);
        state_decease[i] = parseInt(data_json.statewise[i].deaths);
    }

    document.getElementById("indiaconfirmed").innerHTML = indiaTotalConfirmed;
    document.getElementById("indiaactive").innerHTML = indiaTotalActive;
    document.getElementById("indiarecovered").innerHTML = indiaTotalRecovered;
    document.getElementById("indiadeceased").innerHTML = indiaTotalDeceased;
}




function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("statetable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    // loop
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch= true;
                break;
            }
            } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}