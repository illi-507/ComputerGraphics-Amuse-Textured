

var grobjects = grobjects || [];

// allow the constructor to be "leaked" out
var Pyramid = undefined;

// this is a function that runs at loading time (note the parenthesis at the end)
(function() {
    "use strict";

    // i will use this function's scope for things that will be shared
    // across all cubes - they can all have the same buffers and shaders
    // note - twgl keeps track of the locations for uniforms and attributes for us!
    var shaderProgram = undefined;
    var buffers = undefined;

    // constructor for Pyramid
    Pyramid = function Pyramid(name, position,size, color, dirFace, texture_input) {
        this.name = name;
        this.position = position || [0,0,0];
        this.size = size || 1.0;

        this.color = color || [.2,.3,.8];

        this.flagAngle = 0;

        this.dirFace = dirFace||0;
        this.texture_input = texture_input;
      this.texture = undefined;
    }
    Pyramid.prototype.init = function(drawingState) {
        var gl = drawingState.gl;
        if(!shaderProgram) {
            shaderProgram = twgl.createProgramInfo(gl, ["pyramid-vs", "pyramid-fs"]);
        }
        if(!buffers) {
            var arrays = {
                //  3 components = triangles
                vpos: { numComponents: 3, data: [
                    // make sure that these are in same order as cube triangles
                   
				   0,0,0, 1,0,0, 0,1,0,
				   1,1,0, 1,0,0, 0,1,0,
				   0,0,1, 1,0,1, 0,1,1,
				   1,1,1, 1,0,1, 0,1,1,
				   
                   1,0,0, 1,0,1, 1,1,1,
				   1,1,0, 1,0,0, 1,1,1,
				   
				   0,0,0, 0,0,1, 0,1,1,
				   0,1,0, 0,0,0, 0,1,1,
				   
				   0,0,0, 1,0,0, 1,0,1,
				   0,0,0, 0,0,1, 1,0,1,
				   
				   0,1,0, 1,1,0, 1,1,1,
				   0,1,0, 0,1,1, 1,1,1,
				   
				   
				 
                ]},
                vnormal : { numComponents: 3, data : [
  
                    0,-1,1, 0,-1,1, 0,-1,1,
                    -1,-1,0, -1,-1,0, -1,-1,0,
                    0,-1,-1, 0,-1,-1, 0,-1,-1,
                    1,-1,0, 1,-1,0, 1,-1,0,
					
					  0,-1,1, 0,-1,1, 0,-1,1,
                    -1,-1,0, -1,-1,0, -1,-1,0,
                    0,-1,-1, 0,-1,-1, 0,-1,-1,
                    1,-1,0, 1,-1,0, 1,-1,0,
					
					  0,-1,1, 0,-1,1, 0,-1,1,
                    -1,-1,0, -1,-1,0, -1,-1,0,
                    0,-1,-1, 0,-1,-1, 0,-1,-1,
                    1,-1,0, 1,-1,0, 1,-1,0,
					
           
                ]},
                vtex : { numComponents: 2, data : [
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
					
					 1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
					
						 1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
                    1,0,  0,0,  0.5,1,
			
                ]}
            };
            buffers = twgl.createBufferInfoFromArrays(drawingState.gl, arrays);
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
    Pyramid.prototype.draw = function(drawingState) {
        var modelM = twgl.m4.identity();
        //twgl.m4.scale(modelM, [this.size, this.size, this.size], modelM);
        // dirFace                      // 0 means door faces [0,0,1]
                                        // 1 means door faces [1,0,0]
                                        // 2 means door faces [0,0,-1]
                                        // 3 means door faces [-1,0,0]
        switch(this.dirFace) {
            case 3:
                // rotate about y axis -pi/2
                twgl.m4.rotateY(modelM, Math.PI/2, modelM);
                break;
            case 2:
                // rotate about y axis pi
                twgl.m4.rotateY(modelM, Math.PI, modelM);
                break;
            case 1:
                // rotate about y axis pi/2
                twgl.m4.rotateY(modelM, Math.PI/2, modelM);
                break;
            case 4:
                // SPECIAL; rotate about Z-axis
                twgl.m4.rotateZ(modelM, Math.PI/2, modelM);
                break;
            case 5:
                // SPECIAL :rotate about Z-axis other way
                twgl.m4.rotateZ(modelM, -Math.PI/2, modelM);
                break;
            // default is 0; do nothing
        }
        twgl.m4.setTranslation(modelM, this.position, modelM);

        if(this.dirFace == 4 || this.dirFace == 5) {// if this is a flag, rotate about Y in circle
            twgl.m4.rotateX(modelM, this.flagAngle, modelM);
            this.flagAngle += 0.01;
        }
        else if(this.dirFace == 6) {
            twgl.m4.rotateY(modelM, this.flagAngle, modelM);
            this.flagAngle += 0.01;
        }

        twgl.m4.scale(modelM, [this.size,this.size, this.size], modelM);
        var gl = drawingState.gl;
        gl.useProgram(shaderProgram.program);
        twgl.setBuffersAndAttributes(gl, shaderProgram, buffers);
        twgl.setUniforms(shaderProgram, {
            view: drawingState.view,
            proj: drawingState.proj,
            lightdir: drawingState.sunDirection,
            cubecolor: this.color,
            model: modelM,
            texSampler: this.texture 
        });
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
    };
    Pyramid.prototype.center = function(drawingState) {
        return this.position;
    }

})();

	 
//grobjects.push(new Pyramid("pyramid10", [-4,3.0,0.5], 1.0, [1.0,1.0,1.0], 0, LoadedImageFiles["Pattern1.jpg"].src ));
