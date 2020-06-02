/*
 a second example object for graphics town
 check out "simplest" first

 the cube is more complicated since it is designed to allow making many cubes

 we make a constructor function that will make instances of cubes - each one gets
 added to the grobjects list

 we need to be a little bit careful to distinguish between different kinds of initialization
 1) there are the things that can be initialized when the function is first defined
    (load time)
 2) there are things that are defined to be shared by all cubes - these need to be defined
    by the first init (assuming that we require opengl to be ready)
 3) there are things that are to be defined for each cube instance
 */
var grobjects = grobjects || [];

// allow the two constructors to be "leaked" out
var BoatBottom = undefined;
var SpinningCube = undefined;
  var time = new Date().getTime();
// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Cubes
    BoatBottom = function BoatBottom(name, position, size, color,texture_input) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;
        this.color = color || [1.7,.3,.3];

		this.texture_input = texture_input;
		  this.texture = undefined;

    }

    BoatBottom.prototype.init = function(drawingState) {
		var height = -6;		
		var scale = 5.0;
		var height2 = -0.8;
		
		var bonusHeight = -5.0;
		//+bonusHeight
		//var width = ;
        var gl=drawingState.gl;
        // create the shaders once - for all cubes
        if (!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["pyramid-vs", "pyramid-fs"]);
        }
        if (!buffers) {
            var arrays = {
                vpos : { numComponents: 3, data: [
                      
					  
					-.5,-.5,-.5,  .5,-.5,-.5,  .5, height,-.5,        -.5,-.5,-.5,  .5, height,-.5, -.5, height,-.5,    // z = 0
                    -.5,-.5, .5,  .5,-.5, .5,  .5, height, .5,        -.5,-.5, .5,  .5, height, .5, -.5, height, .5,    // z = 1
                    -.5,height,-.5,  .5,height,-.5,  .5,height, .5,     
					-.5,height,-.5,.5,height, .5, -.5,height, .5,    // y = 0
                    -.5, -.5,-.5,  .5, -.5,-.5,  .5, -.5, .5,        -.5, -.5,-.5,  .5, -.5, .5, -.5, -.5, .5,    // y = 1
                    -.5,-.5,-.5, -.5, height,-.5, -.5, height, .5,       
					-.5,-.5,-.5, -.5, height, .5, -.5,-.5, .5,    // x = 0
                     .5,-.5,-.5,  .5,height,-.5,  .5, height, .5,       
					 .5,-.5,-.5,  .5, height, .5,  .5,-.5, .5,     // x = 1
					 
					 
					  
					  /*-------------------------船身------------------------------------*/
					 /* -1.5*scale,-0.5+bonusHeight,-0.5,
                      -1*scale,(height2)*scale+bonusHeight,-0.5,
                      1*scale,(height2)*scale+bonusHeight,-0.5,
					  
                      1.5*scale,-0.5+bonusHeight,-0.5,  
					  -1.5*scale,-0.5+bonusHeight,-0.5, 
					  1*scale,(height2)*scale+bonusHeight,-0.5,	
					  
					  -1.5*scale,-0.5+bonusHeight,0.5,
                      -1*scale,(height2)*scale+bonusHeight,0.5,
                      1*scale,(height2)*scale+bonusHeight,0.5,
					  
                      1.5*scale,-0.5+bonusHeight,0.5,  
					  -1.5*scale,-0.5+bonusHeight,0.5, 
					  1*scale,(height2)*scale+bonusHeight,0.5,	*/			  
					  				
						/*-------------------------船侧面------------------------------------*/									
						/*-1*scale,(height2)*scale+bonusHeight,-0.5,
                      1*scale,(height2)*scale+bonusHeight,-0.5,	
						1*scale,(height2)*scale+bonusHeight,0.5,

						-1*scale,(height2)*scale+bonusHeight,0.5,
                         1*scale,(height2)*scale+bonusHeight,0.5,						
                       -1*scale,(height2)*scale+bonusHeight,-0.5,
					   
					    -1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
					    -1*scale,(height2)*scale+bonusHeight,-0.5,
						
						-1.5*scale,-0.5+bonusHeight,0.5,
						-1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
						
						-1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
					    -1*scale,(height2)*scale+bonusHeight,-0.5,
						
						-1.5*scale,-0.5+bonusHeight,0.5,
						-1.5*scale,-0.5+bonusHeight,-0.5,
						-1*scale,(height2)*scale+bonusHeight,0.5,
						
						1.5*scale,-0.5+bonusHeight,-0.5,
						1*scale,(height2)*scale+bonusHeight,0.5,
					    1*scale,(height2)*scale+bonusHeight,-0.5,
						
						1.5*scale,-0.5+bonusHeight,0.5,
						1.5*scale,-0.5+bonusHeight,-0.5,
						1*scale,(height2)*scale+bonusHeight,0.5,*/
						
						
					  
					  
                   	
                ] },
                vnormal : {numComponents:3, data: [
                    0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
					
					0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
					
						0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
					
						0,0,-1, 0,0,-1, 0,0,-1,     0,0,-1, 0,0,-1, 0,0,-1,
                    0,0,1, 0,0,1, 0,0,1,        0,0,1, 0,0,1, 0,0,1,
                    0,-1,0, 0,-1,0, 0,-1,0,     0,-1,0, 0,-1,0, 0,-1,0,
                    0,1,0, 0,1,0, 0,1,0,        0,1,0, 0,1,0, 0,1,0,
                    -1,0,0, -1,0,0, -1,0,0,     -1,0,0, -1,0,0, -1,0,0,
                    1,0,0, 1,0,0, 1,0,0,        1,0,0, 1,0,0, 1,0,0,
                ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl,arrays);
        }
		if(!this.texture) {
            this.texture = twgl.createTexture(gl, {
                src : this.texture_input ,
                //wrap : gl.REPEAT,
                crossOrigin: "anonymous",
            });
            //window.setTimeout(this.draw, 200);
        }

    };
	
	var x = 0;
		var amount = 0.005;
    BoatBottom.prototype.draw = function(drawingState) {        // we make a model matrix to place the cube in the world
		
		var TIME = -Number(drawingState.realtime)*0.0005;
		var modelM = twgl.m4.scaling([this.size,this.size,this.size]);
		
		x+= amount;
		if(x >1){
		   amount = -0.005;
		}
		else if(x<-1)(
		   amount = 0.005
		)
		twgl.m4.rotateZ(modelM,x, modelM);
		
        twgl.m4.setTranslation(modelM,this.position,modelM);
		
		//twgl.m4.axisRotation([0, 0, 1], this.rotation);
        // the drawing coce is straightforward - since twgl deals with the GL stuff for us
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
        twgl.setUniforms(shaderProgram,{
            view:drawingState.view, proj:drawingState.proj, lightdir:drawingState.sunDirection,
            cubecolor:this.color, model: modelM,texSampler: this.texture });
			 gl.bindTexture(gl.TEXTURE_2D, this.texture);
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
		
    };
    BoatBottom.prototype.center = function(drawingState) {
        return this.position;
    }


})();

