

var bug;
var count = 15;
var countDown = 30;
var score;
var timer = 30;
var bugSpeed = 3;

function preload(){
	bug = new Walker("bugAnimation.png", random(640), random(480));

	for( var i = 0; i < count; i++)
	{
		bug[i] = new Walker("bugAnimation.png", random(640), random(480), bugSpeed, random([-1,1]));
	}
}

function setup() {
  // put setup code here
  createCanvas(640,480);
  imageMode(CENTER);

}


function mousePressed()
{
	for( var i = 0; i < count; i++)
	{
		bug[i].squish(mouseX, mouseY);
	}
	print("mousepressed")
}

function mouseReleased()
{
	for( var i = 0; i < count; i++)
	{
		bug[i].death(mouseX, mouseY);
	}

}


 function draw(){
	 background(0, 128, 0);



	 for( var i = 0; i < count; i++)
 	{
 		bug[i].draw();
 	}


	textSize(16);
	textAlign(LEFT, TOP);
	text('Time:' + countDown, 30, 30);
	text('Score:' + score, 30, 50);
	if (frameCount % 60 == 0 && timer > 0)
	{
    countDown --;
  }
	if(countDown == 0)
		noLoop();
 }

 function Walker(imageName, x, y, speed, moving)
 {
	 this.spriteSheet = loadImage(imageName);
	 this.frame = 0;
	 this.x = x;
	 this.y = y;
	 this.moving = moving;
	 this.facing = moving;
	 this.speed = speed;
	 score = 0;

	 this.draw = function()
	 {
		 push();
		 translate(this.x, this.y);
	  	if(this.facing<0){
	  		scale(-1.0,1.0);
	  	}

			if(this.moving ==0 && this.frame == 6){
				image(this.spriteSheet, 0, 0, 54, 80, 382, 0, 54, 80);
				}
			if(this.moving ==0 && this.frame != 6){
				image(this.spriteSheet, 0, 0, 54, 80,324 , 0, 54, 80);

	  	}
	  	else{
	  		if(this.frame ==0){
	  			image(this.spriteSheet, 0, 0, 54, 80, 0, 0, 54, 80);
	  		}
	  		if(this.frame ==1){
					image(this.spriteSheet, 0, 0, 54, 80, 55, 0, 54, 80);
	  		}
	  		if(this.frame ==2){
	  			image(this.spriteSheet, 0, 0, 54, 80, 108, 0, 54, 80);
	  		}
	  		if(this.frame ==3){
	  			image(this.spriteSheet, 0, 0, 54, 80, 55, 0, 54, 80);
	  		}
	  		if(this.frame ==4){
	  			image(this.spriteSheet, 0, 0, 54, 80, 108, 0, 54, 80);
	  		}
	  		if(this.frame ==5){
	  			image(this.spriteSheet, 0, 0, 54, 80, 270, 0, 54, 80);
	  		}

				if(this.frame ==6){
	  			image(this.spriteSheet, 0, 0, 54, 80, 324, 0, 54, 80);
	  		}

	  		if(frameCount %6 ==0){
	  			this.frame = (this.frame+1)%6;
	  			this.x = this.x + this.moving*this.speed;

					if(this.x < 30)
					{
						this.moving = 1;
						this.facing = 1;
					}

					if(this.x > width - 30)
					{
						this.moving = -1;
						this.facing = -1;
					}
	  		}
	  	}

			pop();

			this.go = function(direction)
			{

					this.facing = direction;
					this.moving = direction;



			}

			this.stop = function()
			{
				this.moving = 0;
				this.frame = 4;
			}

			this.die = function()
			{
				this.moving = 0;
				this.frame = 6;
			}

			this.squish = function(x,y)
			{
				if(this.x-40 < x && x < this.x+40 && this.y-40 < y && y < this.y+40)
				{
					this.stop();
					score += 1;
				}
				this.speed += 2;
			}

			this.death = function(x,y)
			{
				if(this.x-40 < x && x < this.x+40 && this.y-40 < y && y < this.y+40)
				{
					this.die();
				}
			}



	 }
 }
