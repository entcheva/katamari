// setup scene, camera, renderer, DOM
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .2, 10000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
camera.position.z = 5

// // cube
// var geometry = new THREE.BoxGeometry(.5, .5, .5);
// var material = new THREE.MeshBasicMaterial({ color: 0xCCFF00, wireframe: true });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// cone
// var geometry2 = new THREE.ConeGeometry(.5, .5, .5);
var geometry2 = new THREE.SphereGeometry(.75, 20, 20, 7, 7, 7, 7);
var material2 = new THREE.MeshBasicMaterial({ color: 0xCCFF00, wireframe: true} );
var cone = new THREE.Mesh(geometry2, material2);
scene.add(cone);

// icosahedron


// move cube/cone on keydown
document.addEventListener('keydown', keyboard, false)

function keyboard(key) {
	var speed = 0.1
	if (key.which === 38) { // up
		cone.position.z += speed;
		// camera.position.z += 1;
		// camera.updateProjectionMatrix()
	} else if (key.which === 40) { // down
		cone.position.z -= speed;
	} else if (key.which === 39) { // right
		cone.position.x += speed;
	} else if (key.which === 37) { // left
		cone.position.x -= speed;
	} else if (key.which === 69) { // e
		cone.position.z += speed;
	} else if (key.which === 88) { // x
		cone.position.z -= speed;
	} else if (key.which === 83) { // s
		cone.position.x -= speed;
	} else if (key.which === 70) { // f
		cone.position.x += speed;
	}
}

// resize renderer with browser window
function resize() {
	window.addEventListener('resize', function() {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

/****************************************************************/
// render loop
function render() {
	requestAnimationFrame( render );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

	cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;


  renderer.render( scene, camera );
}

render();
