(function(){
// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas');
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var createScene = function(){
    // Create a basic BJS Scene object
  var scene = new BABYLON.Scene(engine);
  scene.createDefaultEnvironment();
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, 6), scene);
    // Target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.minZ = 0;
  camera.speed = 0.5;
    // Attach the camera to the canvas
  camera.attachControl(canvas, false);


  BABYLON.SceneLoader.LoadAssetContainer("https://mail.rainbowkereru.com/gallery/", window.location.search.substring(1, window.location.search.length)+".glb", scene, (e) => {
    e.meshes[0].position.y = 0;
    e.meshes[0].position.x = 1;
    //    e.meshes[0].rotation = new BABYLON.Vector3(0, 0 * Math.PI / 180, 0)
      e.addAllToScene();
    }, null, null, null, ".glb")

    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 7, 0), scene);

    // Return the created scene
    return scene;
}
// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});
})()
