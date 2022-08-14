class CannonBall{
    constructor(x,y){
        this.radius = 30
        var options={
            isStatic: true
        }
        this.body = Bodies.circle(x,y,this.radius,options)
        World.add(world,this.body)

        this.image = loadImage("./assets/cannonball.png")

        this.trajectory = []

    }

    display(){
        push()
        imageMode(CENTER)
        image(this.image,this.body.position.x,this.body.position.y,this.radius,this.radius)
        pop()

        if(this.body.velocity.x > 0 && this.body.position.x > 20){
            var position = [this.body.position.x,this.body.position.y]
            this.trajectory.push(position)
            
        }
        for(var i = 0; i < this.trajectory.length; i++){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
    }
    shoot(){
        var newAngle = cannon.angle - 28
        newAngle = newAngle * (3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{
            x: velocity.x * (180/3.14),
            y: velocity.y * (180/3.14)
        })
    }
    remove(index){
        Matter.Body.setVelocity(this.body)
        setTimeout(()=>{
            World.remove(world,this.body)
            delete balls[index]
        },1000)
    }
    
}