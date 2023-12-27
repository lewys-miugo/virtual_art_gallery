import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

import "./style2.css";

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load floor texture
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('./images/wall.jpg', () => {
    renderer.render(scene, camera); // Ensure rendering after texture is loaded
});
floorTexture.anisotropy = 16;
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(100, 100); // Repeat the texture on the floor

// Create floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2; // Rotate to be horizontal
scene.add(floor);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Set up animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Handling window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Small wall loop
const smallWallGeometry = new THREE.BoxGeometry(0.2, 5, 8);
const smallWallMaterial = new THREE.MeshBasicMaterial({ color: 0x606060 });
const s_w_posx1 = (-hallwayWidth + 1.5) / 2;
const s_w_posz1 = (-hallwayDepth) / 2;

const wallCount = 4; // Adjust this value based on how many walls you want to create
const wallSpacing = 10; // Adjust this value based on the desired spacing between walls

for (let i = 0; i < wallCount; i++) {
    const leftSmallWall = new THREE.Mesh(smallWallGeometry, smallWallMaterial);
    leftSmallWall.material.map = wallTexture;
    leftSmallWall.position.x = s_w_posx1;
    leftSmallWall.position.z = s_w_posz1 + (i + 1) * wallSpacing;

    scene.add(leftSmallWall);
}

//  small Wall constants

// const smallWallGeometry = new THREE.BoxGeometry(0.2, 5, 8 );
// const smallWallMaterial = new THREE.MeshBasicMaterial({color:0x606060});
// const s_w_posx1 = (-hallwayWidth +1.5)/2;
const s_w_posx2 = (hallwayWidth -1.5)/2;

// const s_w_posz1 = (-hallwayDepth)/2;
// const s_w_posz2 = (hallwayDepth)/2;

// <<<-------- LEFT --------->>>
// ---------Creating Left Small Wall 1
// const leftSmallWall1 = new THREE.Mesh(smallWallGeometry,smallWallMaterial);
// leftSmallWall1.material.map = wallTexture;
// leftSmallWall1.position.x = s_w_posx1;
// leftSmallWall1.position.z = s_w_posz1 +10;

// ---------creating Left small wall 2
// const leftSmallWall2 = new THREE.Mesh(smallWallGeometry,smallWallMaterial);
// leftSmallWall2.material.map = wallTexture;
// leftSmallWall2.position.x = s_w_posx1;
// leftSmallWall2.position.z = s_w_posz1 + 20;


// scene.add( leftSmallWall1,leftSmallWall2);

// <<<<______RIGHT________>>>>>>>

// <<<<<<<<<<<-----------Right--1-------->>>>>>>
// const rightSmallWall1 = new THREE.Mesh(smallWallGeometry,smallWallMaterial);
// rightSmallWall1.material.map = wallTexture;
// rightSmallWall1.position.x= s_w_posx2;
// rightSmallWall1.position.z=s_w_posz1 +10;

// <<<<<<<<<<<-----------Right--2-------->>>>>>>
// const rightSmallWall2 = new THREE.Mesh(smallWallGeometry,smallWallMaterial);
// rightSmallWall2.material.map = wallTexture;
// rightSmallWall2.position.x= s_w_posx2;
// rightSmallWall2.position.z=s_w_posz1 +20;

// scene.add(rightSmallWall1,rightSmallWall2)