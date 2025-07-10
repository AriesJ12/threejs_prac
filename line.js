import * as THREE from "three";

//adding renderer, camera, and scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); // set the size of animation to the whole screen
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 ); // add camera that has
// FOV of 45, ratio depending on the screen,near value of 1, far value of 500)
camera.position.set( 0, 0, 100 ); // position of the camera(center on x and y, z is farther)
camera.lookAt( 0, 0, 0 ); // looks at the center

const scene = new THREE.Scene(); // creates the scene

// adding object
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );

scene.add( line );
renderer.render( scene, camera );