var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var backgroundimg,bg_image;
var score = 0;
var ground;
var endgame;
PLAY = 1;
END = 0;
var gameState = PLAY;
var endgame;
var survivalTime;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bg_image = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,300);
  
  backgroundimg = createSprite(460,90,600,600);
  backgroundimg.addImage("jungle",bg_image);
  backgroundimg.scale = 0.9;
  
  monkey = createSprite(80,205);
  monkey.addAnimation("running monkey",monkey_running);
  monkey.scale = 0.1;
  //monkey.debug = true;
  
  ground = createSprite(300,285,600,20);
  ground.visible = false;
  endgame = createSprite(300,150,600,300);
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}

function draw() {
  
  background("white");
  //console.log(monkey.y);
  
  backgroundimg.velocityX = -5.5;
  if (backgroundimg.x < 0){
    backgroundimg.x = 460
  }
  
  if(gameState === PLAY){
    
    monkeyinc();
    
    if(keyDown("space") && monkey.y > 240) {
        monkey.velocityY = -12.1;
    }
  
  survivalTime=Math.round(Math.ceil(frameCount/frameRate()))
  endgame.visible = false;
  
  monkey.velocityY = monkey.velocityY + 0.7;
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
    
    if(foodGroup.isTouching(monkey)){
      score = score + 2
      foodGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.1;
    gameState = END;
  }
  }
  
  obstacleGroup.depth = endgame.depth;
  foodGroup.depth = endgame.depth;
  endgame.depth = endgame.depth + 1;
  
  drawSprites();
  
      stroke("black")
textSize(20);
fill("black");
text ("Score:" + score, 350,50);
stroke("black")
textSize(20);
fill("black");
text ( "Survival Time: " + survivalTime*1, 100,50);
  
  if(gameState === END){
    monkey.velocityY = 0;
    obstacleGroup.setVelocityEach(0);
    endgame.visible = true;
    stroke("white");
    fill("white");
    textSize(30);
    text("Game Over", 200,150)
  }
}

function spawnObstacles() {
  if(frameCount%90 === 0){
  obstacle = createSprite(550,255)
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -5.5;
    obstacle.lifetime = 150;
    //obstacle.debug = true;
      obstacle.setCollider("rectangle",-30,0,350,350)
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas(){
  if(frameCount%80 === 0){
    banana = createSprite(190,Math.round(random(0,150)))
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityY = 1;
    banana.velocityX = -1;
    banana.lifetime = 130;
    banana.setCollider("rectangle",0,0,400,100)
    //banana.debug = true;
    foodGroup.add(banana);
  }
}

function monkeyinc(){
  switch(score){
    case 12: monkey.scale = 0.13;
      break;
      case 20: monkey.scale = 0.16;
      break;
      case 28: monkey.scale = 0.19;
      break;
      case 36: monkey.scale = 0.22;
      break;
  }
}
