const userClickedPattern = [];

const gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).on("keydown", function(e){
    if(!started)
    {
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
    level++;
}

$(".btn").on("click", function(e){
    if(started)
    {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(e){
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
    {
        console.log("right");
        if(currentLevel == (level - 1))
        {
            console.log("jdkjsdbksd");
            setTimeout(nextSequence(), 1000);
            userClickedPattern.length = 0;
        }
    }
    else{
        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function(e){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern.length = 0;
    started = false;
    userClickedPattern.length = 0;
}