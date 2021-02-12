var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, endImg;


function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");

}

function setup() {

  createCanvas(windowWidth,windowHeight);
  // Moving background
  path = createSprite(width/2, 200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(width/2, height - 20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();


}

function draw() {

  background(0);

boy.x = World.mouseX; 

  edges = createEdgeSprites();
  boy.collide(edges);
  if (gameState === PLAY) {
    //code to reset the background
    if (path.y > height) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 5;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 10;

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 15;

    } else {
      if (swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        jwelleryG.destroyEach();
        diamondsG.destroyEach();
        cashG.destroyEach();
        gameState = END;
      }
    }

  } else if (gameState === END) {
    path.velocityY = 0;
    boy.destroy();

    gameOver = createSprite(width/2, 100, 10, 10);
    gameOver.addAnimation("GAME OVER", endImg);
    gameOver.scale = 0.7;
    gameOver.visible = true;

    cashG.setVelocityXEach(0);
    diamondsG.setVelocityXEach(0);
    jwelleryG.setVelocityXEach(0);
    swordGroup.destroyEach();

    cashG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);



  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 50, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, width-50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale =0.3;
    cash.velocityY = 6;
    cash.lifetime = width -50;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
    var diamonds = createSprite(Math.round(random(50,width-50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.4;
    diamonds.velocityY = 7;
    diamonds.lifetime = width -50;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50,width-50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.2;
    jwellery.velocityY = 6;
    jwellery.lifetime = width -50;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 130 == 0) {
    var sword = createSprite(Math.round(random(50,width-50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.6;
    sword.velocityY =8;
    sword.lifetime = width -50;
    swordGroup.add(sword);
  }
}