
var grobjects = grobjects || [];

// allow the constructor to be "leaked" out
var Wheel = undefined;
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
     var cubeSize = 0.9;
	Wheel = function(name, position){
		this.name = name;
		this.position = position;



   
		this.biscuit1 = new Biscuit("biscuit1", position, 2.0, [1.5,0.1,0.1]);
		this.biscuit2 = new Biscuit("biscuit1", position, 2.0, [1.0,0.0,0.5]);
		/*this.biscuit1 = new Biscuit("biscuit1", position, 1.5, [1.5,0.1,0.1]);
		this.biscuit2 = new Biscuit("biscuit1", position, 1.5, [1.0,0.0,0.5]);*/
		this.randomStick1 = new RandomStick("biscuit1", position, 1.5, [1.5,0.1,0.1]);
		this.cube1 = new Pyramid("cube1",position,cubeSize,[1.0,1.0,1.0],0,LoadedImageFiles["Pattern1.jpg"].src);
		this.cube2 = new Pyramid("cube2",position,cubeSize,[1.0,1.0,1.0],0,LoadedImageFiles["Pattern2.jpg"].src);
	/*	this.cube3 = new Cube("cube3",position,0.75,[0.6,1.0,0.0]);
		this.cube4 = new Cube("cube4",position,0.65,[0.0,1.0,1.0]);
		this.cube5 = new Cube("cube5",position,0.65,[1.0,0.0,1.0]);
		this.cube6 = new Cube("cube6",position,0.65,[0.0,1.0,0.2]);*/
		
			
		this.cube3 = new Pyramid("cube3",position,cubeSize,[1.0,1.0,1.0],0,LoadedImageFiles["Pattern3.jpg"].src);
		this.cube4 = new Pyramid("cube4",position,cubeSize,[1.0,1.0,1.0],0,LoadedImageFiles["Pattern4.jpg"].src);
		this.cube5 = new Pyramid("cube5",position,cubeSize,[1.0,1.0,1.0],0,LoadedImageFiles["Pattern5.jpg"].src);
		this.cube6 = new Pyramid("cube6",position,cubeSize,[1.0,1.0,1.0],0,LoadedImageFiles["Pattern6.jpg"].src);
		
		
		this.tube7 = new newTube1("cube7",position,1.0,[1,1.0,1.0],0,LoadedImageFiles["IronTexture.jpg"].src);
		this.tube8 = new newTube2("cube8",position,1.0,[1,1.0,1.0],0,LoadedImageFiles["IronTexture.jpg"].src);
		
		this.tube9 = new newTube1("cube7",position,0.65,[1,1.0,1.0],0,LoadedImageFiles["IronTexture.jpg"].src);
		this.tube10 = new newTube2("cube8",position,0.65,[1,1.0,1.0],0,LoadedImageFiles["IronTexture.jpg"].src);
		
		//this.cube7 = new Cube("tube1",position,0.65,[0.0,1.0,0.2],1);
	}
	Wheel.prototype.init  = function(drawingState){
		this.cube1.init(drawingState);

		this.cube2.init(drawingState);
				this.cube3.init(drawingState);
		this.cube4.init(drawingState);
this.cube5.init(drawingState);	
	this.cube6.init(drawingState);	
		this.tube7.init(drawingState);
		this.tube8.init(drawingState);
		this.tube9.init(drawingState);
		this.tube10.init(drawingState);
		this.biscuit1.init(drawingState);
		this.randomStick1.init(drawingState);

	} 

		 var x = 2.0;
		 var y = 2.0;
		 var z = 2.0;
		 var time =0;
		 //var position0 = [0.0,0.0,0.0];
		 
	Wheel.prototype.draw = function(drawingState) {
		var TIME = Number(drawingState.realtime);
		 var position0 = [2.0,2.875,2.0];
		 var position00 = [2.0,2.875,1.4];
		 
		 var positiontest = [3.0,2.0,0.0];
		
		 var change = 1.625;
		 var heightChange = 2.5;
		 var frontChange =1.25;
         var radius = 2.0;
		var position1 = [change+radius*Math.sin(TIME*0.0005-3.1415926/6),heightChange+radius*Math.cos(TIME*0.0005-3.1415926/6),frontChange];
		var position2 = [change+radius*Math.sin(TIME*0.0005+3.1415926/6),heightChange+radius*Math.cos(TIME*0.0005+3.1415926/6),frontChange];
		var position3 = [change+radius*Math.sin(TIME*0.0005+3.1415926/2),heightChange+radius*Math.cos(TIME*0.0005+3.1415926/2),frontChange];
		var position4 = [change+radius*Math.sin(TIME*0.0005+5*3.1415926/6),heightChange+radius*Math.cos(TIME*0.0005+5*3.1415926/6),frontChange];
		var position5 = [change+radius*Math.sin(TIME*0.0005+7*3.1415926/6),heightChange+radius*Math.cos(TIME*0.0005+7*3.1415926/6),frontChange];
		var position6 = [change+radius*Math.sin(TIME*0.0005+3*3.1415926/2),heightChange+radius*Math.cos(TIME*0.0005+3*3.1415926/2),frontChange];

		 var position7 = [2.0,0.0,2.0];
		 var position8 = [2.0,0.0,1.4];

		 time +=0.02;
		  x += 0.02;	
		  y += 0.02;	
         this.cube2.type =1;
	     this.cube1.texture_input = LoadedImageFiles["Pattern2.jpg"].src;
		 this.cube1.position = position1;this.cube2.position = position2;this.cube3.position = position3;
		 this.cube4.position = position4;this.cube5.position = position5;this.cube6.position = position6;

		 
		 this.biscuit1.position = position0;
		 this.biscuit2.position = position00;
		 this.randomStick1.position = [2.0,2.875,1.7];
		 this.tube7.position = position7;
		 this.tube8.position = position8;
		 this.tube9.position = [0,0,0];
		 this.tube10.position = [0,0,0];

		 this.cube1.draw(drawingState);
		 this.cube2.draw(drawingState);
		 this.cube3.draw(drawingState);this.cube4.draw(drawingState);
		 this.cube5.draw(drawingState);this.cube6.draw(drawingState);
		 
		 this.tube7.draw(drawingState);
		 this.tube8.draw(drawingState);
		 this.tube9.draw(drawingState);
		 this.tube10.draw(drawingState);
		 
		 this.biscuit1.draw(drawingState);
		 this.biscuit2.draw(drawingState);
		 this.randomStick1.draw(drawingState);
		
	}
    Wheel.prototype.center = function(drawingState) {
        return this.position;
    }

})();

// put some objects into the scene
// normally, this would happen in a "scene description" file
// but I am putting it here, so that if you want to get
// rid of cubes, just don't load this file.

grobjects.push(new Wheel("FerriWheel",[5.0,5.0,5.0]));
