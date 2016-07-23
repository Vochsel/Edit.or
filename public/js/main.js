var gl, programInfo;
var shaders = [];

var camera;

SDF.Create.circle(0, 0, 2, {r:0, g: 0, b:0}, 0.5);
SDF.Create.circle(2, 0, 1, {r:0, g: 0, b:0}, 0.95);

var headers_glsl = Resources.require("shaders/fragment/headers.glsl");
var main_glsl = Resources.require("shaders/fragment/main.glsl");
var sdf_glsl = Resources.require("shaders/fragment/sdf.glsl");
var map_glsl = Resources.require("shaders/fragment/fragment.glsl");
var fragment_glsl = "";
var vertex_glsl = Resources.require("shaders/vertex/vertex.glsl");

function Compile() {
  fragment_glsl = Utils.String.combine([headers_glsl.data, sdf_glsl.data, SDF.stringify(), main_glsl.data]);
  shaders[0] = vertex_glsl.data;
  shaders[1] = fragment_glsl;
  SetShaders(shaders[0], shaders[1]);
}

Resources.oncomplete = function() {
  

  SetupEditor();
  SetupGUI();
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
    Compile();

    var arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };

    var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    //Setup Input
    Input.setup(gl.canvas);

    //Setup Camera
    camera = Camera();
    camera.setup();

    function update(time) {
      //SDF.shapes[0].c.pos.x = -(Input.Mouse.x + 1) * camera.zoom;
      //SDF.shapes[0].c.pos.y = -(Input.Mouse.y - 0.5) * camera.zoom;
      //SDF.shapes[1].blend = Input.Mouse.y - 0.5;
      //SDF.shapes[1].c.rad = -Input.Mouse.x + 1;
      Input.update();
      camera.update();
    }

    function render(time) {
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      var uniforms = {
        time: time * 0.001,
        resolution: [gl.canvas.width, gl.canvas.height],
        camera: [camera.pos[0], camera.pos[1], camera.zoom],
        view: camera.data,
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
      Compile();
      update(time);
      render(time);
      lateUpdate(time);
      requestAnimationFrame(displayLoop);
    }
  requestAnimationFrame(displayLoop);
}
var c;
function SetupGUI() {
  c = document.getElementById("gui");
  var ctx = c.getContext('2d');

  function draw() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    var aspect = c.width / c.height;


   // console.log(camera.pos);
    ctx.save();

      ctx.scale(c.width, c.height);
      ctx.translate(0.5, 0.5)
      ctx.scale(-2, 2);
      ctx.scale(1/aspect, 1);

      //ctx.scale(1/aspect, 1);
//.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      var m = camera.data;
      //console.log(m)
      //ctx.setTransform(m[0], m[3], m[1], m[4], m[6], m[7]);
      //ctx.translate((camera.pos.x)*0.5/aspect,0);
      //console.log(camera.pos[0])
      //console.log(camera.pos);
      var s = camera.zoom / 4;
      
      ctx.scale(1/camera.zoom, 1/camera.zoom);
      ctx.translate(camera.pos[0] * s, camera.pos[1] * s);


      ctx.fillStyle = "orange";
      //ctx.fillRect(-0.5, -0.5, 1, 1);
      for(var i = 0; i < SDF.shapes.length; ++i) {
        var s = SDF.shapes[i];
        Graphics.draw.circle(ctx, -s.c.pos.x/4, -s.c.pos.y / 4, (s.c.rad / 4) - 0.025, {stroke: {color: "red", width: 0.005}}); 
      }
      //Graphics.draw.circle(ctx, 0, 0, 0.5, {stroke: {color: "red", width: 0.01}});
      //Graphics.draw.circle(ctx, 0, 0, 0.5, {stroke: {color: "red", width: 0.01}});
    ctx.restore();
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}