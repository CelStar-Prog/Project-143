var PLAY = 1;
var END = 0;
var gameState = PLAY;
var boy;
var heart;
var ground, invisibleGround, groundImage;
var hearts;
var obstacle;
var gameOverImg;
var jumpSound , dieSound, virus_touchedSound

function preload(){
  boy_running = loadAnimation("boy.png");
  hearts = loadAnimation("heart.png")
  groundImage = loadImage("ground2.png"); 
  obstacle = loadImage("virus.png");
  gameOverImg = loadImage("rip.png")
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  virus_touchedSound = loadSound("virus_touch.mp3")
}

function setup() {
  createCanvas(600, 200); 
  boy = createSprite(50,160,20,50);
  boy.addAnimation("running", boy_running);
  boy.scale = 0.5;
  boy.setCollider("rectangle",0,0,boy.width,boy.height);
  heart = createSprite(20,20,500,50);
  heart.addAnimation("heart", hearts);
  heart.scale = 0.1;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(180);
  
  if(gameState === PLAY){
    for (var i = 100; i < 350; i = i + 20){
    text("Hearts: " + heart, i, 50);
    }
    gameOver.visible = false; 
    ground.velocityX = -(4 + 3* score/100)
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && boy.y >= 100) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    boy.velocityY = boy.velocityY + 0.8
    spawnObstacles();
    if(obstaclesGroup.isTouching(boy)){
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      boy.changeAnimation("collided", boy_collided);    
      ground.velocityX = 0;
      boy.velocityY = 0
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);    
   }

  boy.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
}

function reset(){
 gameState = PLAY;
 gameOver.visible = false;
 restart.visible = false;
 obstaclesGroup.destroyEach();
 cloudsGroup.destroyEach();
 boy.changeAnimation("running",boy_running)
 score = 0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = boy.depth;
    boy.depth = boy.depth + 1;
    cloudsGroup.add(cloud);
  }
}

