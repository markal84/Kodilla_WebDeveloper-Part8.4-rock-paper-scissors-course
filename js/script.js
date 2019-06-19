'use strict';

//variables

  //main buttons
var paper = document.getElementById('paper');
var rock = document.getElementById('rock');
var scissors = document.getElementById('scissors');
var buttons = document.getElementsByClassName('player-move'); // wszystkie buttony gracza
var newGame = document.getElementById('newGame'); // przycisk new game

var output = document.getElementById('output'); // pole do wyswietlania wyniku meczu
var result = document.getElementById('result'); // pole do wyswietlania liczby wygranych rund
var modalOutput = document.getElementById('modal-one-content'); //pole do wyswietlania wyniku meczu w modalu
var tableOutput = document.getElementById('modal-one-table'); // pole do wyswietlania tabeli z przebiegiem gry w modalu
var modalSummary = document.getElementById('modal-one'); // modal z wynikami i przebiegiem gry

var computerButton; // do przypisania random liczby do rock, paper,scissors w funkcji computerMove
var preventGame; //do wykorzystania w funkcji blokujaca dalsza gre, zmienna ktora ma wlasciwosci true lub false 

var testData = {noRunds: 0, playerMove: 'scissorrs', match: 'won'};
var testData2 = {noRunds: 1, playerMove: 'rock', match: 'lost'};
 
  //main variable 
var params = {
    playerRounds : 0, //number of player rounds
    computerRounds : 0, //number of computer rounds
    noTurns: '', //number of turns set while clicking new game button
    noRounds: 0, // round number
    progress: [] //pusta tablica sluzaca do zapisywania parametrow rozgrywki
    
}

//funkcja testowa sluzaca to dodawania obiektow do tablicy
var pushData = function(){
  params.progress.push(testData);
  params.progress.push(testData2);
  //console.log(params.progress);
};
pushData();

//funkcja testowa sluzaca do dodawania wartosci kluczow do obiektu
var pushValues = function(){
  var values = {
    noRound: params.noRounds,
    playerMove: 'buttonClicked',
    computerMove: 'computerButton',
    roundResult: '',
    matchResult: (params.playerRounds) + ' - ' + (params.computerRounds)
  };
  console.log(values);
};






//functions

  //funkcja playerMove - glowna funkcja
function playerMove(buttonClicked) {
    //console.log('In function playerMove: ' + buttonClicked);
    computerMove();
    params.noRounds++; // each click increase round number
    pushValues();
    switch (buttonClicked + computerButton) { //funkcja decydujaca o wyniku
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            displayText('YOU WON! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            params.playerRounds++;
            //console.log('player won games: '+ params.playerRounds);
            displayWonRounds();
            checkIfWon();
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            displayText('YOU LOST! : You played ' + '<b>' + buttonClicked + '</b>' + ', computer played ' + '<b>' + computerButton + '</b>');
            params.computerRounds++;
            //console.log('computer won games: '+ params.computerRounds);
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
      result.innerHTML = ('');
      result.insertAdjacentHTML('beforebegin','Numbers of turns to win the game is: ' + '<b>' + params.noTurns + '</b>' + '<br><br>');
      };
        //funkcja czysczaca liczbe rund w result
    function clearRounds(){
        //result.insertAdjacentHTML('beforebegin','');
        params.playerRounds = 0;
        params.computerRounds = 0;
    };    

    function showModal(){ // funkcja pokazujaca modal
        document.querySelector('#modal-overlay').classList.add('show');
        modalSummary.classList.add('show');
    };

  //funkcja ktora sprawdza czy gracz lub komputer nie ma wiekszego score niz liczba rund i blokuje gre jesli score jest osiagniety
  function checkIfWon(){
    if(params.playerRounds == params.noTurns){
        //wyswietlenie wygranej gracza
        //output.insertAdjacentHTML('beforebegin','<b>' + 'You won the entire game!' + '</b>'+ '<br>' + ' Press NEW GAME button to play again'+'<br>');
        modalOutput.innerHTML = ('');
        modalOutput.insertAdjacentHTML('afterbegin','<br>' + '<b>' + 'You won the entire game!' + '</b>'+ '<br><br>' + ' Press NEW GAME button to play again'+'<br>');
        output.innerHTML = '';
        result.innerHTML = '';
        showModal();
        clearRounds();
        paper.style.visibility = "hidden";
        rock.style.visibility = "hidden";
        scissors.style.visibility = "hidden";

    }else if(params.computerRounds == params.noTurns){
        //wyswietlenie wygranej komputera
        //output.insertAdjacentHTML('beforebegin','<b>' + 'You lost the game!' + '</b>'+ '<br>' + ' Press NEW GAME button to play again'+'<br>');
        modalOutput.innerHTML = ('');
        modalOutput.insertAdjacentHTML('afterbegin','<br>' + '<b>' + 'You lost the game!' + '</b>'+ '<br><br>' + ' Press NEW GAME button to play again'+'<br>');
        output.innerHTML = '';
        result.innerHTML = '';
        showModal();
        clearRounds();
        paper.style.visibility = "hidden";
        rock.style.visibility = "hidden";
        scissors.style.visibility = "hidden";
    }else{
        console.log('draw');
    }
  };

// modals code

(function(){ 
	/* W kodzie HTML i CSS dodaliśmy style dla prostego modala, który będzie zawsze wyśrodkowany w oknie. 
	
	Teraz wystarczy napisać funkcję otwierającą modal:
	*/
	
	var showModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.add('show');
    /*var link = this.getAttribute('href'); // oobieramy atrybut z wlasciwosci href kliknietego linku 
    console.log(link);
    link = link.replace('#', ''); // usuwamy # z atrybutu href
    console.log("after using replace() on link variable: " + link);
    var selectedModal = document.getElementById(link); // zaznaczamy modal o Id kliknietego linku */
    
    for(var i = 0; i < modalLinks.length; i++) {
      modals[i].classList.remove('show');
    }
    selectedModal.classList.add('show'); // zmienic ten parametr do gry kamien nozyce
	};
	
	// Mimo, że obecnie mamy tylko jeden link, stosujemy kod dla wielu linków. W ten sposób nie będzie trzeba go zmieniać, kiedy zechcemy mieć więcej linków lub guzików otwierających modale
	
	var modalLinks = document.querySelectorAll('.show-modal');
	
	for(var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click', showModal);
	}
	
	// Dodajemy też funkcję zamykającą modal, oraz przywiązujemy ją do kliknięć na elemencie z klasą "close". 

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	// Dobrą praktyką jest również umożliwianie zamykania modala poprzez kliknięcie w overlay. 
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
	// Musimy jednak pamiętać, aby zablokować propagację kliknięć z samego modala - inaczej każde kliknięcie wewnątrz modala również zamykałoby go. 
	
	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
	
	/* I to wszystko - mamy już działający modal! 
	
	ĆWICZENIE: 
	Zmień funkcję showModal tak, aby w momencie wyświetlania była zmieniana treść nagłówka na dowolną inną, np. "Modal header". 
	*/
  for(var i = 0; i < modalLinks.length; i++){
  //console.log(modalLinks[i]);  
  //console.log(modalLinks[i].getAttribute('href'));
  }
  
  
  /*var link1 = {
    href: '#modal-one',
    clicked: 'yes',
    show: function(){
      console.log(this.href + " " + this.clicked);
      }
  }
  link1.show ();*/
  
	//console.log(modalLinks[0]);
  //console.log(modalLinks[0].getAttribute('href'));
  
})();   