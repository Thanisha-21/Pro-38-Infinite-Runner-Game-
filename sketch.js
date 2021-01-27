var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player_running,player;
var cimage;
var backimg, backgr;
var obimage;
var obGroup,coinGroup;
var gameOver, gameOverImg;
var score=0;
var ground;

function preload(){
  player_running=
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

backimg=loadImage("1c000e4b52385061590d3a4ed12afcdf.jpg");
obimage=loadImage("Stones.png");
ciimage=loadImage("coin.png");
gameOverImg = loadImage("images.png")
}

function setup() {
  createCanvas(600, 400);
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backimg);
  backgr.scale=4;
  
 
  backgr.velocityX=-4;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-10;
  
  ground.visible=false;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.17;
  
  gameOver = createSprite(250,200,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=2.25;
  
  coinGroup = new Group();
  obGroup = new Group();
}
function draw(){
text("Score: "+ score, 500,50);
   
  background("white");
  backgr.scale=0.9;
  
  if(gameState === PLAY){
gameOver.visible= false;
    player.visible=true;
    
    if(backgr.x<0){
   backgr.x=backgr.width/2;
   }
    
    if(ground.x<400) {
    ground.x=ground.width/2;
  }
    
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    
    
    if(coinGroup.isTouching(player)){
   coinGroup.destroyEach();
    score=score+1;
  }
  spawnob();
  spawncoin();
    
    if(obGroup.isTouching(player)){
        //trex.velocityY = -12;
      gameState = END;
       }
  }
  
  else if (gameState === END) {
      gameOver.visible = true;
    player.visible=false;
    ground.velocityX = 0;
    backgr.velocityX = 0;
    player.velocityY = 0;
   
    
    obGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    obGroup.destroyEach();
    coinGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    obGroup.setVelocityXEach(0);
    
    
    if(mousePressedOver(gameOver)) {
      reset();
    }
    
    
  }
  
  player.collide(ground);
  
  
  
  
  
        

    
  
 
  drawSprites();
stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);

  

}

function reset(){
   
 
  gameState= PLAY;
  gameOver.visible= false;
  
  

  score=0;
}

function spawnob(){
  if (frameCount % 200 === 0) {
 var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obimage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obGroup.add(obstacle);
  }
}

function spawncoin(){
  if (frameCount % 70 === 0) {
    var coin = createSprite(600,250,40,10);
    coin.y = random(120,200);    
    coin.addImage(ciimage);
    coin.scale = 0.05;
    coin.velocityX = -5;
     //assign lifetime to the variable
    coin.lifetime = 300;
    player.depth = coin.depth + 1;
    
    //add each banana to the group
    coinGroup.add(coin);
  }
}