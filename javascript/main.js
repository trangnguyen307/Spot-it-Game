//
// GAME
//


const myCanvas = document.querySelector('#card');
const ctx = myCanvas.getContext('2d');

// 
//draw card's back
//
drawCardBack();

let spotItGame;
let cards;
let points = 0;
let click = 0;
let timer;
let interval=0;
let timeOutID=0;
let stopGame;
let canvasPosition;
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
        timer = 180;
    } else if (option.value === 'medium') {
        timer = 120;
    } else if (option.value === 'hard') {
        timer = 80;
    }

    // display timer
    document.querySelector('#time span').innerHTML = timer; 

    //set up variables
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
            ctx.fillRect(230,120,430,220)

            ctx.fillStyle = 'red';
            ctx.font = '80px Roboto'
            ctx.fillText('GAME OVER',300,230,300)
            
        }
    },1000);    
})


//
// Logic game
//

canvasPosition = myCanvas.getBoundingClientRect();
let  xClicked, yClicked;
myCanvas.addEventListener('click', function(event) {
    if (stopGame === false) {
        xClicked = event.clientX - canvasPosition.left,
        yClicked = event.clientY - canvasPosition.top;
        console.log('onclick x=' + xClicked + ',y=' + yClicked);
        let playingCard = spotItGame.symbolArrPlayingCard;
        console.log(playingCard)
        for (let i=0; i<playingCard.length; i++) {
            if (playingCard[i].isClicked(xClicked,yClicked)) {
                click++;
                document.querySelector('#click').innerHTML = click;

                let getIndex = playingCard[i].index;
                console.log(imageSpotIt[getIndex].name)
                if (cards[0].includes(getIndex)) {
                    playSound('correct');
                    points++;   
                    document.querySelector('#points span').innerHTML = points; // display points 
                } else {
                    playSound('wrong');
                }
                // draw new card
                if (spotItGame.isFinished()) {
                    clearInterval(interval);
                    stopGame = true;
                    playSound('win');
                    ctx.fillStyle = 'black';
                    ctx.globalAlpha = 1.0;
                    ctx.fillRect(230,120,430,220)

                    if (points === 0) {
                        ctx.fillStyle = 'red';
                        ctx.font = '80px Roboto'
                        ctx.fillText('GAME OVER',310,200,300)
                    } else if (points > 0) {
                        if (points < 8) {
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('Oopssss!!!',310,210,280)
                        } else if (points >= 8 && points <15 ) {
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('GOOD JOB!!!',310,200,280)
                        } else if ( points <= 15 && points < 23 ) {
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('WELL DONE!!!',310,200,280)
                        } else if (points >= 23) {
                            ctx.fillStyle = 'red';
                            ctx.font = '80px Roboto'
                            ctx.fillText('BRAVOOO!!!',310,200,280)
                        }
    
                        ctx.font = '50px Roboto'
                        ctx.fillText(`You got ${points} points`,280, 275)
                    }

                } else {
                    cards = spotItGame.pickCards();
                    spotItGame.drawCards(cards);
                }
                    
                    
            }  
        }
        
    }
    

});


//
// function
//

function drawCardBack () {
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

const image = document.createElement('img');
image.src = 'images/hand.png';
image.onload = () => { 
    ctx.drawImage(image,110,100,image.naturalWidth*2,image.naturalHeight*2);
    ctx.drawImage(image,570,100,image.naturalWidth*2,image.naturalHeight*2);
}
}

function playSound (status) {
    let audio = new Audio();
    if (status === 'correct') {
        audio.src = 'sound/sound-correct.mp3'
    } else if (status === 'wrong') {
        audio.src = 'sound/sound-wrong.mp3'
    } else if (status === 'win') {
        audio.src = 'sound/sound-win.mp3'
    } else if (status === 'over') {
        audio.src = 'sound/game-over.wav'
    }
    audio.play();
}

let sel = document.querySelector('select'); // get value of selected option
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

//
// How to play?
//

const button = document.querySelector('.how-to-play');
button.addEventListener('click', function () {
    button.toggle.classList('display');
    if (button.className.includes('display')) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,900,450)
    } else {
        clearRect(0,0,900,450),
        drawCardBack;
    }
})



