//
//logo's design
//

// const contextLogo = document.querySelector('#logo').getContext('2d');


// setTimeout(function () {
//     contextLogo.font = '120px "Great Vibes"';
//     contextLogo.fillText('Spot',20,100);
// }, 5000)

// contextLogo.font = '120px epilogue';
// contextLogo.fillStyle = '#c8cfd7';
// contextLogo.fillText('IT',90,190,200);

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
    timer = 120;
    points = 0;
    click = 0;
    stopGame = false;
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    document.querySelector('#time span').innerHTML = timer; // display timer
    document.querySelector('#click').innerHTML = click;
    document.querySelector('#points span').innerHTML = points;
    
   
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
ctx.lineWidth = '5';
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




// let i=0; 

// function display (arr) {
//     if (i<arr.length) {
//         const image = document.createElement('img');
//         image.src = 'images/'+arr[i].img;
//         image.onload = () => { 
//         const imgRatio = image.naturalWidth/image.naturalHeight;
//         const w=100;
//         const h=w/imgRatio;
//         ctx.drawImage(image,240,80,h,w);
//        // ctx.strokeRect(240,80,h,w)
//         ctx.drawImage(image,360,140,h,w);
//         //ctx.strokeRect(360,140,h,w)
//         ctx.drawImage(image,410,250,h,w);
//         //ctx.strokeRect(410,250,h,w)
//         ctx.drawImage(image,350,360,h,w);
//         //ctx.strokeRect(350,360,h,w)
//         ctx.drawImage(image,210,400,h,w);
//         //ctx.strokeRect(210,400,h,w)
//         ctx.drawImage(image,100,290,h,w);
//         //ctx.strokeRect(100,290,h,w)
//         ctx.drawImage(image,120,170,h,w);
//         //ctx.strokeRect(120,170,h,w)
//         ctx.drawImage(image,240,240,h,w);
//         //ctx.strokeRect(240,240,h,w)
//         i++;
//         console.log(i)
//         console.log(arr.length)
//         }
//     }

// };
// display(imageSpotIt);

// setInterval(function () {
//     display(imageSpotIt);
//     ctx.beginPath();
//     ctx.arc(300, 300, 230, 0, Math.PI * 2);
//     ctx.fillStyle = 'white'; 
//     ctx.fill();
//     ctx.strokeStyle = 'black'; 
//     ctx.stroke();
//     ctx.closePath();
// }, 1000)



// const image = document.createElement('img');
// image.src = 'images/carrot.png';
// image.onload = () => { 
//     const imgRatio = image.naturalWidth/image.naturalHeight;
//     const w=130;
//     const h=w/imgRatio;
//     ctx.drawImage(image,220,80,h,w);
//     ctx.drawImage(image,330,140,h,w);
//     ctx.drawImage(image,370,250,h,w);
//     ctx.drawImage(image,300,350,h,w);
//     ctx.drawImage(image,180,370,h,w);
//     ctx.drawImage(image,90,280,h,w);
//     ctx.drawImage(image,100,140,h,w);
//     ctx.drawImage(image,220,230,h,w);
    
// }



// const image1 = document.createElement('img');
// image1.src = 'images/baloon.png';
// image1.onload = () => { 
//     const imgRatio = image1.naturalWidth/image1.naturalHeight;
//     const w=140;
//     const h=w/imgRatio;
//     ctx.drawImage(image1,220,80,h,w);
//     ctx.drawImage(image1,330,140,h,w);
//     ctx.drawImage(image1,370,250,h,w);
//     ctx.drawImage(image1,300,350,h,w);
//     ctx.drawImage(image1,180,370,h,w);
//     ctx.drawImage(image1,90,280,h,w);
//     ctx.drawImage(image1,100,140,h,w);
//     ctx.drawImage(image1,220,230,h,w);
    
// }
    // ctx.fillStyle = 'black'
    // ctx.fillRect(ctx.canvas.width/2,ctx.canvas.height/2,300,200);
    
    // ctx.font = '100px serif'
    // ctx.fillStyle = '#870007'
    // ctx.textAlign = 'center';
    // ctx.fillText('Game Over!',,);

    // ctx.font = '100px serif'
    // ctx.fillStyle = 'white'
    // ctx.textAlign = 'center';
    // ctx.fillText('Your final score',W/2,H/2+150);

    // ctx.font = '100px serif'
    // ctx.fillStyle = 'white'
    // ctx.textAlign = 'center';
    // ctx.fillText(`${points}`,W/2,H/2+300);