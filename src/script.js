import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Sphere, SphereGeometry } from "three";

//Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.4;
material.roughness = 0.5;
material.normalMap = normalTexture;

material.color = new THREE.Color(0xff0000);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xe98, 0.1); //Light 1
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
pointLight.position.set(1, 1, -0.28);
pointLight.intensity = 22.66;
scene.add(pointLight);

// const light1 = gui.addFolder("Light 1");

// const light1Color = {
//   color: 0xffffff,
// };

// light1.addColor(light1Color, "color").onChange(() => {
//   pointLight.color.set(light1Color.color);
// });

// gui.add(pointLight.position, "x").min(-3).max(3).step(0.01);
// gui.add(pointLight.position, "y").min(-6).max(6).step(0.01);
// gui.add(pointLight.position, "z").min(-3).max(3).step(0.01);
// gui.add(pointLight, "intensity").min(0).max(50).step(0.01);

const pointLight2 = new THREE.PointLight(0xff0000, 2); //Light 2
pointLight2.position.set(1, 0.74, 1);
pointLight2.intensity = 1;
scene.add(pointLight2);

// gui.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
// gui.add(pointLight2.position, "y").min(-6).max(6).step(0.01);
// gui.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// gui.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

const pointLight3 = new THREE.PointLight(0x2660a4, 0.1); //Light 3
pointLight3.position.set(-3, -2.51, -1);
pointLight3.intensity = 5.12;
scene.add(pointLight3);

// gui.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
// gui.add(pointLight3.position, "y").min(-6).max(6).step(0.01);
// gui.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// gui.add(pointLight3, "intensity").min(0).max(10).step(0.01);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}
document.addEventListener("mousemove", onDocumentMouseMove);

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.002;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
