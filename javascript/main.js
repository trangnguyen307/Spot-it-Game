const myCanvas = document.querySelector('canvas');
const ctx = myCanvas.getContext('2d');
drawCard1();
drawCard2();
const image = document.createElement('img');
image.src = 'images/Spotit logo.png';
image.onload = () => { 
    ctx.drawImage(image,0,150,image.naturalWidth*1.2,image.naturalHeight*1.2);
    ctx.drawImage(image,500,150,image.naturalWidth*1.2,image.naturalHeight*1.2);
}

let spotItGame;
let cards;
let points = 0;


const startButton = document.querySelector('#start-button')
startButton.addEventListener('click', function () { 
    spotItGame = new SpotItGame(cardSets);
    cards = spotItGame.pickCards();
    spotItGame.drawCards(cards);
})

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
       if (cards[0].includes(getIndex)) {
        points++;   
        console.log('points: '+points); //
       }
        cards = spotItGame.pickCards();
        spotItGame.drawCards(cards);
    }
    
}

});







//
// CARD 1
//
function drawCard1 () {
    ctx.beginPath();
    ctx.arc(300, 300, 220, 0, Math.PI * 2);
    ctx.fillStyle = 'white'; 
    ctx.fill();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'black'; 
    ctx.stroke();
    ctx.closePath(); 
}

//
// CARD 2
//
function drawCard2 () {
    ctx.beginPath();
ctx.arc(800, 300, 220, 0, Math.PI * 2);
ctx.fill(); 
ctx.stroke();
ctx.closePath();
}


// let i=0; 

// function display (arr) {
//     if (i<arr.length) {
//         const image = document.createElement('img');
//         image.src = 'images/' + arr[i].img;
//         image.onload = () => { 
//         const imgRatio = image.naturalWidth/image.naturalHeight;
//         const w=130;
//         const h=w/imgRatio;
//         ctx.drawImage(image,220,80,h,w);
//         ctx.drawImage(image,330,140,h,w);
//         ctx.drawImage(image,370,250,h,w);
//         ctx.drawImage(image,300,350,h,w);
//         ctx.drawImage(image,180,370,h,w);
//         ctx.drawImage(image,90,280,h,w);
//         ctx.drawImage(image,100,140,h,w);
//         ctx.drawImage(image,220,230,h,w);
//         i++;
//         console.log(i)
//         console.log(arr.length)
//         }
//     }

// };

// setInterval(function () {
//     display(imageSpotIt);
//     ctx.beginPath();
//     ctx.arc(300, 300, 220, 0, Math.PI * 2);
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