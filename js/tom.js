var tomImage = new Image();
tomImage.src = "images/tomas.png";



function Tom(){
    this.x = 100;
    this.y = 500;
    this.width = 50;
    this.height = 50;
    this.name = "Tom";
    this.vx = 6; //15
    this.vy = 3; //6
    this.tomCounter = 0;
    this.tomArray = [];

    this.tomRandomArray = [
        [Math.floor(Math.random() * canvas1.width), -100], // верх
        [Math.floor(Math.random() * canvas1.width), canvas1.height], //низ
        [-100 ,Math.floor(Math.random() * canvas1.height)], //лево
        [canvas1.width, Math.floor(Math.random() * canvas1.height)] //право
    ];
}

Tom.prototype.displayRandomTom = function(){
    var index = Math.floor(Math.random() * this.tomRandomArray.length);
    return this.tomRandomArray[index];
}

Tom.prototype.createTom = function(valX, valY, valW, valH, valVX, valVY){
    this.tomArray.push({
        x: valX,
        y: valY,
        w: valW,
        h: valH,
        vx: valVX,
        vy: valVY
    });
    this.tomCounter +=1;
};

Tom.prototype.drawImage = function(cheese){
    ctx.drawImage(tomImage, cheese.x, cheese.y, valW, valH);
}

Tom.prototype.draw = function(){
    this.tomArray.forEach(this.drawImage.bind(this));
}

Tom.prototype.move = function(){
    this.tomArray.forEach(function(tomTab){
        tomTab.x += tomTab.vx;
        tomTab.y += tomTab.vy;

        if(tomTab.y + tomTab.vy > canvas1.height || tomTab.y + tomTab.vy < -100){ 
            tomTab.vy *= -1;
        }
        if(tomTab.x + tomTab.vx > canvas1.width || tomTab.x + tomTab.vx < -100){
            tomTab.vx *= -1;
        }
    })
}