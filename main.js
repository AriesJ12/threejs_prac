import * as THREE from 'three'; // imports library


// creates the scene(this is the one responsible for rendering)
const scene = new THREE.Scene();

//adding object(camera)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// parameters:
//  Field of view - how wide can the camera see
// aspect ratio
// near value - responsible for not showing objects that are too near (n < near = wont show)
// far value - same as near but for far (n > far = wont show)

//renders(more like play) the scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renders the scene
// parameters:
// width
// height
// optional updateStyle(default true) - the first 2 parameters are responsible at rendering it at a desired size but making this into "false"
// will render it at full size but at a lower resolution(like upscaling)

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); // defines the shape
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // material, allows to color it too
const cube = new THREE.Mesh( geometry, material ); // adds a mesh (combines the shape, and material)
scene.add( cube ); // add the cube to the scene

camera.position.z = 5; // position the camera - we move the camera because all "added" mesh in the line above are position at (0x,0y,0z)

function animate() { // function to render
  renderer.render( scene, camera );
}
// render the scene
renderer.setAnimationLoop( animate );