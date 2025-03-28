
// main.js
import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.1/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, ship;

init();
loadTrack();
loadShip();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 20);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  const controls = new OrbitControls(camera, renderer.domElement);
}

async function loadTrack() {
  const res = await fetch('track.json');
  const trackData = await res.json();

  const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
  trackData.segments.forEach(seg => {
    const geo = new THREE.BoxGeometry(seg.length, seg.height, seg.width);
    const mesh = new THREE.Mesh(geo, trackMaterial);
    mesh.position.set(seg.position.x, seg.position.y, seg.position.z);
    mesh.rotation.y = seg.rotationY;
    scene.add(mesh);
  });
}

async function loadShip() {
  const res = await fetch('vibeship.json');
  const shipData = await res.json();

  const geo = new THREE.BoxGeometry(shipData.dimensions.x, shipData.dimensions.y, shipData.dimensions.z);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff00ff });
  ship = new THREE.Mesh(geo, mat);
  ship.position.set(0, 1, 0);
  scene.add(ship);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
