import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from "three"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500)
camera.position.set( 100, 100, 300 ); // position of the camera(center on x and y, z is farther)
camera.lookAt( 0, 0, 0 ); // looks at the center


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

loader.load( 'matilda/matilda.glb', function ( gltf ) {

  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );


function animate() {
  // function to render
  renderer.render(scene, camera);
}
// render the scene
renderer.setAnimationLoop(animate);