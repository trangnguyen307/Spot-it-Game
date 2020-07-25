class SpotItGame {
    constructor (cardArr) {
        this.cardArr = cardArr.slice();
        this.symbolArrPlayingCard = [];
    }

    restart(cardArr) {
        this.cardArr = cardArr;
    }

    pickCards () {
        if (this.cardArr.length < 2) {
            return;
        }
        let cardPickedArr = [];
        for (let i=0; i<2; i++) {
            let number = Math.floor(Math.random()*this.cardArr.length);
            cardPickedArr.push(this.cardArr[number]);
            this.cardArr.splice(number,1);
           
        }
       
        return cardPickedArr;
    }
    
    drawCards (cardsPicked) {

        if (cardsPicked === null) {
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
            image.src = 'images/Spotit logo.png';
            image.onload = () => { 
            ctx.drawImage(image,0,150,image.naturalWidth*1.2,image.naturalHeight*1.2);
            ctx.drawImage(image,500,150,image.naturalWidth*1.2,image.naturalHeight*1.2);
            
            }
            return;
        }
        // draw card1
        ctx.beginPath();
        ctx.arc(220, 230, 210, 0, Math.PI * 2);
        ctx.fillStyle = 'white'; 
        ctx.fill();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'black'; 
        ctx.stroke();
        ctx.closePath(); 

        for (let i=0; i< cardsPicked[0].length; i++) {
            let symbol = new Symbol(imagePosition1[i].x, imagePosition1[i].y, cardsPicked[0][i]);
            symbol.draw();
        }

        //draw card2
        ctx.beginPath();
        ctx.arc(680, 230, 210, 0, Math.PI * 2);
        ctx.fill(); 
        ctx.stroke();
        ctx.closePath();

        this.symbolArrPlayingCard = []; // to re-call the symbols in main.js
        for (let i=0; i< cardsPicked[0].length; i++) {
            console.log('i:'+i+ ', index'+cardsPicked[1][i])
            let symbol = new Symbol(imagePosition1[i].x+460, imagePosition1[i].y, cardsPicked[1][i]);
            this.symbolArrPlayingCard.push(symbol);
            symbol.draw();
        }
    }
    
    isFinished () {
    // game is finished when the player finish all the cardSets in a time limited eventhough there are maybe some mistakes
        if (this.cardArr.length === 0) {
            return true;
        } 
        return false;
    }

    win () {
        // display 'You win' + points
    }

    gameOver () {
        // display 'Game Over!'
    }
}   