'use strict';

//variables

  //main buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var newGame = document.getElementById('newGame'); // przycisk new game

var output = document.getElementById('output'); // pole do wyswietlania wyniku meczu
var result = document.getElementById('result'); // pole do wyswietlania liczby wygranych rund

var computerButton; // do przypisania random liczby do rock, paper,scissors w funkcji computerMove
var playerRounds = 0; //liczba wygranych rund gracza - poczatkowa wartosc
var computerRounds = 0; //liczba wygranych tur komputera - poczatkowa wartosc
var noTurns; //liczba tur ustalona przy kliknieciu na new game
var preventGame; //do wykorzystania w funkcji blokujaca dalsza gre, zmienna ktora ma wlasciwosci true lub false 

//functions

  //funkcja playerMove - glowna funkcja
function playerMove(buttonClicked) {
    //console.log('You played ' + buttonClicked);
    computerMove();
    switch (buttonClicked + computerButton) { //funkcja decydujaca o wyniku
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            displayText('YOU WON! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            playerRounds++;
            console.log('player won games: '+ playerRounds);
            displayWonRounds();
            checkIfWon();
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            displayText('YOU LOST! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            computerRounds++;
            console.log('computer won games: '+ computerRounds);
            displayWonRounds();
            checkIfWon();
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
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
     //console.log('computer choosed number ' + computerChoice);
     if(computerChoice == 1){
         computerButton = 'paper';
         //console.log('computer played ' + computerButton);
     }else if(computerChoice == 2){
        computerButton = 'rock';
        //console.log('computer played ' + computerButton);
     }else{
        computerButton = 'scissors';
        //console.log('computer played ' + computerButton);
     }
     return computerChoice;
};
  

  //funkcja wyswietlajaca tekst w output 
  var displayText = function(text) {
    output.innerHTML = output.innerHTML + text + '<br>';
  }; 

  //funkcja wyswietlajaca liczbe wygranych rund
  var displayWonRounds = function() { 
      clearTextWonRounds();
      result.innerHTML = result.innerHTML + 'Number of won rounds: '+'<br><br>' + '<b>' + 'Player: ' + '</b>' + playerRounds + '<b>' + ' Computer: ' + '</b>' + computerRounds + '<br><br>';
  };

  //funkcja czysczaca text w WonRounds
    function clearTextWonRounds(){
        result.innerHTML = '';
    };
  


  //funkcja zczytujaca wartosc z newGame i wyswietlajaca komunikat w polu result
  newGame.addEventListener('click', function(){
    noTurns = window.prompt('Plase specify number of turns necessery to win the game');
    if(isNaN(noTurns) || noTurns == '' || noTurns == null || noTurns == 0)
    {
        displayText('Can only be a number and larger than 0!');
    } else {
        displayRounds();
        //console.log('number of turns to win: ' + noTurns);
    }
  });
  //funkcja wyswietlajaca liczbe ustalonych rund
    var displayRounds = function(){
        result.insertAdjacentHTML('beforebegin','Numbers of turns to win the game is: ' + '<b>' + noTurns + '</b>' + '<br><br>');
      };    

  //funkcja ktora sprawdza czy gracz lub komputer nie ma wiekszego score niz liczba rund i blokuje gre jesli score jest osiagniety
  function checkIfWon(){
    if(playerRounds == noTurns){
        //wyswietlenie wygranej gracza
        output.insertAdjacentHTML('beforebegin','<b>' + 'You won the entire game!' + '</b>'+ ' Press NEW GAME button to play again'+'<br>');
        output.innerHTML = '';
        result.innerHTML = '';

        //zablokowanie dalszej gry
        paper.addEventListener('click', function(){ // jak to skrocic i zastosowac 'this.addEventListener'
            output.insertAdjacentHTML('afterbegin','Press NEW GAME button to play again'+'<br>');
            output.innerHTML = '';
            result.innerHTML = '';
        });
        rock.addEventListener('click', function(){ // jak to skrocic z 'this'
            output.insertAdjacentHTML('afterbegin','Press NEW GAME button to play again'+'<br>');
            output.innerHTML = '';
            result.innerHTML = '';
         });
        scissors.addEventListener('click', function(){ // jak to skrocic z 'this' 
            output.insertAdjacentHTML('afterbegin','Press NEW GAME button to play again'+'<br>');
            output.innerHTML = '';
            result.innerHTML = '';
         }); 

    }else if(computerRounds == noTurns){
        //console.log('You lost entire game!!');
        output.insertAdjacentHTML('beforebegin','<b>' + 'You lost the game!' + '</b>'+ ' Press NEW GAME button to play again'+'<br>');
        output.innerHTML = '';
        result.innerHTML = '';

        paper.addEventListener('click', function(){
            output.insertAdjacentHTML('afterbegin','Press NEW GAME button to play again'+'<br>');
            output.innerHTML = '';
            result.innerHTML = '';
        });
        rock.addEventListener('click', function(){
            output.insertAdjacentHTML('afterbegin','Press NEW GAME button to play again'+'<br>');
            output.innerHTML = '';
            result.innerHTML = '';
        });
        scissors.addEventListener('click', function(){
            output.insertAdjacentHTML('afterbegin','Press NEW GAME button to play again'+'<br>');
            output.innerHTML = '';
            result.innerHTML = '';
        });

    }else{
        console.log('draw');
    }
  };
