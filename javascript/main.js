//
// GAME
//


const myCanvas = document.querySelector('#card');
const ctx = myCanvas.getContext('2d');

// 
//draw card's back
//
drawCardBack();


//
// set up variables
//
let spotItGame; // intends of class spotItGame
let cards; 
let points = 0;
let click = 0;
let timer;
let interval=0;
let timeOutID=0;
let stopGame; // once stopGame is true, the game must be stop completely, we can't click on canvas
let canvasPosition; // set position of canvas each time we change the screen size, we call it when we click on start button
let option; // select level


//
//Start button
//

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', function () { 
    canvasPosition = myCanvas.getBoundingClientRect();
    if (interval !== 0) {
        clearInterval(interval);
    }
    if (timeOutID !== 0) {
        clearTimeout(timeOutID);
    }

    //select level
    option = getSelectedOption(sel);
    if (option.value === 'easy') {
        timer = 120;
    } else if (option.value === 'medium') {
        timer = 90;
    } else if (option.value === 'hard') {
        timer = 60;
    }

    // display timer
    document.querySelector('#time span').innerHTML = timer; 

    //reset the variables
    points = 0;
    document.querySelector('#points span').innerHTML = points;
    click = 0;
    document.querySelector('#click').innerHTML = click;
    stopGame = false;
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    
    // start game
    spotItGame = new SpotItGame(cardSets); 
    cards = spotItGame.pickCards();
    spotItGame.drawCards(cards);
    interval = setInterval(function () {
        timer--;
        document.querySelector('#time span').innerHTML = timer;
        // if time is up, game is over.
        if (timer<=0) {
            stopGame = true;
            playSound('over');
            clearInterval(interval);
            ctx.fillStyle = 'black';
            ctx.globalAlpha = 1.0;
            ctx.fillRect(230,150,430,240)

            ctx.fillStyle = 'red';
            ctx.font = '80px Roboto'
            ctx.fillText('GAME OVER',300,260,300)

            buttonTryAgain();
        }
    },1000);    
})


//
// Logic game
//

canvasPosition = myCanvas.getBoundingClientRect();
let  xClicked, yClicked;
myCanvas.addEventListener('click', function(event) {
    xClicked = event.clientX - canvasPosition.left;
    yClicked = event.clientY - canvasPosition.top;
    if (stopGame === false) {
        let playingCard = spotItGame.symbolArrPlayingCard;
        for (let i=0; i<playingCard.length; i++) {
            if (playingCard[i].isClicked(xClicked,yClicked)) {
                click++;
                document.querySelector('#click').innerHTML = click;

                let getIndex = playingCard[i].index;
                if (cards[0].includes(getIndex)) {
                    playSound('correct');
                    points++;   
                    document.querySelector('#points span').innerHTML = points; // display points 
                } else {
                    playSound('wrong');
                }
                // verify if the game is finished (out of card), display result
                if (spotItGame.isFinished()) {
                    clearInterval(interval);
                    stopGame = true;
                    ctx.fillStyle = 'black';
                    ctx.globalAlpha = 1.0;
                    ctx.fillRect(230,120,430,260)

                    if (points === 0) {
                        playSound('over');
                        ctx.fillStyle = 'red';
                        ctx.font = '80px Roboto'
                        ctx.fillText('GAME OVER',290,230,300)
                        buttonTryAgain();
                    } else if (points > 0) {
                        if (points < 8) {
                            playSound('win');
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('Oopssss!!!',310,210,280)
                        } else if (points >= 8 && points <15 ) {
                            playSound('win');
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('GOOD JOB!!!',310,200,280)
                        } else if ( points >= 15 && points < 23 ) {
                            playSound('win');
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('WELL DONE!!!',310,200,280)
                        } else if (points >= 23) {
                            playSound('win');
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('BRAVOOO!!!',310,200,280)
                        }
    
                        ctx.font = '50px Roboto'
                        ctx.fillText(`You got ${points} points`,280, 275)
                        buttonTryAgain();
                        
                    }
                } else { // if the game isn't finish, continue pick up cards and draw them on canvas
                    cards = spotItGame.pickCards();
                    spotItGame.drawCards(cards);
                }
                    
                break; 
            }  
        } 
    } else {
        if (xClicked >= 330 && xClicked <= 530 && yClicked >= 300 && yClicked <= 350 ) {
            ctx.clearRect(0,0,900,450);
            drawCardBack();
            points = 0;
            document.querySelector('#points span').innerHTML = points;
            click = 0;
            document.querySelector('#click').innerHTML = click;
            timer = 0;
            document.querySelector('#time span').innerHTML = timer; 

        }
    }
});



//
//
// How to play?
//

const button = document.querySelector('.how-to-play');
button.addEventListener('click', function () {
    button.classList.toggle('display');
    clearInterval(interval);
    stopGame = true;
    if (button.className.includes('display')) {
        ctx.clearRect(0,0,900,450);
        drawCircle();
        ctx.fillStyle = 'black';
        loadFontAndWrite('38px Cookie','Your goal is find out',95,80);
        loadFontAndWrite('38px Cookie','quickly the matching symbol',50,125);
        loadFontAndWrite('38px Cookie','between 2 cards. The player’s',40, 170);
        loadFontAndWrite('38px Cookie','card is on the right of screen. Click',20,215);
        loadFontAndWrite('38px Cookie','on it your symbol that you choose.',25,260);
        loadFontAndWrite('38px Cookie','If it is the right symbol, you get ',40,305);
        loadFontAndWrite('38px Cookie',"one point, if not you haven't",60,350);
        loadFontAndWrite('38px Cookie','a point.',170,395);
        loadFontAndWrite('38px Cookie','You must also complete',555,80);
        loadFontAndWrite('38px Cookie','your 28 cards within a limited',510,125);
        loadFontAndWrite('38px Cookie','time (depending on the level you',500,170);
        loadFontAndWrite('38px Cookie','choose) otherwise the game will be',480,215);
        loadFontAndWrite('38px Cookie','over. If you can finish it in time',485,260);
        loadFontAndWrite('38px Cookie','(but must have a point) then you',500,305);
        loadFontAndWrite('38px Cookie','are the winner!!!',570,350);
        loadFontAndWrite('38px Cookie',"Let's play!",610,395);
        
    } else {
        ctx.clearRect(0,0,900,450);
        drawCardBack();
    }
    points = 0;
    document.querySelector('#points span').innerHTML = points;
    click = 0;
    document.querySelector('#click').innerHTML = click;
    timer = 0;
    document.querySelector('#time span').innerHTML = timer; 
})




//
// function
//


// draw card's back when loading game
function drawCircle () {
    ctx.beginPath();
    ctx.arc(220, 230, 210, 0, Math.PI * 2);
    ctx.fillStyle = 'white'; 
    ctx.fill();
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'black'; 
    ctx.stroke();
    ctx.closePath(); 

    ctx.beginPath();
    ctx.arc(680, 230, 210, 0, Math.PI * 2);
    ctx.fill(); 
    ctx.stroke();
    ctx.closePath();
}
function drawCardBack () {
    drawCircle();

    const image = document.createElement('img');
    image.src = 'images/hand.png';
    image.onload = () => { 
        ctx.drawImage(image,100,80,image.naturalWidth*0.7,image.naturalHeight*0.7);
        ctx.drawImage(image,560,80,image.naturalWidth*0.7,image.naturalHeight*0.7);
    }
}


//play sound
function playSound (status) {
    let audio = new Audio();
    switch (status) {
        case 'correct':
            audio.src = 'sound/sound-correct.mp3';
            break;
        case 'wrong':
            audio.src = 'sound/sound-wrong.mp3'
            break;
        case 'win':
            audio.src = 'sound/sound-win.mp3'
            break;
        case 'over':
            audio.src = 'sound/game-over.wav';
            break;
        default:
            break;
    }
    audio.play();
}

// get value of selected option
let sel = document.querySelector('select'); 
function getSelectedOption(sel) {
    var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt;
}

//function create button try again

function buttonTryAgain () {
    ctx.beginPath();
    ctx.fillStyle = '#efefef'; 
    ctx.fillRect(350, 300, 200, 50);
    ctx.fill(); 
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = '#919298'; 
    ctx.stroke();
    ctx.closePath();
    ctx.font = '30px Roboto';
    ctx.fillStyle = '#000000';
    ctx.fillText('Try again?', 390, 330);
}

//function load font and write text on canvas
function loadFontAndWrite(font,text,x,y) {
    document.fonts.load(font).then(function () {
      ctx.font = font
      ctx.fillText(text, x, y)
    });
  }







