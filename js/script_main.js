var colorMode = 1; // 1 for light 0 for dark

function func(event) {
    if(event.target.checked) {
        // light
        document.body.style.backgroundColor = "white";
        // navbar
        $('.navbar').removeClass('navbar-dark');
        $('.navbar').addClass('navbar-light');
        $('.navbar').removeClass('bg-dark');
        $('.navbar').addClass('bg-light');

        // india chartdiv
        document.getElementById("chartdiv").style.backgroundColor = "white";

        // digital screening section
        $('.screen-section').removeClass('screen-dark');
        $('.screen-section').addClass('screen-light');

        // india total cases section
        $('.info').removeClass('cases-dark');
        $('.info').addClass('cases-light');
    }
    else {
        // dark

        document.body.style.backgroundColor = "rgb(100,100,100)";
        // navbar
        $('.navbar').removeClass('navbar-light');
        $('.navbar').addClass('navbar-dark');
        $('.navbar').removeClass('bg-light');
        $('.navbar').addClass('bg-dark');

        // india chartdiv
        document.getElementById("chartdiv").style.backgroundColor = "rgb(100,100,100)";

        // digital screening section
        $('.screen-section').removeClass('screen-light');
        $('.screen-section').addClass('screen-dark');

        // india total cases section
        $('.info').removeClass('cases-light');
        $('.info').addClass('cases-dark');
    }
}