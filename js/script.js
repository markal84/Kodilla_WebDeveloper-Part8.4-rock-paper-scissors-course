'use strict';

//variables

  //main buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var newGame = document.getElementById('newGame'); // przycisk new game

var output = document.getElementById('output'); // pole do wyswietlania wyniku meczu
var result = document.getElementById('result'); // pole do wyswietlania liczby wygranych rund

  //main variable 
var params = {
    playerRounds : 0, //number of player rounds
    computerRounds : 0, //number of computer rounds
    noTurns: '', //number of turns set while clicking new game button  
}
 
var computerButton; // do przypisania random liczby do rock, paper,scissors w funkcji computerMove
//var playerRounds = 0; //liczba wygranych rund gracza - poczatkowa wartosc
//var computerRounds = 0; //liczba wygranych tur komputera - poczatkowa wartosc
//var noTurns; //liczba tur ustalona przy kliknieciu na new game
var preventGame; //do wykorzystania w funkcji blokujaca dalsza gre, zmienna ktora ma wlasciwosci true lub false 

var buttons = document.getElementsByClassName('player-move'); // wszystkie buttony gracza

//functions

  //funkcja playerMove - glowna funkcja
function playerMove(buttonClicked) {
    computerMove();
    switch (buttonClicked + computerButton) { //funkcja decydujaca o wyniku
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            displayText('YOU WON! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            params.playerRounds++;
            console.log('player won games: '+ params.playerRounds);
            displayWonRounds();
            checkIfWon();
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            displayText('YOU LOST! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            params.computerRounds++;
            console.log('computer won games: '+ params.computerRounds);
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

// petla przechodzaca przez wszystkie buttony i uruchamiajaca funkcje playerMove z opdpowiednim argumentem, zastepuje funkcje playerChoice();
for ( var i = 0; i < buttons.length; i++ ) { // dla kazdego buttona
    buttons[i].addEventListener('click', function (){ playerMove(this.getAttribute('data-move')); // po kliknieciu w button uruchom funkcje ktora zczytuje wartosc parametru data-move ktorego wartosciami sa, w zaleznosci od kliknietego buttona - rock,parer,scissorss
    });
}; 

  //funkcja która zczytuje w ktory przycisk klinal gracz
/*function playerChocice(){
    paper.addEventListener('click', function(){
        playerMove('paper');
    });
    rock.addEventListener('click', function(){
        playerMove('rock');
    });
    scissors.addEventListener('click', function(){
        playerMove('scissors');
    }); 

};*/

//playerChocice();

  //funkcja losująca liczby od 1 do 3 i przypisujaca im wartosci
function computerMove(){
     var computerChoice = Math.floor((Math.random() * 3) + 1);
     if(computerChoice == 1){
         computerButton = 'paper';
     }else if(computerChoice == 2){
        computerButton = 'rock';
     }else{
        computerButton = 'scissors';
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
      result.innerHTML = result.innerHTML + 'Number of won rounds: '+'<br><br>' + '<b>' + 'Player: ' + '</b>' + params.playerRounds + '<b>' + ' Computer: ' + '</b>' + params.computerRounds + '<br><br>';
  };

  //funkcja czysczaca text w WonRounds
    function clearTextWonRounds(){
        result.innerHTML = '';
    };
  
  //funkcja zczytujaca wartosc z newGame i wyswietlajaca komunikat w polu result
  newGame.addEventListener('click', function(){ 
    params.noTurns = window.prompt('Plase specify number of turns necessery to win the game');
    if(isNaN(params.noTurns) || params.noTurns == '' || params.noTurns == null || params.noTurns == 0 || params.noTurns == 1)
    {
        displayText('Can only be a number and larger than 1!');
    } else {
        displayRounds();
        paper.style.visibility = "visible";
        rock.style.visibility = "visible";
        scissors.style.visibility = "visible";
    }
  });
  //funkcja wyswietlajaca liczbe ustalonych rund
    var displayRounds = function(){
        result.insertAdjacentHTML('beforebegin','Numbers of turns to win the game is: ' + '<b>' + params.noTurns + '</b>' + '<br><br>');
      };
        //funkcja czysczaca liczbe rund w result
    function clearRounds(){
        result.insertAdjacentHTML('beforebegin','');
    };    

  //funkcja ktora sprawdza czy gracz lub komputer nie ma wiekszego score niz liczba rund i blokuje gre jesli score jest osiagniety
  function checkIfWon(){
    if(params.playerRounds == params.noTurns){
        //wyswietlenie wygranej gracza
        output.insertAdjacentHTML('beforebegin','<b>' + 'You won the entire game!' + '</b>'+ ' Press NEW GAME button to play again'+'<br>');
        output.innerHTML = '';
        result.innerHTML = '';
        clearRounds();
        paper.style.visibility = "hidden";
        rock.style.visibility = "hidden";
        scissors.style.visibility = "hidden";

    }else if(params.computerRounds == params.noTurns){
        //console.log('You lost entire game!!');
        output.insertAdjacentHTML('beforebegin','<b>' + 'You lost the game!' + '</b>'+ ' Press NEW GAME button to play again'+'<br>');
        output.innerHTML = '';
        result.innerHTML = '';
        clearRounds();
        paper.style.visibility = "hidden";
        rock.style.visibility = "hidden";
        scissors.style.visibility = "hidden";
    }else{
        console.log('draw');
    }
  };
