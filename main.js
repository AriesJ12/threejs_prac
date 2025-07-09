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
document.body.appendChild( renderer.domElement );