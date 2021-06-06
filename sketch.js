
var boat1;
var gameState=0;
var time=50;
var missile1,missileGroup
var bombGroup;
var score=200;
var villain1;
var villainH=100
var blobG;
var molyGroup;

function preload(){
bg=loadImage("images/background.png")
rip1=loadAnimation("images/fish11.png","images/fish21.png","images/fish31.png")
boatAnime=loadAnimation("images/boat2.png")
boatAnime2=loadImage("images/boat.png")
bomb1=loadImage("images/bomb.png")
missile4=loadImage("images/jelly.png")
flyAnime=loadAnimation("images/fly1.png","images/fly2.png")
blob=loadImage("images/drop.png")
moly1=loadImage("images/molotov.png")
villain1=loadImage("images/villain.png")
lost1=loadImage("images/lost.png")
won1=loadImage("images/won.png")
}

function setup() {
  createCanvas(1200,windowHeight);
 

bg2=createSprite(1900,400,1500,1000)
bg2.addImage(bg)
bg2.scale=4

blobG=createGroup()


 riptide= createSprite(600, 700, 50, 50);
 boat1=createSprite(820,400,100,100)
 riptide.scale=0.75
 riptide.addAnimation('play',rip1)
 riptide.addAnimation("fly",flyAnime)
 boat1.addAnimation('boat21',boatAnime)
 boat1.addAnimation('game',boatAnime2)

 
 boat1.scale=1
healthBar=createSprite(220,267,200,20)
healthBar.shapeColor='green'



console.log(boat1.x)
console.log(boat1.y)
 
 //boat1.visible=true



 missileGroup=createGroup()
 bombGroup=createGroup()
 molyGroup=createGroup()
}

function draw() {
  background("white");
 
  textSize(24)
  healthBar.width=score
  console.log(time)
if(time>0){
  gameState=0
}

 jellyG=createGroup()
  if(gameState==0){
 
    text("health :"+score/2,330,277)
   camera.position.y=700;
  camera.position.x=600

  if(riptide.y>=580){
    if(keyDown('up')){
      riptide.y=riptide.y-10
    }
  }
  if(riptide.y<=900){
    if(keyDown("down")){
      riptide.y=riptide.y+10
    }
  }
 if(riptide.x>200){
    if(keyDown('left')){
  riptide.x=riptide.x-10
    }
  }
  
 if(riptide.x<1060){
    if(keyDown('right')){
      riptide.x=riptide.x+10
    }
  }

   if(frameCount % 150==0){
bomb2=createSprite(1200,800,50,50)
bomb2.addImage(bomb1)
bomb2.velocityX=-(random(3,5))
bomb2.y=random(580,800)
bomb2.lifetime=500
bombGroup.add(bomb2)
   }
if((frameCount % 100===0)){
  missile1=createSprite(1200,700,50,50)
  missile1.velocityX=-4
  missile1.y=(random(500,800))
  missile1.addImage(missile4)
  missile1.scale=0.75
  console.log(missile1.x)
  missileGroup.add(missile1)


   }

   if(keyDown('space')&&riptide.x<=1060){
     riptide.x=riptide.x+50
   }
if(riptide.isTouching(missileGroup)&&keyDown('space')){
  missileGroup.destroyEach()
  score=score+10
}
if(riptide.isTouching(bombGroup)){
  bombGroup.destroyEach()
  score=score-20
  
}

if(score<40){
healthBar.fill('red')
}
  }
  if(gameState==1){
    camera.position.y=390
    camera.position.x=600

    
    healthBar.x=300
    healthBar.y=100
text("health :"+score/2,400,110)

riptide.changeAnimation('fly',flyAnime)
riptide .scale=1.15
boat1.changeAnimation('game',boatAnime)


if(frameCount % 50==0){
moly2=createSprite(1200,random(0,450),50,50)
moly2.addImage('playg',moly1)
moly2.scale=0.1
moly2.velocityX=-5
molyGroup.add(moly2)

}
if(riptide.isTouching(molyGroup)){
  molyGroup.destroyEach()
  score=score-20
}



boatP=createSprite(boat1.x+180,boat1.y-40,20,20)
boatP.addImage('kidnap',villain1)
boatP.scale=0.75
boatP.setCollider("rectangle",10,20,40,100)

if(riptide.y>=20){
  if(keyDown('up')){
    riptide.y=riptide.y-10
  }
}
if(riptide.y<=400){
  if(keyDown("down")){
    riptide.y=riptide.y+10
  }
}
if(riptide.x>20){
  if(keyDown('left')){
riptide.x=riptide.x-10
  }
}

if(riptide.x<1060){
  if(keyDown('right')){
    riptide.x=riptide.x+10
  }
}


if(keyWentDown("space")){
blob1=createSprite(riptide.x+40,riptide.y,5,5)
blob1.addImage('gun',blob)
blob1.velocityX=5
blob1.velocityY=3
blobG.add(blob1)
blob1.debug=true
blob1.setCollider('circle',-8,15,10)

}

if(boatP.isTouching(blobG) ){
blobG.destroyEach()
villainH=villainH-10
}


if(molyGroup.isTouching(blobG)){
  blobG.destroyEach()
  molyGroup.destroyEach()
}
  }
 console.log(villainH)

  
  time=time-0.1

if (time<0){
  
  gameState=1;
}
if(score<=0){
  score=0
  healthBar.lifetime=1
  gameState=3
}
if((time<=-100)&& villainH!==0){
  gameState=3
}
if((villainH<=0)&&time>-100){
  
  gameState=4
}
if(gameState==4){
won2=createSprite(600,500,20,20)
won2.addImage('won5',won1)
}
if(gameState==3){
lost2=createSprite(600,500,20,20)
lost2.addImage('lost5',lost1)
}
  drawSprites();
}