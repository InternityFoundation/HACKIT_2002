var colorMode = 1; // 1 for light 0 for dark

function func(event) {
    if(event.target.checked) {
        // light

        // Covid 19 heading
        document.getElementById("covid19_head").style.color = "black";

        document.body.style.backgroundColor = "white";
        // navbar
        $('.navbar').removeClass('navbar-dark');
        $('.navbar').addClass('navbar-light');
        $('.navbar').removeClass('bg-dark');
        $('.navbar').addClass('bg-light');

        // india chartdiv
        for(var cnt=0; cnt<4; cnt++) {
            document.getElementsByClassName("amchartclass")[cnt].style.backgroundColor = "white";
        }

        // india heatmap chart
        document.getElementById("india-heatmap").style.color = "black";
        document.getElementById("india-heatmap").style.backgroundColor = "white";

        // digital screening section
        $('.screen-section').removeClass('screen-dark');
        $('.screen-section').addClass('screen-light');

        // india total cases section
        $('.info').removeClass('cases-dark');
        $('.info').addClass('cases-light');

    }
    else {
        // dark

        // Covid 19 heading
        document.getElementById("covid19_head").style.color = "white";

        document.body.style.backgroundColor = "black";
        // navbar
        $('.navbar').removeClass('navbar-light');
        $('.navbar').addClass('navbar-dark');
        $('.navbar').removeClass('bg-light');
        $('.navbar').addClass('bg-dark');

        // india chartdiv
        for(var cnt=0; cnt<4; cnt++) {
            document.getElementsByClassName("amchartclass")[cnt].style.backgroundColor = "rgb(70,70,70)";
        }

        // india heatmap chart
        document.getElementById("india-heatmap").style.color = "white";
        document.getElementById("india-heatmap").style.backgroundColor = "rgb(70,70,70)";

        // digital screening section
        $('.screen-section').removeClass('screen-light');
        $('.screen-section').addClass('screen-dark');

        // india total cases section
        $('.info').removeClass('cases-light');
        $('.info').addClass('cases-dark');

        
    }
}