// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
let scene, camera, renderer, cube;
let sceneContainer = document.querySelector
("#scene-container")


function init() {
     scene = new THREE.Scene();
     camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);
    
    const light = new THREE.DirectionalLight(0xffffff, 3);
     light.position.set(3, 4, 5);
     scene.add(light)

     const helper = new THREE.DirectionalLightHelper(light, 5);
     scene.add(helper);
    
    const geometry = new THREE.BoxGeometry ( 2, 2, 2 );
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
   
    const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
    const material2 = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh( geometry, material2 );
    scene.add(cube);
    cube.scale.set(2, 2, 2)
    camera.position.z = 5;
}



function animate() {
requestAnimationFrame(animate);

cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

renderer.render(scene, camera);

}

function onWindowResize() {
  camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();

// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/baitar.gltf', function (gltf) {
    const baitar = gltf.scene;
    scene.add(baitar);
    baitar.scale.set(0.5, 0.5, 0.5)
  });

loader.load('assets/gremlin.gltf', function (gltf) {
      const gremlin = gltf.scene;
      scene.add(gremlin);
      gremlin.scale.set(4, 4, 4)
});
// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


