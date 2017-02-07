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


// move object on keydown
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
	})
}

// resize renderer with browser window
function resize() {
	window.addEventListener('resize', function() {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

// add controls to pan with mouse
controls = new THREE.OrbitControls(camera, renderer.domElement);

/****************************************************************/
// render loop
function render() {
	requestAnimationFrame( render );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  move()
	resize()

  renderer.render( scene, camera );
}

render();
