var gl, programInfo;
var shaders = [];

var camera;

SDF.Create.circle(0, 0, 10);

var headers_glsl = Resources.require("shaders/fragment/headers.glsl");
var main_glsl = Resources.require("shaders/fragment/main.glsl");
var sdf_glsl = Resources.require("shaders/fragment/sdf.glsl");
var map_glsl = Resources.require("shaders/fragment/fragment.glsl");
var fragment_glsl = "";
var vertex_glsl = Resources.require("shaders/vertex/vertex.glsl");


Resources.oncomplete = function() {
  fragment_glsl = Utils.String.combine([headers_glsl.data, sdf_glsl.data, SDF.stringify(), main_glsl.data]);
  shaders[0] = vertex_glsl.data;
  shaders[1] = fragment_glsl;

  SetupEditor();
}


//var sdfLib = Utils.loadFile("shaders")

function SetShaders(vertSrc, fragSrc) {
  var p = twgl.createProgramFromSources(gl, [vertSrc, fragSrc]);
  programInfo = twgl.createProgramInfoFromProgram(gl, p);
}

function Initialize() {
  //Utils.loadFile("scripts")
  Resources.load();
  //Utils.File.loadFiles(["shaders/vertex.glsl", "shaders/fragment.glsl"], function(c) {
    //console.log(c);
    //shaders = c;
    //SetupEditor();
    //SetupGUI();
  //})
}

function SetupEditor()
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

function SetupGUI() {
  var c = document.getElementById("gui");
  var ctx = c.getContext('2d');

  function draw() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
   // console.log(camera.pos);
    ctx.save();
      ctx.translate((camera.pos.x * -c.width) / 1.23, camera.pos.y * c.height / 1.23);
      ctx.scale(1/camera.zoom, 1/camera.zoom);
      ctx.fillStyle = "orange";
      ctx.fillRect(10, 10, 100, 100);
    ctx.restore();
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}