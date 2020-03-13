var normalProduct = new Image();
normalProduct.src = "images/cheese.png";

var badProduct = new Image();
badProduct.src = "images/stinky.png";

function ProductCheese(){
    this.x = Math.floor(Math.random() * canvas1.width);
    this.y = Math.floor(Math.random() * canvas1.height);
    this.width = 30;
    this.height = 30;
    this.titleProduct = ['normal', 'bad'];
    this.name = "";
    cheesei = 1;
    this.cheeseArr = [];
}

ProductCheese.prototype.createCheese = function(){
    this.cheeseArr.push({
        x: Math.floor(Math.random() * (canvas1.width - 30)),
        y: Math.floor(Math.random() * (canvas1.height - 30)),
        w: this.width,
        h: this.height,
        cheeseCount:  cheesei,
        name: this.name 
    });
    
    cheesei++;
}

ProductCheese.prototype.drawImage = function(cheese){
    if(cheese.name === 'normal'){
        ctx.drawImage(normalProduct, cheese.x, cheese.y, cheese.w, cheese.h);
    } else {
        ctx.drawImage(badProduct, cheese.x, cheese.y, cheese.w, cheese.h);
    }
}

ProductCheese.prototype.draw = function(){
    this.cheeseArr.forEach(this.drawImage.bind(this));
}

ProductCheese.prototype.newProduct = function(){
    this.name = this.titleProduct[
        Math.floor(Math.random() * this.titleProduct.length)
    ]
}