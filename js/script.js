'use strict';

//variables

  //buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var output = document.getElementById('output'); // pole do wyswietlania wyniku meczu
var result = document.getElementById('result'); // pole do wyswietlania liczby wygranych rund
var playerButton = document.getElementsByClassName('button'); // moze sie przydac w etapie 2
var computerButton; // do przypisania random liczby do rock, paper,scissors w funkcji computerMove
var playerRounds = 0; //liczba wygranych rund gracza - poczatkowa wartosc
var computerRounds = 0; //liczba wygranych tur komputera - poczatkowa wartosc

//functions

  //funkcja playerMove - glowna funkcja
function playerMove(buttonClicked) {
    console.log('You played ' + buttonClicked);
    computerMove();
    switch (buttonClicked + computerButton) { //funkcja decydujaca o wyniku
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            //console.log('Wygrales! Zagrales ' + buttonClicked + ', komputer zagral ' + computerButton);
            displayText('YOU WON! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            //playerWonRounds();
            playerRounds++;
            displayWonRounds();
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            //console.log('Przegrales!');
            displayText('YOU LOST! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            //computerWonRounds();
            computerRounds++;
            displayWonRounds();
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            //console.log('Remis!');
            displayText('DRAW! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer also played ' + '<b>' + computerButton + '</b>');
            break;             
    };  
};


  //funkcja która zczytuje w ktory przycisk klinal gracz
function playerChocice(){
    paper.addEventListener('click', function(){
        playerMove('paper');
    });
    rock.addEventListener('click', function(){
        playerMove('rock');
    });
    scissors.addEventListener('click', function(){
        playerMove('scissors');
    });
};

playerChocice();

  //funkcja losująca liczby od 1 do 3 i przypisujaca im wartosci
function computerMove(){
     var computerChoice = Math.floor((Math.random() * 3) + 1);
     console.log('computer choosed number ' + computerChoice);
     if(computerChoice == 1){
         computerButton = 'paper';
         console.log('computer played ' + computerButton);
     }else if(computerChoice == 2){
        computerButton = 'rock';
        console.log('computer played ' + computerButton);
     }else{
        computerButton = 'scissors';
        console.log('computer played ' + computerButton);
     }
     return computerChoice;
};
  

  //funkcja wyswietlajaca tekst w output 
  var displayText = function(text) {
    output.innerHTML = output.innerHTML + text + '<br>';
  }; 

  //funkcja wyswietlajaca liczbe wygranych rund
  var displayWonRounds = function() { 
      clearText();
      result.innerHTML = result.innerHTML + 'Number of won rounds: '+'<br><br>' + '<b>' + 'Player: ' + '</b>' + playerRounds + '<b>' + ' Computer: ' + '</b>' + computerRounds + '<br><br>';
  };

  //funkcja czysczaca text w WonRounds
    function clearText(){
        result.innerHTML = '';
    }; 

  //funkcja zliczajaca i wyswietlajaca wygrane gracza - raczej nieportrzebna bedzie
  function playerWonRounds() {
      playerRounds++;
      console.log(playerRounds);
      return playerRounds;
  };
  //funkcja zliczajaca i wyswietlajaca wygrane komputera - raczej niepotrzebna bedzie
  function ComputerWonRounds() {
      ComputerRounds++;
      console.log(ComputerRounds);
      return ComputerRounds;
  };


  /*
  //testowa funkcja zliczajaca liczbe klikniec w przycisk
  var playerCount = 0;
  playerButton.onclick = function (){
      playerCount++;
      console.log('you clicked ' + playerButton + playerCount + ' times');
    };

console.log(playerButton);


paper.onclick = function (){
    playerCount++;
    console.log('you clicked button '  + playerCount + ' times');
  };
rock.onclick = function (){
    playerCount++;
    console.log('you clicked button '  + playerCount + ' times');
  };
scissors.onclick = function (){
    playerCount++;
    console.log('you clicked button '  + playerCount + ' times');
  };
  */