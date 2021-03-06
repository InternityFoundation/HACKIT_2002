var chart1;
var user_lat=0, user_long=0;
function loadchart1() {
// Create map instance
chart1 = am4core.create("chartdiv1", am4maps.MapChart);

// Set map definition
chart1.geodata = am4geodata_worldLow;

// Set projection
chart1.projection = new am4maps.projections.Miller();

// Series for World map
var worldSeries = chart1.series.push(new am4maps.MapPolygonSeries());
worldSeries.include = ["IN"];
worldSeries.indiaGeodata = true;
var polygonTemplate = worldSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";

///////////////////////////////////////
//// SHOW INDIAN STATES
///////////////////////////////////////
    // Series for India map
    var indiaSeries = chart1.series.push(new am4maps.MapPolygonSeries());
    indiaSeries.geodata = am4geodata_indiaLow;
    var polygonTemplate = indiaSeries.mapPolygons.template;
    
    //polygonTemplate.tooltipText = "{name}";
    //polygonTemplate.fill = am4core.color("#74B266");

    // Series for India states
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    //hs.properties.fill = am4core.color("#367B25");
    polygonTemplate.events.on("hit", function(ev) {
        // get object info
        ev.target.dataItem.properties.fill = am4core.color("#333");

        //console.log(ev.target.dataItem.dataContext.name);
        console.log(ev.target.dataItem.dataContext);
        console.log(ev.target.dataItem.dataContext.id);
    });
///////////////////////////////////////
//// SHOW INDIAN STATES END
///////////////////////////////////////


///////////////////////////////////////
//// LAT LONG
///////////////////////////////////////
    
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} 
else { 
  console.log("Geolocation is not supported by this browser.");
}

///////////////////////////////////////
//// LAT LONG
///////////////////////////////////////

console.log(Object(indiaSeries.data));



    polygonTemplate.tooltipText = "{name}: {value.value.formatNumber('#.0')}";
    
    indiaSeries.heatRules.push({
      property: "fill",
      target: indiaSeries.mapPolygons.template,
      min: am4core.color("rgb(255,200,200)"),
      max: am4core.color("red")
    });
    
    indiaSeries.useGeodata = true;

    // add heat legend
    var heatLegend = chart1.chartContainer.createChild(am4maps.HeatLegend);
    heatLegend.valign = "bottom";
    heatLegend.align = "left";
    heatLegend.width = am4core.percent(100);
    heatLegend.series = indiaSeries;
    heatLegend.orientation = "horizontal";
    heatLegend.padding(20, 20, 20, 20);
    heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
    heatLegend.valueAxis.renderer.minGridDistance = 40;

    indiaSeries.mapPolygons.template.events.on("over", event => {
      handleHover(event.target);
    });

    indiaSeries.mapPolygons.template.events.on("hit", event => {
      handleHover(event.target);
    });

    function handleHover(mapPolygon) {
        if (!isNaN(mapPolygon.dataItem.value)) {
            console.log(mapPolygon.dataItem.value);
          heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
        } else {
            heatLegend.valueAxis.hideTooltip();
        }
    }

    indiaSeries.mapPolygons.template.strokeOpacity = 0.4;
    indiaSeries.mapPolygons.template.events.on("out", event => {
        heatLegend.valueAxis.hideTooltip();
    });

    chart1.zoomControl = new am4maps.ZoomControl();
    chart1.zoomControl.valign = "top";

    //indiaSeries push data 
      indiaSeries.data = [];
      for(var i=0;i<state_confirm.length;i++) {
        var fg = {
          "id":state_code[i],
          "value":state_confirm[i]
        }
        indiaSeries.data.push(fg);
      }
}

function showPosition(position) {
  user_lat=position.coords.latitude;
  user_long=position.coords.longitude;

  // Create image series
  var imageSeries = chart1.series.push(new am4maps.MapImageSeries());

  // Create a circle image in image series template so it gets replicated to all new images
  var imageSeriesTemplate = imageSeries.mapImages.template;
  var circle = imageSeriesTemplate.createChild(am4core.Circle);
  circle.radius = 5;
  circle.fill = am4core.color("#B27799");
  circle.stroke = am4core.color("#FFFFFF");
  circle.strokeWidth = 1;
  circle.nonScaling = true;
  circle.tooltipText = "{title}";

  // Set property fields
  imageSeriesTemplate.propertyFields.latitude = "latitude";
  imageSeriesTemplate.propertyFields.longitude = "longitude";

  
  
  // Add data for the user city
  
  imageSeries.data = [{
    "latitude": user_lat,
    "longitude": user_long,
    "title": "Your Location \nLat: "+user_lat+"\nLong: "+user_long
  }];
}