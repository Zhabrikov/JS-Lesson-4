
function Jerry(){
    this.jerryImage = new Image();
    this.jerryImage.src = "./images/jerry.png";
    this.x = canvas1.width / 2;
    this.y = canvas1.height - 100;
    this.width = 25;
    this.height = 25;
    this.name = "Jerry";
    this.speedX = 6;
    this.speedY = 6;
    this.pointCounter = 0;
    this.cheeseX = 0;
    this.cheeseY = 0;
}

Jerry.prototype.move = function(edit){
    if(edit === "top"){
        this.y -= this.speedY; 
    } else if(edit === "bottom"){
        this.y += this.speedY;
    } else if( edit === "left"){
        this.x -= this.speedX;
    } else if( edit === "right"){
        this.x += this.speedX;
    }

    
    

    this.x = Math.min(canvas1.width - this.width, Math.max(0, this.x));
    this.y = Math.min(canvas1.height - this.height, Math.max(0, this.y));
};

Jerry.prototype.draw = function(){
    ctx.drawImage(this.jerryImage, this.x, this.y, this.width, this.height);
}

Jerry.prototype.isStatus = function(array){
    if(this.x < array.x + array.w && 
        this.x + this.width > array.x &&
        this.y < array.y + array.h &&
        this.height + this.y > array.y){
            console.log(array.x, array.y);
            this.cheeseX = array.x;
            this.cheeseY = array.y;
            return(        
                this.x < array.x + array.w && 
                this.x + this.width > array.x &&
                this.y < array.y + array.h &&
                this.height + this.y > array.y
            );
        } else {
                return(        
                this.x < array.x + array.w && 
                this.x + this.width > array.x &&
                this.y < array.y + array.h &&
                this.height + this.y > array.y
            );
    };
};

Jerry.prototype.isDead = function(tom){
    return tom.some(this.isStatus.bind(this));
}

Jerry.prototype.eatCheese = function(cheese){
    return cheese.some(this.isStatus.bind(this));
}