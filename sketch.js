const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const Constraint = Matter.Constraint;

var engine, world;
var monkey, monkaS;
var fruits;
var veggies;
var rope;
var ground;
var jungle, bg;
var tree1IMG, tree2IMG, tree3IMG, tree4IMG;
var tree;
var fruits, fruitGroup;
var attacher;
var grapeIMG, bananaIMG, appleIMG, strberryIMG;
var score;
var plat;
var attacher1;

function preload() {
  jungle = loadImage("images/bg1.jpg");
  tree1IMG = loadImage("images/tree1.png");
  tree2IMG = loadImage("images/tree2.png");
  tree3IMG = loadImage("images/tree3.png");
  tree4IMG = loadImage("images/tree4.png");
  grapeIMG = loadImage("images/grape.png");
  bananaIMG = loadImage("images/banana.png");
  appleIMG = loadImage("images/apple.png");
  strberryIMG = loadImage("images/str. berry.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  engine = Engine.create();
  world = engine.world;

  bg = createSprite(1900, displayHeight/2, 10,10);
  bg.addImage(jungle);

  ground = createSprite(displayWidth/2, displayHeight, displayWidth, 100);
  ground.visible = false;

  // plat = createSprite(displayWidth/2 , 300, 2000, 30);
  // plat.velocityX = -7.5;
  // plat.shapeColor = "brown";

  plat = new Plat();
  monkey = new Monkey(230, 100);
  rope = new Rope(monkey.body, null);

  monkaS = createSprite(monkey.body.position.x, monkey.body.position.y, 80, 80);
  monkaS.visible = false;

  fruitGroup = createGroup();

  score = 0;
}

function draw() {
  background(225);  
  Engine.update(engine);
  drawSprites();
  fill("red")
  textSize(60);
  text("SCORE: "+score, displayWidth-400, 100);

  plat.display();
  monkey.display();
  //rope.display();

 
  plat.body.position.x -= 7.5;

  if(frameCount>200) {
    attacher1.display();
    attacher1.body.position.x -= 15;
  }

  bg.velocityX = -10;
  if(bg.x<-300){
    bg.x = 1900;
  }

  monkaS.x = monkey.body.position.x;
  monkaS.y = monkey.body.position.y;

  if(fruitGroup.isTouching(monkaS)) {
    fruitGroup.destroyEach();
    score+=10;
  }
  spawnTrees();
  spawnFruits();
  //spawnAttacher();
  spawnAttacher1();
}

function spawnTrees() {
  if(frameCount%200 === 0) {
    tree = createSprite(displayWidth+100, displayHeight/2, 300,300);
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: tree.addImage(tree1IMG);
      tree.scale = 1.2;
      break;
      case 2: tree.addImage(tree2IMG);
      tree.scale = 3.6;
      break;
      case 3: tree.addImage(tree3IMG);
      tree.scale = 3.6;
      break;
      case 4: tree.addImage(tree4IMG);
      tree.scale = 3.6;
      break;
      default:
      break;
    }
    tree.velocityX = -15;
    tree.lifetime = displayWidth + 100;

  }
}

function spawnFruits() {
  if(frameCount%100 === 0) {
    fruits = createSprite(displayWidth, random(displayHeight/4, 3*displayHeight/4), 300,300);
    var rand1 = Math.round(random(1,4));
    switch(rand1) {
      case 1: fruits.addImage(grapeIMG);
      fruits.scale = 0.7;
      break;
      case 2: fruits.addImage(bananaIMG);
      fruits.scale = 0.4;
      break;
      case 3: fruits.addImage(appleIMG);
      fruits.scale = 0.5;
      break;
      case 4: fruits.addImage(strberryIMG);
      fruits.scale = 0.7;
      break;
      default:
      break;
    }
    fruits.velocityX = -15;
    fruits.lifetime = displayWidth + 100;
    fruitGroup.add(fruits);

  }
}

function spawnAttacher() {
  if(frameCount%200 === 0) {
    attacher = createSprite(tree.x, tree.y-150, 30, 30);
    attacher.shapeColor = "red";
    attacher.velocityX = tree.velocityX;
    tree.lifetime = displayWidth + 100;
  }
}

function spawnAttacher1() {
  if(frameCount%200 === 0) {
    attacher1 = new Attacher(tree.x,tree.y - 150, 30);    
  }
}

function mousePressed() {
  if(mouseX == attacher1.body.position.x && mouseY == attacher1.body.position.y) {
    rope.attach(attacher1.body);
  }
}