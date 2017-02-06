// setup
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
camera.position.z = 5;

// geometry
var geometry = new THREE.BoxGeometry(.5, .5, .5);
var material = new THREE.MeshBasicMaterial({ color: 0xCCFF00, wireframe: true });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// loop
function render() {
	requestAnimationFrame( render );
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  move()

  renderer.render( scene, camera );
}

render();


// move
function move() {
  document.addEventListener('keydown', (key) => {
    if (key.which === 38) { // up
      cube.position.y += 0.001;
    } else if (key.which === 40) { // down
      cube.position.y -= 0.001;
    } else if (key.which === 39) { // right
      cube.position.x += 0.001;
    } else if (key.which === 37) { // left
      cube.position.x -= 0.001;
    }
  }) // end eventlistener function
} // end move function
