const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var bgImg
var tower , towerImg
var cannon, angle = 15
var cannonBall
var balls = []
var boats = []


function preload() {

  bgImg = loadImage("./assets/background.gif")
  towerImg = loadImage("./assets/tower.png")
 
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 
 ground = Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

 tower = Bodies.rectangle(160,350,160,310,options)
 World.add(world,tower)

 angleMode(DEGREES)
 cannon = new Cannon(180,110,130,100,angle)
 
 
 
}

function draw() {
  background(189);

  image(bgImg,0,0,width,height)
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
 push()
 imageMode(CENTER)
 image(towerImg,tower.position.x,tower.position.y,160,310)
 pop()

  for(var i = 0; i < balls.length; i++ ){
    showCannonBall(balls[i])
    collisionWithBoat(i)
  }
 cannon.display()

 showBoats()
 
   
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot()

  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x,cannon.y)
    cannonBall.trajectory = []
    Matter.Body.setAngle(cannonBall.body,cannon.angle)
    balls.push(cannonBall)
  }
}

function showCannonBall(ball){
  if(ball){
    ball.display()
  }
}

function showBoats(){
  if(boats.length > 0){
    if(boats[boats.length - 1]=== undefined || boats[boats.length - 1].body.position.x < width - 300){
      var positions = [-20,-40,-60,-70]
      var position = random(positions)
      var boat = new Boat(width,height- 100,170,170,position)
      boats.push(boat)
    }

    for(var i = 0;i < boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display()
      }
    }
  }
  else{
    var boat = new Boat(width,height- 60,170,170,-60)
    boats.push(boat)
  }
  
}

function collisionWithBoat(index){
  for(var i = 0; i < boats.length; i++){
    if(boats[i] != undefined && balls[index] != undefined){
      var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
      if(collision.collided){
        boats[i].remove(i)
        World.remove(world,balls[index].body)
        delete balls[index]
      }
    }
  }

}

/*
  balls.length => here balls is an array for which we want to find the total number of items in it. Length is the command to give
  total number of items in any array
  
  balls[i] => Balls is an array for which we want to find each item one by one.

  i => is the index number to get the data from any index number of the array and it always starts from 0

  last index of an array => is always one less than the total number of items in an array because index starts from 0
*/
