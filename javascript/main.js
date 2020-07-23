const myCanvas = document.querySelector('#card');
const ctx = myCanvas.getContext('2d');

// 
//draw card's back
//
drawCardBack();

let spotItGame;
let cards;
let points = 0;
let timer = 5;
let interval;

// display timer, for now, after timer is base on the level
document.querySelector('#time span').innerHTML = timer;

//
//Start button
//

const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', function () { 
    spotItGame = new SpotItGame(cardSets);
    cards = spotItGame.pickCards();
    spotItGame.drawCards(cards);
    interval = setInterval(function () {
        timer--;
        document.querySelector('#time span').innerHTML = timer;
        if (timer<=0) {
            clearInterval(interval);
            drawCardBack();
            alert('gameover');
        }
    
    },1000);
    
    
})


//
// Logic game
//

let  canvasPosition = myCanvas.getBoundingClientRect();
let  xClicked, yClicked;
myCanvas.addEventListener('click', function(event) {
    xClicked = event.clientX - canvasPosition.left,
    yClicked = event.clientY - canvasPosition.top;
    console.log('onclick x=' + xClicked + ',y=' + yClicked);
    let playingCard = spotItGame.symbolArrPlayingCard;
    console.log(playingCard)
    for (let i=0; i<playingCard.length; i++) {
        if (playingCard[i].isClicked(xClicked,yClicked)) {
        let getIndex = playingCard[i].index;
        console.log(imageSpotIt[getIndex].name)
        if (cards[0].includes(getIndex)) {
            points++;   
            document.querySelector('#points span').innerHTML = points; // display points 
        } 
        // draw new card
        if (spotItGame.isFinished()) {
            alert('win');
            clearInterval(interval);

        } else {
            cards = spotItGame.pickCards();
            spotItGame.drawCards(cards);
        }
            
            
        }  
    }
    

});

function drawCardBack () {
    ctx.beginPath();
ctx.arc(300, 300, 230, 0, Math.PI * 2);
ctx.fillStyle = 'white'; 
ctx.fill();
ctx.lineWidth = '5';
ctx.strokeStyle = 'black'; 
ctx.stroke();
ctx.closePath(); 

ctx.beginPath();
ctx.arc(800, 300, 230, 0, Math.PI * 2);
ctx.fill(); 
ctx.stroke();
ctx.closePath();

const image = document.createElement('img');
image.src = 'images/spotItLogo.png';
image.onload = () => { 
    ctx.drawImage(image,0,150,image.naturalWidth*1.2,image.naturalHeight*1.2);
    ctx.drawImage(image,500,150,image.naturalWidth*1.2,image.naturalHeight*1.2);
}
}


//
// Logo
//

//const contextLogo = document.querySelector('#logo').getContext('2d');












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