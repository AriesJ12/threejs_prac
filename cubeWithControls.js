import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,  0.1, 500)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.set( 0, 20, 5 );
camera.lookAt(0,0,0)

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material ); 
scene.add( cube );


function animate(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    requestAnimationFrame( animate );
    controls.update();
    renderer.render(scene, camera)
}

animate()


