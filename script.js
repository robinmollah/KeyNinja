var text = document.getElementById("text");
var code = document.getElementById("input");
var elapsedTimeView = document.getElementById("elapsed_time");
var typingSpeedView = document.getElementById("typing_speed");
var mistakeNumberView = document.getElementById('mistake_number');
var mistakeRatioView = document.getElementById('mistake_ratio');
var totalKeyPressedView = document.getElementById('total_pressed');


var index = 0;
var totalKeyPressed = 0;
var startTime = 0;
var endTime = 0;
var mistake = 0;
var initialized = 0;
var textToType = text.innerText;

code.addEventListener("keydown", function(event){
    console.log(event.key);
    if(event.key == "Backspace" && index > 0){ // Backspace
        return;
    }
    if(!event.key.match(/^.$/i)){ // Invalid character
        return;
    }
    if(textToType.charAt(index++) == event.key){
        totalKeyPressed++; // Matched
        underline();
    } else {
        mistake++;
        text.style.backgroundColor = "red";
        setTimeout(function(){
            text.style.backgroundColor = "white";
        }, 200);
    }
});
code.addEventListener("focusin", function(event){
    init();
    code.innerText = "";
});
code.addEventListener("focusout", function(event){
    code.innerText = "Write here";
});

function init(){
    if(initialized) return;
    startTime = (Date.now() / 1000);
    totalKeyPressed = 0;
    mistake = 0;
    endTime = 0;
    index = 0;
    underline();
}

function underline(){
    text.innerHTML = text.innerText.substring(0, index) + "<u>" + text.innerText.substring(index, index+1) +
        "</u>" + text.innerText.substring(index+1);
}

function updateTiming(){
    var elapsedTime = ((Date.now() / 1000) - startTime) | 0
    elapsedTimeView.innerText = elapsedTime;
    typingSpeedView.innerText = (totalKeyPressed * 5 * 60) / elapsedTime | 0;
    mistakeNumberView.innerText = mistake;
    mistakeRatioView.innerText = mistake / (totalKeyPressed / 5); // error per word
    totalKeyPressedView.innerText = totalKeyPressed;
}

setInterval(updateTiming, 500);