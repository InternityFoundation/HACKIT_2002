var state_name = [];    // holds state name in format "Manipur" or "Daman and Diu"
var state_confirm = [];
var state_active = [];
var state_recover = [];
var state_decease = [];

var district_name = [[],[]];
var district_confirm = [[],[]];

var data_json;
var state_district_wise;

function load_data() {
    // load json file for odisha state
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.covid19india.org/data.json", false );
    xmlHttp.send( null );
    var bodytext = xmlHttp.responseText;
    var statetable = document.getElementById("statetable");
    data_json=JSON.parse(bodytext);

    // load json file of states
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.open( "GET", "https://api.covid19india.org/state_district_wise.json", false );
    xmlHttp1.send( null );
    var bodytext1 = xmlHttp1.responseText;
    state_district_wise =JSON.parse(bodytext1);

    // register statecode, statename and stats from each state
    for(var i=1; i<data_json.statewise.length; i++) {
        state_name[i] = data_json.statewise[i].state;
        state_confirm[i] = parseInt(data_json.statewise[i].confirmed);
        state_active[i] = parseInt(data_json.statewise[i].active);
        state_recover[i] = parseInt(data_json.statewise[i].recovered);
        state_decease[i] = parseInt(data_json.statewise[i].deaths);

        var row = statetable.insertRow(-1);
        row.id = "state"+i; // set row id for each row
        // Insert new cells (<td> elements) at the last position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.style.backgroundColor = "rgb(244, 240, 249)";
        cell1.style.color = "#6c757d";
        cell1.style.border = "2px solid white";
        cell1.style.borderRadius = "10px";
        cell1.style.fontWeight = "800";

        cell2.style.backgroundColor = "rgb(244, 240, 249)";
        cell2.style.color = "#6c757d";
        cell2.style.border = "2px solid white";
        cell2.style.borderRadius = "10px";
        cell2.style.fontWeight = "600";

        cell3.style.backgroundColor = "rgb(244, 240, 249)";
        cell3.style.color = "#6c757d";
        cell3.style.border = "2px solid white";
        cell3.style.borderRadius = "10px";
        cell3.style.fontWeight = "600";

        cell4.style.backgroundColor = "rgb(244, 240, 249)";
        cell4.style.color = "#6c757d";
        cell4.style.border = "2px solid white";
        cell4.style.borderRadius = "10px";
        cell4.style.fontWeight = "600";

        cell5.style.backgroundColor = "rgb(244, 240, 249)";
        cell5.style.color = "#6c757d";
        cell5.style.border = "2px solid white";
        cell5.style.borderRadius = "10px";
        cell5.style.fontWeight = "600";
        

        // Add district info to the new cells:
        cell1.innerHTML = state_name[i];
        cell2.innerHTML = state_confirm[i];
        cell3.innerHTML = state_active[i];
        cell4.innerHTML = state_recover[i];
        cell5.innerHTML = state_decease[i];
    }
    
    // setting clicking for each tr of state table and populate districttable
    $(state_name).each(function(i) {
        $('#state'+i).click(function(){
            try {
                var state_this = state_district_wise[state_name[i]].districtData;
                var dist = Object.keys(state_this);
                console.log(state_this);

                var districttable = document.getElementById("districttable");
                
                $(districttable).find("tr:gt(0)").remove();
                
                // populate table
                $(dist).each(function(i) {
                    var row = districttable.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);

                    cell1.style.backgroundColor = "rgb(238, 238, 247)";
                    cell1.style.color = "#6e757d";
                    cell1.style.border = "2px solid white";
                    cell1.style.borderRadius = "10px";
                    cell1.style.fontWeight = "700";

                    cell2.style.backgroundColor = "rgb(238, 238, 247)";
                    cell2.style.color = "#6e757d";
                    cell2.style.border = "2px solid white";
                    cell2.style.borderRadius = "10px";
                    cell2.style.fontWeight = "500";


                    cell1.innerHTML = dist[i];
                    cell2.innerHTML = state_this[dist[i]].confirmed;
                });
            }
            catch(err){
                var districttable = document.getElementById("districttable");
                $(districttable).find("tr:gt(0)").remove();

                var row = districttable.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = "Unknown";
                cell2.innerHTML = 0;
            }
            
        });
    });

}


function sortTable(n,table_id) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(table_id);
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
            } 
            else if (dir == "desc") {
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


function sortTableNum(n,table_id) {
    var table, rows, switching, i, x, y, shouldSwitch, dir="asc", switchcount=0;
    table = document.getElementById(table_id);
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if(dir=="asc") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
            if(dir=="dsc") {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "dsc";
                switching = true;
            }
        }
    }
}