//naming monkey,bannana,obstcles,survival time
var monkey , monkeyRunning
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,score;
 var survivalTime=0,invisibleGround;

function preload(){
  //loading the image of monkey,bannana,obstacle
        monkeyRunning =loadAnimation ("monkey_0.png", "monkey_1.png","monkey_2.png","monkey_3.png", "monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png", "monkey_8.png")
        bananaImage = loadImage("banana.png");
        obstaceImage = loadImage("obstacle.png");
 }

function setup() {
//creating the monkey
      monkey=createSprite(80,315,20,20);
       monkey.addAnimation("moving", monkeyRunning);
       monkey.scale=0.1
//creating the ground
      ground = createSprite(400,350,900,10);
      ground.velocityX=-4;
      ground.x=ground.width/2;
//creating the invisiblegroud
      invisibleGround = createSprite(200,120,400,10);
      invisibleGround.visible = false;
//creating the fruit & obstacle Group,giving the score,setting the collider
      FoodGroup = new Group();
      obstaclesGroup = new Group();
      monkey.setCollider("rectangle",0,0,monkey.width,monkey. height);
      score = 0;
 }

function draw() {
//giving the background colour
      background("white");
//giving the loop for the ground
      if(ground.x<0) {
      ground.x=ground.width/2;
}//making the monkey jump
      if(keyDown("space") ) {
        monkey.velocityY = -12;
}//giving the monkey gravity,colliding the ground,creating the food and the obstacle function
      monkey.velocityY = monkey.velocityY + 0.8;
      monkey.collide(ground);   
    Food();
      Obstacles();
//setting the end of the game
    if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
}
    stroke("black");//making the score bold  
    textSize(20);//giving the text size
    fill("black");//filling the black colour
    survivalTime=Math.ceil(frameCount/frameRate()) 
//increasing the survival time,writing the text
    text("Survival Time: "+ survivalTime, 100,50);  
//drawing the sprites
    drawSprites();
}

function Food() {
 // making the food to be sponnned,giving an image,velocity, lifetime,adding the depth,scaling the food,adding the food
    if (frameCount % 80 === 0) {
      banana = createSprite(600,250,40,10);
      banana.y = random(140,200);    
      banana.velocityX = -5;
      banana.lifetime = 300;
      monkey.depth = banana.depth + 1;
      banana.addImage(bananaImage);
      banana.scale=0.05;
      FoodGroup.add(banana);
    }
  }

function Obstacles() {
//// making the obstacles to be sponnned,giving an image, velocity,lifetime,scaling the obstacles,adding the obstacles
    if(frameCount % 300 === 0) {
      obstacle = createSprite(800,320,10,40);
      obstacle.velocityX = -6;
      obstacle.addImage(obstaceImage);
      obstacle.scale=0.15;
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
    }
  }