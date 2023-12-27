import "./style.css";
import * as THREE from "three"
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating a simple hallway
const hallwayWidth = 30;
const hallwayHeight = 20;
const hallwayDepth = 300;



// const textureLoader = new THREE.TextureLoader();
// const floorTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/b/bb/Malkin%2C_Edge%2C_and_Co_Pattern_280.jpg');
// floorTexture.anisotropy = 32;
// floorTexture.repeat.set(100, 100); // Repeat the texture on the floor
// floorTexture.wrapT = THREE.RepeatWrapping;
// floorTexture.wrapS = THREE.RepeatWrapping;

// const wallTextureLoader = new THREE.TextureLoader();
// const wallTexture1 = wallTextureLoader.load('/images/wall.jpg');
// const wallTexture2 = wallTextureLoader.load('/images/madmax.jpg');


const floorGeometry = new THREE.BoxGeometry(hallwayWidth, 0.1, hallwayDepth);
const floorMaterial = new THREE.MeshBasicMaterial({ 
  color: 0x404040,  
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add(floor);

const ceilingGeometry = new THREE.PlaneGeometry(hallwayWidth, hallwayDepth);
const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0x404040, side: THREE.DoubleSide });
const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
// ceiling.material.map = wallTexture;
ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = hallwayHeight + -10;
scene.add(ceiling);

const wallGeometry = new THREE.BoxGeometry(0.1, hallwayHeight, hallwayDepth);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x606060 });

// Small wall constants

const wallTextureLoader = new THREE.TextureLoader();
const wallTexture1 = wallTextureLoader.load('/images/wall.jpg');
const wallTexture2 = wallTextureLoader.load('/images/madmax.jpg');

const smallWallGeometry = new THREE.BoxGeometry(0.2, 5, 8);
const leftWallMaterial = new THREE.MeshBasicMaterial({ color: 0x606060 });
const rightWallMaterial = new THREE.MeshBasicMaterial({ color: 0x606060 });

const s_w_posx1 = (-hallwayWidth + 1.5) / 2;
const s_w_posx2 = (hallwayWidth -1.5)/2;

const s_w_posz1 = (-hallwayDepth) / 2;

const wallCount = 29; // Adjust this value based on how many walls you want to create
const wallSpacing = 10; // Adjust this value based on the desired spacing between walls

for (let i = 0; i < wallCount; i++) {
    const leftSmallWall = new THREE.Mesh(smallWallGeometry, leftWallMaterial);
    leftSmallWall.material.map = wallTexture1;
    leftSmallWall.position.x = s_w_posx1;
    leftSmallWall.position.z = s_w_posz1 + (i + 1) * wallSpacing;

    scene.add(leftSmallWall);
}

for (let i = 0; i < wallCount; i++) {
    const rightSmallWall = new THREE.Mesh(smallWallGeometry, rightWallMaterial);
    rightSmallWall.material.map = wallTexture2;
    rightSmallWall.position.x = s_w_posx2;
    rightSmallWall.position.z = s_w_posz1 + (i+1)*wallSpacing;

    scene.add(rightSmallWall);
    
}



// LEFT && RIGHT WALLS

const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
// leftWall.material.map = wallTexture;
leftWall.position.x = -hallwayWidth / 2;
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.x = hallwayWidth / 2;
scene.add(rightWall);


// Setting up PointerLockControls
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.getObject());


// Event listeners for movement controls
const moveForwardButton = document.getElementById('moveForward');
const moveBackwardButton = document.getElementById('moveBackward');
const moveLeftButton = document.getElementById('moveLeft');
const moveRightButton = document.getElementById('moveRight');
const resetButton = document.getElementById('resetButton');
const rotateLeftButton = document.getElementById('rotateLeft');
const rotateRightButton = document.getElementById('rotateRight');

let rotateLeftPressed = false;
let rotateRightPressed = false;
let moveForwardPressed = false;
let moveBackwardPressed = false;
let moveLeftPressed = false;
let moveRightPressed = false;

moveForwardButton.addEventListener('mousedown', () => {
    moveForwardPressed = true;
    startContinuousMove(moveForward);
});
moveForwardButton.addEventListener('mouseup', () => {
    moveForwardPressed = false;
});

moveBackwardButton.addEventListener('mousedown', () => {
    moveBackwardPressed = true;
    startContinuousMove(moveBackward);
});
moveBackwardButton.addEventListener('mouseup', () => {
    moveBackwardPressed = false;
});

moveLeftButton.addEventListener('mousedown', () => {
    moveLeftPressed = true;
    startContinuousMove(moveLeft);
});
moveLeftButton.addEventListener('mouseup', () => {
    moveLeftPressed = false;
});

moveRightButton.addEventListener('mousedown', () => {
    moveRightPressed = true;
    startContinuousMove(moveRight);
});
moveRightButton.addEventListener('mouseup', () => {
    moveRightPressed = false;
});

rotateLeftButton.addEventListener('mousedown', ()=> {
    rotateLeftPressed = true;
})

rotateLeftButton.addEventListener('mouseup', ()=> {
    rotateLeftPressed= false;
})

rotateRightButton.addEventListener('mousedown', ()=>{
    rotateRightPressed = true;
})

rotateRightButton.addEventListener('mouseup', ()=> {
    rotateRightPressed = false;
})


resetButton.addEventListener('click', resetPosition);

// Handling window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);
    if (camera.position.x < -hallwayWidth / 2 + 1) {
        camera.position.x = -hallwayWidth / 2 + 1;
    } else if (camera.position.x > hallwayWidth / 2 - 1) {
        camera.position.x = hallwayWidth / 2 - 1;
    }

    if (rotateLeftPressed) {
        rotateLeft();
    } else if (rotateRightPressed) {
        rotateRight();
    }


    renderer.render(scene, camera);
}

function moveForward() {
    controls.moveForward(0.5);
}

function moveBackward() {
    controls.moveForward(-0.5);
}

function moveLeft() {
    controls.moveRight(-0.5);
}

function moveRight() {
    controls.moveRight(0.5);
}

function resetPosition() {
    controls.getObject().position.set(0, 0, 0);
    // yawObject.rotation.y = 0;
    // pitchObject.rotation.x = 0;
}

function rotateLeft() {
    controls.getObject().rotation.y +=0.02;
}

function rotateRight() {
    controls.getObject().rotation.y -= 0.02;
}

function startContinuousMove(moveFunction) {
    function move() {
        if (moveForwardPressed || moveBackwardPressed || moveLeftPressed || moveRightPressed) {
            moveFunction();
            requestAnimationFrame(move);
        }
    }
    move();
}
controls.addEventListener('lock', function () {
    console.log('Pointer locked');
});

controls.addEventListener('unlock', function () {
    console.log('Pointer unlocked');
});

animate();