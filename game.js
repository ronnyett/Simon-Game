
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false; //You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$("body").click(function () {
    if (!started) {

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }

});



$(".btn").click(function () {
    var userChosenColour = $(this).attr("id"); //  we write $(this) to enable jquery functionality of attr. simple this is dom object and so we cant use jquery methods.
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);//index of last answer in the sequence

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) //if most recent user answer is game pattern.
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) //sequence finished
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);          // call nextSequence after 1000 milliseconds delay.

        }

    }
    else {
        console.log("wrong");
        playSound("wrong"); //wrong.mp3

        //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200);

        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Call startOver() if the user gets the sequence wrong.
        startOver();

    }

}





function nextSequence() {

    userClickedPattern = []; //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.

    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);




    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //default value=400 milliseconds
    playSound(randomChosenColour);


}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    //js to remove pressed class after 100 milliseconds.
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);



}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}
