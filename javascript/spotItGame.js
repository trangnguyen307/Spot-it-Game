class SpotItGame {
    constructor (cardArr) {
        this.cardArr = [...cardArr];
        this.symbolArrPlayingCard = [];
        this.imageClicked = 0;
    }

    restart(cardArr) {
        this.cardArr = cardArr;
    }

    pickCards () {
        let cardPickedArr = [];
        for (let i=0; i<2; i++) {
            let number = Math.floor(Math.random()*this.cardArr.length);
            cardPickedArr.push(this.cardArr[number]);
            this.cardArr.splice(number,1);
        }
        
        return cardPickedArr;
    }
    
    drawCards (cardsPicked) {
        // draw card1
        ctx.beginPath();
        ctx.arc(300, 300, 220, 0, Math.PI * 2);
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
        ctx.arc(800, 300, 220, 0, Math.PI * 2);
        ctx.fill(); 
        ctx.stroke();
        ctx.closePath();

        this.symbolArrPlayingCard = [];
        for (let i=0; i< cardsPicked[0].length; i++) {
            console.log('i:'+i+ ', index'+cardsPicked[1][i])
            let symbol = new Symbol(imagePosition1[i].x+500, imagePosition1[i].y, cardsPicked[1][i]);
            this.symbolArrPlayingCard.push(symbol);
            symbol.draw();
        }
    }


    checkIfTrue (symbol,cardSet) {
        if (cardSet.includes(symbol)) {
            return true;
        }
        return false;
    }
    
    isFinished () {
    // game is finished when the player finish all the cardSets in a time limited eventhough there are maybe some mistakes
        if (this.imageClicked === Math.floor(this.cardArr.length/2)) {
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