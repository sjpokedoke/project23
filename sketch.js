var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, cover, cover2;
var bottombox, sidebox1, sidebox2;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	cover = createSprite(300, 350, 300, 50);
	cover.shapeColor = "black";

	cover2 = createSprite(600, 250, 300, 50);
	cover2.shapeColor = "black";

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);

	bottombox = createSprite(400, 650, 200, 20);
	bottombox.shapeColor = "red";

	sidebox1 = createSprite(290, 610, 20, 100);
	sidebox1.shapeColor = "red";

	sidebox1 = createSprite(490, 610, 20, 100);
	sidebox1.shapeColor = "red";

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.8, isStatic:true});
	World.add(world, packageBody);

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	World.add(world, ground);

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;
  packageSprite.x = helicopterSprite.x;
  text("Congratulations! You stopped the invasion!", 200, 350);
  text("Oh no! You failed!", 500, 250);
  if (packageSprite.collide(bottombox)) {
	  helicopterSprite.destroy();
	  cover.visible = false;
	  cover2.visible = true;
	  gamestate=END;
  }
  if (packageSprite.collide(groundSprite)) {
	helicopterSprite.destroy();
	cover2.visible = false;
	cover.visible = true;
	gamestate=END;
}
  drawSprites();
}
function keyPressed() {
	if (keyCode === LEFT_ARROW&&gamestate===PLAY) {
		helicopterSprite.x = helicopterSprite.x -20;
	  }
	  if (keyCode === RIGHT_ARROW&&gamestate===PLAY) {
		helicopterSprite.x = helicopterSprite.x +20;
	  }
	if (keyCode === DOWN_ARROW&&gamestate===PLAY) {
	   Matter.Body.setStatic(packageBody,false);
	   gamestate=END;
	 }
   }