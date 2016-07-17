var gl, programInfo;
var shaders;

var camera;

function SetShaders(vertSrc, fragSrc) {
  var p = twgl.createProgramFromSources(gl, [vertSrc, fragSrc]);
  programInfo = twgl.createProgramInfoFromProgram(gl, p);
}


function Initialize() {
  //Utils.loadFile("scripts")
  Utils.loadFiles(["shaders/vertex.glsl", "shaders/fragment.glsl"], function(c) {
    console.log(c);
    shaders = c;
    Setup();
  })
}

function Setup()
{
    //Setup GL
    gl = twgl.getWebGLContext(document.getElementById("editor"));
   // programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);
    SetShaders(shaders[0], shaders[1]);

    var arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };

    var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    //Setup Input
    Input.setup(gl.canvas);

    //Setup Camera
    camera = Camera();

    function update(time) {
      Input.update();
      camera.update();
    }

    function render(time) {
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      var uniforms = {
        time: time * 0.001,
        resolution: [gl.canvas.width, gl.canvas.height],
        camera: [camera.pos.x, camera.pos.y, camera.zoom],
        circle: [0.0, 0.0, 1.0],        
      };

      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, uniforms);
      
      /*var arr = twgl.createUniformSetter(programInfo.program, {
        name: "test",
        type: twgl.FLOAT,
        size: 100
      });*/
        //https://github.com/greggman/twgl.js/blob/ea0483058549b1af55e37bc6a95ecc7ad65f4fca/examples/uniform-buffer-objects.html

      //twgl.setUniforms(programInfo, { test: [[1.0, 0.0, 0.0],[0.0, 1.0, 0.0]] });
      //twgl.setUniforms(programInfo, { test: [0.0, 1.0, 0.0] });
      //twgl.setUniforms(programInfo, { test: [0.25, 0.25] });
      twgl.drawBufferInfo(gl, gl.TRIANGLES, bufferInfo);

    }

    function lateUpdate(time) {
      Input.lateUpdate();
    }

    function displayLoop(time) {
      update(time);
      render(time);
      lateUpdate(time);
      requestAnimationFrame(displayLoop);
    }
  requestAnimationFrame(displayLoop);
}