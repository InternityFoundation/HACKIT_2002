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

        // be prepared but dont panic text
        document.getElementById("panicp").style.color = "rgb(60,54,173)";
        document.getElementById("panicp").style.backgroundColor = "rgb(227,226,243)";

        // accordian
        document.getElementsByClassName("accordion")[0].style.backgroundColor = "rgb(183, 214, 255)";
        document.getElementsByClassName("accordion")[0].style.color = "black";

        // panel
        document.getElementsByClassName("panel")[0].style.backgroundColor = "rgb(203,234,255)";
        document.getElementsByClassName("panel")[0].style.color = "black";
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
            document.getElementsByClassName("amchartclass")[cnt].style.backgroundColor = "rgb(0,0,0)";
        }

        // india heatmap chart
        document.getElementById("india-heatmap").style.color = "white";
        document.getElementById("india-heatmap").style.backgroundColor = "rgb(0,0,0)";

        // digital screening section
        $('.screen-section').removeClass('screen-light');
        $('.screen-section').addClass('screen-dark');

        // india total cases section
        $('.info').removeClass('cases-light');
        $('.info').addClass('cases-dark');

        // be prepared but dont panic text
        document.getElementById("panicp").style.color = "white";
        document.getElementById("panicp").style.backgroundColor = "rgb(30,30,150)";

        // accordian
        document.getElementsByClassName("accordion")[0].style.backgroundColor = "rgb(73, 42, 250)";
        document.getElementsByClassName("accordion")[0].style.color = "white";

        // panel
        document.getElementsByClassName("panel")[0].style.backgroundColor = "rgb(53,22,200)";
        document.getElementsByClassName("panel")[0].style.color = "white";
    }
}