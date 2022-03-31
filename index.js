// At the top of the index.js file, create a new array called buttonColors

var buttonColours = ["red", "blue", "green", "yellow"];

// At the top of the game.js create new empty  array called gamePattern

var gamePattern = [];

// new empty array userClickedPattern

var userClickedPattern = [];

// detect any buttonPressed

// keep track whether the game has started or not, call nextSequence() on the first pressed

var started = false;

// create a new variable called level and start at level 0

var level = 0;

// detect when a keyboard has been pressed, call nextSequence()

$(document).keypress(function() {
  if (!started) {

    // the h1 title starts out saying " press A key to start ", when game has started

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }


});
$(".btn").click(function() {
  // userChosenColour to store ud of the button clicked
  var userChosenColour = $(this).attr("id");
  // add the content of variable
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // call checkAnwer() after a user has clicked and chosen their answer,passing in the index of last answer in the user sequence
  checkAnswer(userClickedPattern.length - 1);
});


// create a new function called,checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  // write an if statement inside checkAnswer() to check if the most recent user answer is the same as game pattern,if so log success otherwide log wrong
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // if the user got the most recent answer right in step 3,then check if they have finished the sequence
    if (userClickedPattern.length === gamePattern.length) {
      // call nextSequence() after 1000ms delay
      setTimeout(function() {

        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");
    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over,Press Any Key to Restart");

    startOver();
  }
}
// create a function called nextSequence()

function nextSequence() {

  // once nextSequence() is triggered, reset the userClickedPattern to an empty array

  userClickedPattern=[];

  // inside nextSequence(), increase the level by 1 everytime nextSequencee() is called
  level++;

  // inside nextSequence(), update the h1 with the change in the value of level

  $("#level-title").text("Level " + level);
  // random number between 0 and 3

  var randomNumber = Math.floor(Math.random() * 4);

  // create new variable called randomChosenColor and use randomNumber

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  // use JQuery to select the button with the same id as randomChosenColour

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

// play the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Create a new function called animatePress(), it should take a single input parameter called currentColour.

function animatePress(currentColor) {
  //
  // use jQuery to add this pressed class to the button that gets clicked inside animatePress()
  $("#" + currentColor).addClass("pressed");
  // removed pressed class after 100ms
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// create new function called startOver
// Inside this function, you'll need to reset the values of level, gamePattern and started variables.
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
