// setup scene, camera, renderer, DOM
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .2, 10000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
camera.position.z = 5

// sphere
var geometry = new THREE.SphereGeometry(.5, 20, 20, 7, 7, 7, 7);
var material = new THREE.MeshBasicMaterial({ color: 0xCCFF00, wireframe: true} );
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// floor
var geometry = new THREE.PlaneGeometry( 5, 2, 2 );
var material = new THREE.MeshBasicMaterial( {color: 0x330066, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

// move sphere on keydown
document.addEventListener('keydown', keyboard, false)
function keyboard(key) {
	var speed = 0.1
	if (key.which === 38) { // up
		sphere.position.z -= speed;
		sphere.rotation.x -= speed;
		// camera.position.z += 1;
		// camera.updateProjectionMatrix()
	} else if (key.which === 40) { // down
		sphere.position.z += speed;
		sphere.rotation.x += speed;
	} else if (key.which === 39) { // right
		sphere.position.x += speed;
	} else if (key.which === 37) { // left
		sphere.position.x -= speed;
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

// render
function render() {
	requestAnimationFrame( render );
	// sphere.rotation.x += 0.001;
  // sphere.rotation.y += 0.001;
  renderer.render( scene, camera );
}

render();
