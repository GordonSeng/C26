class Boat{
    constructor(x,y,width,height,boatPos){
        this.width = width
        this.height = height
        this.boatPosition = boatPos

        this.body = Bodies.rectangle(x,y,this.width,this.height)
        World.add(world,this.body)
        
        this.image = loadImage("./assets/boat.png")
    }
    display(){
        push()
        translate(this.body.position.x,this.body.position.y)
        rotate(this.body.angle)
        imageMode(CENTER)
        image(this.image,0,this.boatPosition,this.width,this.height)
        pop()
    }
    remove(index){
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        setTimeout(()=>{
            World.remove(world,this.body)
            delete boats[index]
        },2000)
    }
}