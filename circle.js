// setup scene, camera, renderer, DOM
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .2, 10000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
camera.position.z = 5

// cone
var geometry = new THREE.CircleGeometry( 5, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xCCFF00 } );
var cone = new THREE.Mesh( geometry, material );
scene.add( cone );

// move cone on keydown
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

	cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;

  renderer.render( scene, camera );
}

render();






















container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.y = 400;

				scene = new THREE.Scene();

				var light, object;

				scene.add( new THREE.AmbientLight( 0x404040 ) );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 1, 0 );
				scene.add( light );

				var map = new THREE.TextureLoader().load( 'textures/UV_Grid_Sm.jpg' );
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;

				var material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );

				//

				object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
				object.position.set( -400, 0, 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.IcosahedronGeometry( 75, 1 ), material );
				object.position.set( -200, 0, 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.OctahedronGeometry( 75, 2 ), material );
				object.position.set( 0, 0, 200 );
				scene.add( object );

				object = new THREE.Mesh( new THREE.TetrahedronGeometry( 75, 0 ), material );
				object.position.set( 200, 0, 200 );
				scene.add( object );

				//
