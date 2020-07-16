const ctx = document.querySelector('canvas').getContext('2d');
// const image = document.createElement('img');
// image.src = 'images/circle.png';
// image.onload = () => { 
//     const imgRatio = image.naturalWidth/image.naturalHeight;

//     const w=600;
//     const h=w/imgRatio;
//     ctx.drawImage(image,0,0,h,w);
//     ctx.drawImage(image,w,0,h,w);
// }

//
// CARD 1
//

ctx.beginPath();
ctx.arc(300, 300, 220, 0, Math.PI * 2);
ctx.fillStyle = 'white'; 
ctx.fill();
ctx.strokeStyle = 'black'; 
ctx.stroke();
ctx.closePath();

let i=0; 

function display (arr) {
    if (i<arr.length) {
        const image = document.createElement('img');
        image.src = 'images/' + arr[i].img;
        image.onload = () => { 
        const imgRatio = image.naturalWidth/image.naturalHeight;
        const w=130;
        const h=w/imgRatio;
        ctx.drawImage(image,220,80,h,w);
        ctx.drawImage(image,330,140,h,w);
        ctx.drawImage(image,370,250,h,w);
        ctx.drawImage(image,300,350,h,w);
        ctx.drawImage(image,180,370,h,w);
        ctx.drawImage(image,90,280,h,w);
        ctx.drawImage(image,100,140,h,w);
        ctx.drawImage(image,220,230,h,w);
        i++;
        }
    }



};

setInterval(function () {
    display(imageSpotIt)
    ctx.beginPath();
ctx.arc(300, 300, 220, 0, Math.PI * 2);
ctx.fillStyle = 'white'; 
ctx.fill();
ctx.strokeStyle = 'black'; 
ctx.stroke();
ctx.closePath();
}, 1000)

//console.log(i)


//setInterval(display(imageSpotIt),1000)

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


//
// CARD 2
//
ctx.beginPath();
ctx.arc(800, 300, 220, 0, Math.PI * 2);
ctx.fillStyle = 'white'; 
ctx.fill();
ctx.strokeStyle = 'black'; 
ctx.stroke();
ctx.closePath();

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



