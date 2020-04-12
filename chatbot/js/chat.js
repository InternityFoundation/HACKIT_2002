function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function speak(text) {
    let u = new SpeechSynthesisUtterance();
    u.voice = speechSynthesis.getVoices()[0];       
    u.rate =1.2; 
    u.text = text;
    speechSynthesis.speak(u);
}

var predictionText = [["below 25","25-40","40-60","above 60"],
                ["Male","Female","Others"],
                ["normal (96 degree farenheit to 98.6 degree farenheit)","high (98 degree farenheit to 102 degree farenheit)","very high (above 102 degree farenheit)"],
                ["Dry cough","Diminished sense of smell","sore throat","weakness","change in appetite","None of these"],
                ["Moderate to severe cough","feeling breathless","difficulty in breathing","drowsiness","pain in chest","severe weakness","None of these"],
                ["no travel history","went to some safe private meeting","went to some public place in last 14 days","confirmed contact with Covid in last 14 days"],
                ["Diabetes","high blood pressure","heart disease","kidney disease","lung disease","stroke","reduced immunity","None of these"]];

var question = ["Hi, I am your personal healthcare assistant. I will walk you through self assessment for Covid 19 symptoms. I was developed under the guidelines of WHO and the Indian Government. Please note that I am not a medical expert",
                "Please mention your age",
                "Please mention your gender",
                "What is your body temperature?",
                "Are you experiencing any of these issues",
                "Are you having these symptoms",
                "Please tell me about your travel history",
                "Do you have a history of these conditions"];

var server = document.getElementsByClassName("server");
var client = document.getElementsByClassName("client");
var predict = document.getElementsByClassName("predict-container");
var typing = server[8];

var count = 0;

var language="eng";

var audio1,audio2,audio3,audio4,audio5,audio6,audio7,audio8;

function reset() {
    location.reload(true); 
}

function bodyload() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('lang');
    console.log(myParam);
    if(myParam == 'odia') {
        var predict1 = document.getElementsByClassName("predict1");
        var predict2 = document.getElementsByClassName("predict2");
        var predict3 = document.getElementsByClassName("predict3");
        var predict4 = document.getElementsByClassName("predict4");
        var predict5 = document.getElementsByClassName("predict5");
        var predict6 = document.getElementsByClassName("predict6");
        var predict7 = document.getElementsByClassName("predict7");
    }
    var predict1 = document.getElementsByClassName("predict1");
    var predict2 = document.getElementsByClassName("predict2");
    var predict3 = document.getElementsByClassName("predict3");
    var predict4 = document.getElementsByClassName("predict4");
    var predict5 = document.getElementsByClassName("predict5");
    var predict6 = document.getElementsByClassName("predict6");
    var predict7 = document.getElementsByClassName("predict7");

    for(var i=0;i<predict1.length;i++) {
        predict1[i].innerHTML += predictionText[0][i];
    }
    for(var i=0;i<predict2.length;i++) {
        predict2[i].innerHTML += predictionText[1][i];
    }
    for(var i=0;i<predict3.length;i++) {
        predict3[i].innerHTML += predictionText[2][i];
    }
    for(var i=0;i<predict4.length;i++) {
        predict4[i].innerHTML += predictionText[3][i];
    }
    for(var i=0;i<predict5.length;i++) {
        predict5[i].innerHTML += predictionText[4][i];
    }
    for(var i=0;i<predict6.length;i++) {
        predict6[i].innerHTML += predictionText[5][i];
    }
    for(var i=0;i<predict7.length;i++) {
        predict7[i].innerHTML += predictionText[6][i];
    }

    var question_p = document.getElementsByClassName("question");
    for(var i=0;i<question_p.length;i++) {
        question_p[i].innerHTML += question[i];
    }
}

async function loads(n) {
    document.getElementById("overlay").style.display="none";
    typing.style.display="block";
    await sleep(500);
    typing.style.display = "none";
    document.getElementsByClassName("server")[n].style.display = "block";
    
    if(n==0) {
        if (window.speechSynthesis) {} else{}
        speechSynthesis.cancel();
        speak(question[0]);
        speak(question[1]);
        for(var i=0;i<predictionText[0].length;i++) {
            speak(predictionText[0][i]);
        }
        loads(1);
    }
    else {
        document.getElementsByClassName("predict-container")[n-1].style.display = "block";
        window.scrollTo(0,document.body.scrollHeight);
    }
}

$(document).ready(function () {
    $(".predict1").click(async function() {
        var index = $(".predict1").index(this);
        document.getElementById("client1").innerHTML = document.getElementsByClassName("predict1")[index].innerHTML;
        var ar = [4,2,3,5];
        count = count + ar[index];
        console.log(count);
        client[0].style.display = "block";
        await sleep(200);
        predict[0].style.display = "none";
        speechSynthesis.cancel();
        speak(question[2]);
        for(var i=0;i<predictionText[1].length;i++) {
            speak(predictionText[1][i]);
        }
        loads(2);
    });

    $(".predict2").click(async function() {
        var index = $(".predict2").index(this);
        document.getElementById("client2").innerHTML = document.getElementsByClassName("predict2")[index].innerHTML;
        var ar = [1,2,1];
        count = count + ar[index];
        console.log(count);
        client[1].style.display = "block";
        await sleep(200);
        predict[1].style.display = "none";
        if(language == "eng") {
            speechSynthesis.cancel();
            speak(question[3]);
            for(var i=0;i<predictionText[2].length;i++) {
                speak(predictionText[2][i]);
            }
        }
        else if(language=="odia") {
            audio3.pause();
            audio4.play();
        }
        
        loads(3);
    });

    $(".predict3").click(async function() {
        var index = $(".predict3").index(this);
        document.getElementById("client3").innerHTML = document.getElementsByClassName("predict3")[index].innerHTML;
        var ar = [0,1,2];
        count = count + ar[index];
        console.log(count);
        client[2].style.display = "block";
        await sleep(200);
        predict[2].style.display = "none";
        if(language=="eng") {
            speechSynthesis.cancel();
            speak(question[4]);
            for(var i=0;i<predictionText[3].length;i++) {
                speak(predictionText[3][i]);
            }
        }
        else if(language=="odia") {
            audio4.pause();
            audio5.play();
        }
        loads(4);
    });

    // 4th step
    var symptom1="";
    var count_symptom1=0;
    var symptom1_clicked=[-1,-1,-1,-1,-1,-1];
    $(".predict4").click(async function() {
        var index = $(".predict4").index(this);
        if(symptom1_clicked[index] == -1) {
            symptom1 = symptom1 + document.getElementsByClassName("predict4")[index].innerHTML+", ";
            document.getElementsByClassName("predict4")[index].style.backgroundColor = "white";
            var ar = [0,5,3,4,6,0];
            count_symptom1 = count_symptom1 + ar[index];
            console.log("count_symptom1 "+count_symptom1);
            symptom1_clicked[index] *= -1;
        }
        else {
            symptom1 = symptom1.replace(document.getElementsByClassName("predict4")[index].innerHTML+',','');
            document.getElementsByClassName("predict4")[index].style.backgroundColor = "rgb(254,218,9)";
            var ar = [0,5,3,4,6,0];
            count_symptom1 = count_symptom1 - ar[index];
            console.log("count_symptom1 "+count_symptom1);
            symptom1_clicked[index] *= -1;
        }
    });

    $(".p4.confirm").click(async function() {
        symptom1 = symptom1.substring(0, symptom1.length - 2);
        document.getElementById("client4").innerHTML = symptom1;
        count = count + count_symptom1;
        console.log(count);
        client[3].style.display = "block";
        await sleep(200);
        predict[3].style.display = "none";
        if(language == "eng") {
            speechSynthesis.cancel();
            speak(question[5]);
            for(var i=0;i<predictionText[4].length;i++) {
                speak(predictionText[4][i]);
            }
        }
        else if(language == "odia") {
            audio5.pause();
            audio6.play();
        }
        loads(5);
    });


    // 5th step
    var symptom2="";
    var count_symptom2=0;
    var symptom2_clicked=[-1,-1,-1,-1,-1,-1,-1];
    $(".predict5").click(async function() {
        var index = $(".predict5").index(this);
        if(symptom2_clicked[index] == -1) {
            symptom2 = symptom2 + document.getElementsByClassName("predict5")[index].innerHTML+", ";
            document.getElementsByClassName("predict5")[index].style.backgroundColor = "white";
            var ar = [0,1,3,4,5,6,0];
            count_symptom2 = count_symptom2 + ar[index];
            console.log("count_symptom2 "+count_symptom2);
            symptom2_clicked[index] *= -1;
        }
        else {
            symptom2 = symptom2.replace(document.getElementsByClassName("predict5")[index].innerHTML+',','');
            document.getElementsByClassName("predict5")[index].style.backgroundColor = "rgb(254,218,9)";
            var ar = [0,1,3,4,5,6,0];
            count_symptom2 = count_symptom2 - ar[index];
            console.log("count_symptom2 "+count_symptom2);
            symptom2_clicked[index] *= -1;
        }
    });

    $(".p5.confirm").click(async function() {
        symptom2 = symptom2.substring(0, symptom2.length - 2);
        document.getElementById("client5").innerHTML = symptom2;
        count = count + count_symptom2;
        console.log(count);
        client[4].style.display = "block";
        await sleep(200);
        predict[4].style.display = "none";
        if(language == "eng") {
            speechSynthesis.cancel();
            speak(question[6]);
            for(var i=0;i<predictionText[5].length;i++) {
                speak(predictionText[5][i]);
            }
        }
        else if(language == "odia") {
            audio6.pause();
            audio7.play();
        }
        loads(6);
    });



    $(".predict6").click(async function() {
        var index = $(".predict6").index(this);
        document.getElementById("client6").innerHTML = document.getElementsByClassName("predict6")[index].innerHTML;
        var ar = [0,1,2,3];
        count = count + ar[index];
        console.log(count);
        client[5].style.display = "block";
        await sleep(200);
        predict[5].style.display = "none";
        if(language == "eng") {
            speechSynthesis.cancel();
            speak(question[7]);
            for(var i=0;i<predictionText[6].length;i++) {
                speak(predictionText[6][i]);
            }
        }
        else if(language == "odia") {
            audio7.pause();
            audio8.play();
        }
        loads(7);
    });



    // 7th step
    var history="";
    var count_history=0;
    var history_clicked=[-1,-1,-1,-1,-1,-1,-1,-1];
    $(".predict7").click(async function() {
        var index = $(".predict7").index(this);
        if(history_clicked[index] == -1) {
            history = history + document.getElementsByClassName("predict7")[index].innerHTML+", ";
            document.getElementsByClassName("predict7")[index].style.backgroundColor = "white";
            var ar = [0,1,2,3,4,6,7,0];
            count_history = count_history + ar[index];
            console.log("count_history "+count_history);
            history_clicked[index] *= -1;
        }
        else {
            history = history.replace(document.getElementsByClassName("predict7")[index].innerHTML+',','');
            document.getElementsByClassName("predict7")[index].style.backgroundColor = "rgb(254,218,9)";
            var ar = [0,1,2,3,4,6,7,0];
            count_history = count_history - ar[index];
            console.log("count_history "+count_history);
            history_clicked[index] *= -1;
        }
    });

    $(".p7.confirm").click(async function() {
        history = history.substring(0, history.length - 2);
        document.getElementById("client7").innerHTML = history;
        count = count + count_history;
        console.log(count);
        client[6].style.display = "block";
        await sleep(200);
        predict[6].style.display = "none";
        $(function () {
            if(language == "eng") {
                speechSynthesis.cancel();
            }
            else if(language == "odia") {
                audio8.pause();
            }
            modalopen();
        });
    });
});