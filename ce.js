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

// // floor
// var geometry = new THREE.PlaneGeometry( 5, 2, 2 );
// var material = new THREE.MeshBasicMaterial( {color: 0x330066, side: THREE.DoubleSide} );
// var plane = new THREE.Mesh( geometry, material );
// scene.add( plane );

// ImprovedNoise
// http://mrl.nyu.edu/~perlin/noise/

var ImprovedNoise = function () {
	var p = [ 151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,
		 23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,
		 174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,
		 133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,
		 89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,
		 202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,
		 248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,
		 178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,
		 14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,
		 93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180 ];

	for (var i = 0; i < 256 ; i ++) {
		p[256 + i] = p[i];
	}

	function fade(t) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	function lerp(t, a, b) {
		return a + t * (b - a);
	}

	function grad(hash, x, y, z) {
		var h = hash & 15;
		var u = h < 8 ? x : y, v = h < 4 ? y : h == 12 || h == 14 ? x : z;
		return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
	}

	return {
		noise: function (x, y, z) {
			var floorX = Math.floor(x), floorY = Math.floor(y), floorZ = Math.floor(z);
			var X = floorX & 255, Y = floorY & 255, Z = floorZ & 255;
			x -= floorX;
			y -= floorY;
			z -= floorZ;
			var xMinus1 = x - 1, yMinus1 = y - 1, zMinus1 = z - 1;
			var u = fade(x), v = fade(y), w = fade(z);
			var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

			return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z),
							grad(p[BA], xMinus1, y, z)),
						lerp(u, grad(p[AB], x, yMinus1, z),
							grad(p[BB], xMinus1, yMinus1, z))),
					lerp(v, lerp(u, grad(p[AA + 1], x, y, zMinus1),
							grad(p[BA + 1], xMinus1, y, z - 1)),
						lerp(u, grad(p[AB + 1], x, yMinus1, zMinus1),
							grad(p[BB + 1], xMinus1, yMinus1, zMinus1))));

		}
	}
};

// generateTexture
function generateTexture( data, width, height ) {
	var canvas, canvasScaled, context, image, imageData,
	level, diff, vector3, sun, shade;
	vector3 = new THREE.Vector3( 0, 0, 0 );
	sun = new THREE.Vector3( 1, 1, 1 );
	sun.normalize();
	canvas = document.createElement( 'canvas' );
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext( '2d' );
	context.fillStyle = '#000';
	context.fillRect( 0, 0, width, height );
	image = context.getImageData( 0, 0, canvas.width, canvas.height );
	imageData = image.data;
	for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
		vector3.x = data[ j - 2 ] - data[ j + 2 ];
		vector3.y = 2;
		vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
		vector3.normalize();
		shade = vector3.dot( sun );
		imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
		imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
		imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
	}
	context.putImageData( image, 0, 0 );
	// Scaled 4x
	canvasScaled = document.createElement( 'canvas' );
	canvasScaled.width = width * 4;
	canvasScaled.height = height * 4;
	context = canvasScaled.getContext( '2d' );
	context.scale( 4, 4 );
	context.drawImage( canvas, 0, 0 );
	image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
	imageData = image.data;
	for ( var i = 0, l = imageData.length; i < l; i += 4 ) {
		var v = ~~ ( Math.random() * 5 );
		imageData[ i ] += v;
		imageData[ i + 1 ] += v;
		imageData[ i + 2 ] += v;
	}
	context.putImageData( image, 0, 0 );
	return canvasScaled;
}


// generateHeight for fog
function generateHeight( width, height ) {
	var size = width * height, data = new Uint8Array( size ),
	perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;
	for ( var j = 0; j < 4; j ++ ) {
		for ( var i = 0; i < size; i ++ ) {
			var x = i % width, y = ~~ ( i / width );
			data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );
		}
		quality *= 5;
	}
	return data;
}

// fog

var worldWidth = 256, worldDepth = 256,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
data = generateHeight( worldWidth, worldDepth );

camera.position.y = data[ worldHalfWidth + worldHalfDepth * worldWidth ] * 10 + 500;

var geometry = new THREE.PlaneBufferGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
geometry.rotateX( - Math.PI / 2 );

var vertices = geometry.attributes.position.array;

for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
	vertices[ j + 1 ] = data[ i ] * 10;
}

texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;

mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
scene.add( mesh );








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
