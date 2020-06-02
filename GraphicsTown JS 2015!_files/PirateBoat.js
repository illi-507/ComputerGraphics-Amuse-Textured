
var grobjects = grobjects || [];

// allow the constructor to be "leaked" out
var PirateBoat = undefined;
var carCount = 0;
var step = 0.2;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

	PirateBoat = function(name, position){
		this.name = name;
		this.position = position;
		//name, position, size, color,NAME
	  
this.tube7 = new newTube1("cube7",position,2,[1,1.0,1.0],0,LoadedImageFiles["IronTexture.jpg"].src);
		this.tube8 = new newTube2("cube8",position,2,[1,1.0,1.0],0,LoadedImageFiles["IronTexture.jpg"].src);
		
		this.boat1 = new Boat("cube1",position,0.5,[1.0,1.0,1.0],LoadedImageFiles["BoatTexture1.jpg"].src);
		this.boat2 = new BoatBottom("cube2",position,0.5,[1.0,1.0,1.0],LoadedImageFiles["BoatTexture2.jpg"].src);
		
		
		
		
		this.cube3 = new Cube("cube3",position,1.0,[1,0.1,0.1],0);
		this.cube4 = new Cube("cube4",position,1.0,[1,0.1,0.1],0);
		this.cube5 = new Cube("cube5",position,1.0,[1,0.1,0.1],0);		
		this.cube6 = new Cube("cube5",position,1.0,[1,0.1,0.1],0);
		
		
		this.cube7 = new Cube("cube7",position,0.5,[0.1,0.9,0.2],0);
		this.cube8 = new Cube("cube7",position,0.5,[0.9,0.9,0.0],0);
		this.cube9 = new Cube("cube7",position,0.5,[0.9,0.9,0.0],0);
		
		this.cube10 = new Cube("cube7",position,0.5,[0.1,0.1,0.9],0);
		this.cube11 = new Cube("cube7",position,0.5,[0.1,0.1,0.9],0);
		this.cube12 = new Cube("cube7",position,0.5,[0.1,0.1,0.9],0);
		this.cube13 = new Cube("cube7",position,0.5,[0.1,0.1,0.9],0);
		this.cube14 = new Cube("cube7",position,0.5,[0.1,0.1,0.9],0);
		this.cube15 = new Cube("cube7",position,0.5,[0.1,0.1,0.9],0);
		
		/*this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);
		this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);
		this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);
		this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);
		this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);
		this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);
		this.cube5 = new Cube("cube5",position,1.0,[0.1,0.1,0.9],0);*/
		

		
		//this.cube7 = new Cube("tube1",position,0.65,[0.0,1.0,0.2],1);
	}
	PirateBoat.prototype.init  = function(drawingState){
		this.boat1.init(drawingState);
		this.boat2.init(drawingState);
		this.tube7.init(drawingState);
		this.tube8.init(drawingState);
		this.cube3.init(drawingState);
	} 
		 var x = 0.0;
		 var y = 2.0;
		 var z = 2.0;
		 var time = 0;		 
		 
	PirateBoat.prototype.draw = function(drawingState) {
		var TIME = Number(drawingState.realtime);		
		if(x < 0.5&& x >0.0){
			x++;
		}
		else if(x>4.0 && x<5.0){
			x--;
		}
		
		
	var position1 = [-1.0,5.5,-4.0];
	
	var position2 = [-1.0,1.5,-4.0];
	var position3 = [-1.0,1.5,-3.0];
	var position4 = [-1.0,0.5,-3.0];
	var position5 = [-1.0,1.5,-5.0];
	var position6 = [-1.0,0.5,-5.0];
	
	//var position6 = [-3.25,2*Math.sin(TIME*0.0005)+2.5,4.75];
	var position7 = [-2.75,2*Math.sin(TIME*0.0005)+2.5,4.75];
	var position8 = [-3.25,2*Math.sin(TIME*0.0005+3.1415926)+2.5,3.25];
	var position9 = [-2.75,2*Math.sin(TIME*0.0005+3.1415926)+2.5,3.25];
	
	var position10 = [-3.25,0.5,4.75];
	var position11 = [-3.25,0.5,4.75];
	var position12 = [-3.25,0.5,4.75];
	var position13 = [-3.25,0.5,4.75];
	var position14 = [-3.25,0.5,4.75];
	var position15 = [-3.25,0.5,4.75];
	
	
	this.boat1.position = position1;
	this.boat2.position = position1;
	
	this.tube8.position = position2;
	this.tube7.position = position2;
	this.cube3.position = position3;
	this.cube4.position = position4;
	this.cube5.position = position5;
	this.cube6.position = position6;
	

	
	//this.cube2.position = position2;
	
	this.cube7.position = position7;
	this.cube8.position = position8;
	this.cube9.position = position9;

	this.boat1.draw(drawingState);
	this.boat2.draw(drawingState);
	this.tube7.draw(drawingState);
	this.tube8.draw(drawingState);
	this.cube3.draw(drawingState);
	this.cube4.draw(drawingState);
	this.cube5.draw(drawingState);
	this.cube6.draw(drawingState);

		
	}
    PirateBoat.prototype.center = function(drawingState) {
        return this.position;
    }

})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

grobjects.push(new PirateBoat("PirateBoat1",[5.0,5.0,5.0]));

