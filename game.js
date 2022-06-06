var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function() {
    if (gameStarted == true) {
      var userChosenButton = event.target.id;
      userClickedPattern.push(userChosenButton);
      console.log(userClickedPattern);

      playSound(userChosenButton);
      animatePress(userChosenButton);

      checkAnswer(userClickedPattern.length-1);
    }
    else {
      $("#level-title").animate({fontSize: 49}, 250);
      $("#level-title").animate({fontSize: 48}, 250);
    }
})


$(document).keypress(function() {
  if (gameStarted == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});


function nextSequence() {

  userClickedPattern = [];

  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var playAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
  playAudio.play();

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#level-title").text("Level " + level);

}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }  else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


function playSound(name) {
  var playAudio = new Audio("sounds/" + name + ".mp3");
  playAudio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
