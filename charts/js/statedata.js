var state_name = [];    // holds state name in format "Manipur" or "Daman and Diu"
var state_confirm = [];
var state_active = [];
var state_recover = [];
var state_decease = [];

var district_name = [[],[]];
var district_confirm = [[],[]];

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
    var state_district_wise =JSON.parse(bodytext1);
    var districttable = document.getElementById("districttable");
    /* this gives the names of states when iterated
    console.log(Object.keys(state_district_wise)[0]);*/
    //console.log(Object.keys(state_district_wise)[0]);
    //console.log(state_district_wise["Kerala"].districtData);

    // register statecode, statename and stats from each state
    for(var i=1; i<data_json.statewise.length; i++) {
        state_name[i] = data_json.statewise[i].state;
        state_confirm[i] = parseInt(data_json.statewise[i].confirmed);
        state_active[i] = parseInt(data_json.statewise[i].active);
        state_recover[i] = parseInt(data_json.statewise[i].recovered);
        state_decease[i] = parseInt(data_json.statewise[i].deaths);

        var current_state = data_json.statewise[i].state;

        // iterate through states in state_district_wise
        for(var j=0; j<Object.keys(state_district_wise).length;j++) {  
            district_name[i] = [];
            district_confirm[i] = [];
            if(current_state == Object.keys(state_district_wise)[j]) {
                // state match, grab values
                var distdata = console.log(state_district_wise[current_state].districtData);
                try {dist = Object.keys(distdata);}
                catch(err) {continue;}
                for(var j=0;j<dist.length;j++) {
                    district_name[i][j] = dist[j];
                    district_confirm[i][j] = distdata[dist[j]].confirmed;
                }
            }
        }

        var row = statetable.insertRow(-1);
        // Insert new cells (<td> elements) at the last position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        // Add district info to the new cells:
        cell1.innerHTML = state_name[i];
        cell2.innerHTML = state_confirm[i];
        cell3.innerHTML = state_active[i];
        cell4.innerHTML = state_recover[i];
        cell5.innerHTML = state_decease[i];
    }
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


function sortTableNum(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir="asc", switchcount=0;
    table = document.getElementById("statetable");
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