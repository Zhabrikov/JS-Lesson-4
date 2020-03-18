var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";

var audioStart = new Audio();
audioStart.src = './source/start.mp3';

var audioEnd = new Audio();
audioEnd.src = './source/end.mp3';

var rad = document.getElementsByName('contact');
var numberOfPlayers;
var timeAppearanceCat;
var timeAppearanceCheese;
function checkedNumberOfPlayers(){
    for (let i=0; i<rad.length; i++) {
        if (rad[i].checked) {
            numberOfPlayers = i;
        };
    };
};

var cheese = new ProductCheese();
var jerry = new Jerry();
var jerry2 = new Jerry();
    
var tom = new Tom();

var TOP_KEY = 38;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var BOTTOM_KEY = 40;
var ESCAPE_KEY = 27;
var A_KEY = 65;
var S_KEY = 83;
var D_KEY = 68;
var W_KEY = 87;

var continueAnimating = true;

var keysPressed = {
    top: false,
    bottom: false,
    right: false, 
    left: false,
    esc: false
};


var keysPressed2 = {
    top: false,
    bottom: false,
    right: false, 
    left: false
}

function difficultySetting(){
    let gameDifficulty = document.getElementById('mySelect').selectedIndex;
    if(numberOfPlayers === 1){     
        jerry2.jerryImage.src = "./images/jerry2.png";  
        jerry.x = canvas1.width / 2 + 110;
        jerry2.x = canvas1.width / 2 - 110;
        jerry2.y = canvas1.height - 100;
    };
    switch (gameDifficulty){
        case 0:
            
            jerry.speedX = 7;
            jerry.speedY = 7;
            
            
            valVX = 1;
            valVY = 1;
            valW = 65;
            valH = 65;
            timeAppearanceCat = 6000;
            timeAppearanceCheese = 2000;
            
            if(numberOfPlayers === 1){        
                jerry2.speedX = 7;
                jerry2.speedY = 7;                
            };
        break;
        case 1:
            jerry.speedX = 7;
            jerry.speedY = 7;            
            
            valVX = 2;
            valVY = 2;
            valW = 75;
            valH = 75;
            timeAppearanceCat = 5000;
            timeAppearanceCheese = 2000;
            
            if(numberOfPlayers === 1){        
                jerry2.speedX = 7;
                jerry2.speedY = 7;                
            };

        break;
        case 2:
            jerry.speedX = 10;
            jerry.speedY = 10;            
            
            valVX = 3;
            valVY = 3;
            valW = 95;
            valH = 95;
            timeAppearanceCat = 2500;
            timeAppearanceCheese = 1000;
            
            if(numberOfPlayers === 1){        
                jerry2.speedX = 10;
                jerry2.speedY = 10;                
            };          
        break;
    };
};

function addingItems(){
    newChesse = setInterval(
        function(){
            cheese.newProduct();
            cheese.createCheese();
    }, timeAppearanceCheese);
    
    newCat = setInterval( function(){
        var random = tom.displayRandomTom();
        tom.createTom(random[0], random[1], valW, valH, valVX, valVY);
        console.log(tom);
    }, timeAppearanceCat);
};

function elementsDisabled(){
    document.getElementById('play-game').disabled = true;
    document.getElementById('mySelect').disabled = true;
    document.getElementById('new-game').style.display = "initial";
    document.getElementById('dead').style.display = "initial";
    document.getElementById('contactChoice1').disabled = true;
    document.getElementById('contactChoice2').disabled = true;
};

function clickHandler(){
    document.onkeydown = function(event){
        event.preventDefault();
        switch (event.keyCode){
            case TOP_KEY:
                keysPressed.top = true;
            break;
            case BOTTOM_KEY:
                keysPressed.bottom = true;
            break;
            case RIGHT_KEY:
                keysPressed.right = true;
            break;
            case LEFT_KEY:
                keysPressed.left = true;
            break;
            case ESCAPE_KEY:
                if(keysPressed.esc === true){
                    keysPressed.esc = false;
                    stop(keysPressed.esc);
                } else {
                    keysPressed.esc = true;
                    stop(keysPressed.esc);
                }; 
            break;
            case W_KEY:
                keysPressed2.top = true;
            break;
            case S_KEY:
                keysPressed2.bottom = true;
            break;
            case D_KEY:
                keysPressed2.right = true;
            break;
            case A_KEY:
                keysPressed2.left = true;
            break;
            
        };
    };
    
    document.onkeyup = function(event){
        switch (event.keyCode){
            case TOP_KEY:
                keysPressed.top = false;
            break;
            case BOTTOM_KEY:
                keysPressed.bottom = false;
            break;
            case RIGHT_KEY:
                keysPressed.right = false;
            break;
            case LEFT_KEY:
                keysPressed.left = false;
            break;
            case W_KEY:
                keysPressed2.top = false;
            break;
            case S_KEY:
                keysPressed2.bottom = false;
            break;
            case D_KEY:
                keysPressed2.right = false;
            break;
            case A_KEY:
                keysPressed2.left = false;
            break;
        };
    };
};



function mouseEat(mouse){
    if(mouse.eatCheese(cheese.cheeseArr) === true){
        for(let i = 0; i < cheese.cheeseArr.length; i++){
            if(cheese.cheeseArr[i].x === mouse.cheeseX && cheese.cheeseArr[i].y === mouse.cheeseY){
                if(cheese.cheeseArr[i].name === 'normal'){
                    mouse.pointCounter += 50;
                    } else if (cheese.cheeseArr[i].name === 'bad'){
                        mouse.pointCounter += 100;
                        mouse.speedX /= 2;
                        mouse.speedY /= 2;
                        setTimeout(function(){
                            mouse.speedX *= 2; 
                            mouse.speedY *= 2;
                        }, 2500);
                    };
                cheese.cheeseArr.splice(cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1);
            };
        };
    };
};


function updateCanvas1(){
    if (continueAnimating){
        Object.keys(keysPressed).forEach(function(edit){
            if(keysPressed[edit] && !keysPressed.esc){
                jerry.move(edit);
            };
        }); 

        ctx.drawImage(backgroundImg, 0, 0);
        ctx.font = "15px Times";
        ctx.fillText("Jerry: " + jerry.pointCounter + ' очков', 680 , 20);

        jerry.draw();   
        tom.draw();
        tom.move();
        cheese.draw();        
        mouseEat(jerry);    
      
        if(jerry.isDead(tom.tomArray)){
            gameOver();
        };  

        if(numberOfPlayers === 1 && !jerry.isDead(tom.tomArray)){              

            Object.keys(keysPressed2).forEach(function(edit){
                if(keysPressed2[edit] && !keysPressed.esc){
                    jerry2.move(edit);                
                };
            });           
            jerry2.draw();
            
            ctx.fillText("Jinks: " + jerry2.pointCounter + ' очков', 680 , 40);
            mouseEat(jerry2);
            // for(var i = 0; i < cheese.cheeseArr.length; i++){
            //     if(cheese.cheeseArr.length !== 0){
            //         if(jerry2.eatCheese(cheese.cheeseArr) === true){
            //             if(cheese.cheeseArr[i].name === 'normal'){
            //                 jerry2.pointCounter += 50;
            //             } else if (cheese.cheeseArr[i].name === 'bad'){
            //                 jerry2.pointCounter += 100;
            //                 jerry2.speedX /= 2;
            //                 jerry2.speedY /= 2;
            //                 setTimeout(function(){
            //                     jerry2.speedX *= 2; 
            //                     jerry2.speedY *= 2;
            //                 }, 2500);
            //             };
            //             cheese.cheeseArr.splice(
            //                 cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   
            //             );
            //         };
            //     };
            // };

            if(jerry2.isDead(tom.tomArray)){
                gameOver();
                console.log(2);
            };
        };
        requestId = requestAnimationFrame(updateCanvas1);
    };   
    
};

function playGame(){    
    updateCanvas1();  
    addingItems(); 
    clickHandler();    
};

function stop(state){
    if(state === true || state === "End Game"){
        clearInterval(newChesse);
        clearInterval(newCat);        
        continueAnimating = false; 
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'white';
        ctx.font = "100px Times";
        ctx.fillText('ПАУЗА', canvas1.width / 2 - 170, canvas1.height / 2 + 20);
        console.log('СТОП');     
    } else {
        ctx.fillStyle = 'black';
        continueAnimating = true;
        playGame();            
        console.log('ПОЕХАЛИ');
    };   
};

window.onload = function(){
    document.getElementById('play-game').onclick = function(){           
        checkedNumberOfPlayers();
        elementsDisabled();
        difficultySetting();
        soundStart(audioStart, true, 0.1);
        playGame();
    };

    document.getElementById('new-game').onclick = function(){        
        location.reload();
    };    

    document.getElementById('dead').onclick = function(){
        gameOver();
    };
};

function gameOver(){
    keysPressed.esc = "End Game";
    stop(keysPressed.esc)
    soundStop(audioStart);
    setTimeout(function(){soundStart(audioEnd, false, 0.6)}, 300);

    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'black';
    ctx.font = "60px Times";
    ctx.fillText('Конец игры', canvas1.width / 2 - 150, canvas1.height / 2 - 120);
    ctx.font = "30px Times";
    ctx.fillText('Игрок Jerry набрал: ' + jerry.pointCounter, canvas1.width / 2 - 145, canvas1.height / 2);
    if (localStorage.getItem('TomAndJerry', jerry.pointCounter) < jerry.pointCounter){
        localStorage.setItem('TomAndJerry', jerry.pointCounter);
    };
    if(numberOfPlayers === 1){  
        if (localStorage.getItem('TomAndJerry', jerry.pointCounter) < jerry2.pointCounter){
            localStorage.setItem('TomAndJerry', jerry2.pointCounter);
        };
        ctx.fillText('Игрок Jinks набрал: ' + jerry2.pointCounter, canvas1.width / 2 - 145, canvas1.height / 2 + 30);
    };

    
    
    ctx.fillText('Максимальный рекорд: ' + localStorage.getItem('TomAndJerry', jerry.pointCounter), canvas1.width / 2 - 185, canvas1.height / 2 + 150);
};