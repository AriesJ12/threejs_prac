import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // lights everywhere
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // light on a certain direction
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5); // light helper(point where light is coming from the directional light)
scene.add(lightHelper);

// note: based on this, orbit controls seems to move the CAMERA not the object itself -- check the params

// Mercury Texture
const textureLoader = new THREE.TextureLoader();
const mercuryTexture = textureLoader.load("./planets/2k_mercury.jpg"); // added texture, this is basically "color" of the mesh material

// Sphere
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: mercuryTexture }); // texture here -- see it replaces the color
const mercury = new THREE.Mesh(geometry, material);
scene.add(mercury);

// venus
const venusTexture = textureLoader.load("./planets/2k_venus_surface.jpg");

const venusGeometry = new THREE.SphereGeometry(0.95, 64, 64);
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture }); // texture here -- see it replaces the color
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.x = 2.5;
scene.add(venus);

//atmosphere of venus, basically another circle overlapping on the planet venus
const glowMaterial = new THREE.ShaderMaterial({
  // this one replaces the mesh standard material
  uniforms: {
    c: { type: "f", value: 0.5 },
    p: { type: "f", value: 4.0 },
    glowColor: { type: "c", value: new THREE.Color(0xffc288) }, // warm glow
    viewVector: { type: "v3", value: camera.position },
  },
  // calculates shader(complex math)
  vertexShader: `
    void main() {
      vec3 vNormal = normalize(normalMatrix * normal);
      vec3 vNormView = normalize(normalMatrix * viewVector - modelViewMatrix * vec4(position, 1.0)).xyz;
      intensity = pow(c - dot(vNormal, vNormView), p);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(glowColor * intensity, intensity);
    }
  `,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
});
const glowGeometry = new THREE.SphereGeometry(1.15, 64, 64); // larger sphere
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
glowMesh.position.copy(venus.position);
scene.add(glowMesh);

// Animation
function animate() {
  requestAnimationFrame(animate);
  mercury.rotation.y += 0.003;
  venus.rotation.y += 0.002;
  glowMaterial.uniforms.viewVector.value = new THREE.Vector3().subVectors(
    camera.position,
    glowMesh.position
  );
  controls.update();
  renderer.render(scene, camera);
}

animate();
