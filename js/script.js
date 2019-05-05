'use strict';

//variables

  //buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');

var computerButton; // do przypisania random liczby do rock, paper,scissors w funkcji computerMove
//var computerPaper = 'paper';
//var computerRock = 'rock';
//var computerScissors = 'scissors'; 

//functions
  //funkcja playerMove - glowna funkcja
  function playerMove(buttonClicked) {
    console.log('You played ' + buttonClicked);
    computerMove();
    switch (buttonClicked + computerButton) { //funkcja decydujaca o wyniku
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            console.log('Wygrales! Zagrales ' + buttonClicked + ', komputer zagral ' + computerButton);
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            console.log('Przegrales!');
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            console.log('Remis!');
            break;             
    };  
  };

//playerMove();

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
  

  
