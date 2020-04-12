// Get the modal
var modal = document.getElementById("myModal");
    

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var riskAudio;
// When the user clicks the button, open the modal 
async function modalopen() {
    modal.style.display = "block";
    var risk = document.getElementById("risk");
    if(count<15) {
        speak("Risk is low. Still you must stay at home and stay safe");
        risk.innerHTML = "LOW";
        risk.style.color = "GREEN";
        risk.style.fontSize = "40px";
    }
    else if(count<25) {
        speak("Risk is average. You should consult a physician.");
        risk.innerHTML = "AVERAGE";
        risk.style.color = "rgb(254,218,9)";
        risk.style.fontSize = "40px";
    }
    else {
        speak("Risk is high. Immediately consult a physician or reach us at Amour Labs.");
        risk.innerHTML = "HIGH";
        risk.style.color = "RED";
        risk.style.fontSize = "40px";
    }
    var upval=0;
    while(upval<=count) {
        range_change_event(upval++);
        await sleep(30);
    }
    
}



span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}