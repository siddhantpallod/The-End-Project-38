var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score = 0;
var gameState = "start";


function preload(){
  backImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  player.x = camera.position.x - 250;
  background(255);
 // console.log(gameState);
  
  if (gameState === "start"){
     if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.1;
        //score = 0;
        gameState = "over";    
         
     }
  
    
    if(ground.x < 0){
        ground.x = ground.width/2;
  }
       if(backgr.x < 0){
        backgr.x = backgr.width/2;
  }
       if(keyDown("space") && player.y > 300 ) {
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;
  
  
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  
  
    
  
  player.collide(ground);
    
  spawnFood();
        spawnObstacles();  
  }
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, camera.position.x + 300,50);
  
  if (gameState === "over"){
      textSize(20);
      obstaclesGroup.setVelocityEach(0);
      ground.velocityX = 0;
      backgr.velocityX = 0;
      FoodGroup.setVelocityEach(0);
      player.visible = false;
      FoodGroup.setVisibleEach(0);
       obstaclesGroup.setVisibleEach(0);
      
      stroke("white");
      text("GAME OVER !!",200,200);
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 110 === 0) {
    var banana = createSprite(camera.position.x + 300,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(camera.position.x + 300,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }  
}