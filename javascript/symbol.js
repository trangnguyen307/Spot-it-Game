let w, h;
class Symbol {
    constructor(x,y,index) {
        this.x = x;
        this.y = y;
        this.index = index; // index on imageSpotIt
    }

   
    draw () {
        const image = document.createElement('img');
        image.src = 'images/' + imageSpotIt[this.index].img; 
        image.onload = () => { 
            const imgRatio = image.naturalWidth/image.naturalHeight;
            w=130;
            h=w/imgRatio;
            ctx.drawImage(image,this.x,this.y,w,h);
        }
    }

    isClicked (xClicked, yClicked) {
        if (xClicked >= this.x && xClicked <= this.x+w && yClicked >= this.y && yClicked <= this.y+h ) {
            return true;
        } else {
            return false;
        }
    }

    // maybe need a remove image method here, see later
}
