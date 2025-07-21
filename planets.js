import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Mercury Texture
const textureLoader = new THREE.TextureLoader();
const mercuryTexture = textureLoader.load('planets/mercury.jpg');

// Sphere
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const mercury = new THREE.Mesh(geometry, material);
scene.add(mercury);

// Animation
function animate() {
    requestAnimationFrame(animate);
    mercury.rotation.y += 0.003;
    controls.update();
    renderer.render(scene, camera);
}

animate();
