//Groups are not yet created
var tower, towerImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var ghost, ghostImg;

var invBlock, invBlockGroup;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,50,50);
  tower.addImage(towerImg);
  
  //creating a ghost
  ghost=createSprite(300,400,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
  
  invBlockGroup=createGroup(); 
  doorGroup=createGroup();
  climberGroup=createGroup();
}


function draw(){
  if(gameState===PLAY){
    tower.velocityY=1;
  if(tower.y>550){
     tower.y=300;
     }
  //ghost jump
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("space")){
     ghost.velocityY=-10; 
     }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+5;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-5;
  }
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }
  if(ghost.isTouching(invBlockGroup)){
    ghost.destroy();
    gameState=END;
  }
  spawnDoor();
  }
  if(gameState===END){
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    textSize(50);
    text("GAME OVER", 200,300);
  }
  drawSprites();
}

function spawnDoor(){
  if(frameCount%200===0){
  door = createSprite(200,50,50,50)
  door.velocityY=2;
  door.addImage(doorImg);
  door.x=Math.round(random(100,500));
  door.lifetime=300;
  doorGroup.add(door);
  door.depth=1;  
  //creating climber
  climber=createSprite(200,50,50,20);
  climber.addImage(climberImg);
  climber.velocityY=2;
  climber.x=door.x;
  climber.y=door.y+70;
  climber.lifetime=300;
  climberGroup.add(climber);
  climber.depth=1;
  //creating invBlock  
  invBlock=createSprite(200,10,70,20);
  invBlock.x=climber.x;
  invBlock.y=climber.y+10;
  invBlock.velocityY=2;
  invBlock.visible=false;
  invBlockGroup.add(invBlock);
  invBlock.lifetime=300;  
  }
}