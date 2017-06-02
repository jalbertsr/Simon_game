var game = {
  count: 0,
  currentGame: [],
  player: [],
  strict: false,
  sound:{
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  }
}
function sound(name) {
  switch(name) {
    case'green':
      game.sound.green.play();
      break;
    case 'blue':
      game.sound.blue.play();
      break;
    case 'red':
      game.sound.red.play();
      break;
    case 'yellow':
      game.sound.yellow.play();
      break;
  };
}

function newGame() {
  clearGame();
}

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function addCount() {
  game.count++;
  $('#count').text('Count: '+game.count);
  generateMove();
}

function generateMove(){
  var num = Math.floor((Math.random() * 4) + 1);
  game.currentGame.push(num);  
  show();
} 

function show(){
  var i = 0;
  var move = setInterval(function(){
    playGame(game.currentGame[i]); 
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(move);
    }
  }, 600)
  
  clearPlayer();
}

function playGame(moves){
  switch(moves) {
    case 1:
      sound('red');
      $('#red1').addClass('redb');
      setTimeout(function(){
      $('#red1').removeClass('redb'); }, 300);
      break;
    case 2:
      sound('blue');
      $("#blue2").addClass('blueb');
      setTimeout(function(){
      $('#blue2').removeClass('blueb'); }, 300);
      break;
    case 3:
      sound('yellow');
      $("#yellow3").addClass('yellowb');
      setTimeout(function(){
      $('#yellow3').removeClass('yellowb'); }, 300);
      break;
    case 4:
      sound('green');
      $("#green4").addClass('greenb');
      setTimeout(function(){
      $('#green4').removeClass('greenb'); }, 300);
      break;
  };
}

function clearPlayer() {
  game.player = [];
}

function playerTurn(){
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]){
    if(game.strict){
      alert("Start again with a new pattern!");
      newGame();
    }
    else{
      alert("Bad move! Try again!");
      show();
    }
  }
  else{
    var check = game.player.length === game.currentGame.length;
    //console.log(check);
    //console.log(game.currentGame);
    //console.log(game.player);
    //console.log("===========");
    if(check){
      if(game.count === 20){
        alert-success("20 correct moves! You win!");
      }
      else{
        addCount();
        //alert("Good move!");
      }
    }
  }
}

$(document).ready(function(){
  
  /*---- Audios ----*/
  var redAudio = document.getElementById("redClip");
  var blueAudio = document.getElementById("blueClip");
  var yellowAudio = document.getElementById("yellowClip");
  var greenAudio = document.getElementById("greenClip");
  
  $("#red1").click(function(){
    redAudio.play();
    game.player.push(1);
    playerTurn();
  })
  $("#blue2").click(function(){
    blueAudio.play();
    game.player.push(2);
    playerTurn();
  })
  $("#yellow3").click(function(){
    yellowAudio.play();
    game.player.push(3);
    playerTurn();
  })
  $("#green4").click(function(){
    greenAudio.play();
    game.player.push(4);
    playerTurn();
  })
  
  /*---main---*/
  $("#start").click(function(){
    newGame();
  })
  
  $("#mode").click(function(){
    if(game.strict){
      game.strict = false;
      $("#mode").text("Strict Mode Off");
    }
    else{
      game.strict = true;
      $("#mode").text("Strict Mode On");
    }
  })
  
})