// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
let scene, camera, renderer, ball, baitar, gremlin, dog;
let sceneContainer = document.querySelector

("#scene-container")


function init() {
     scene = new THREE.Scene();
     scene.background = new THREE.Color(0x015220);

     camera = new THREE.PerspectiveCamera(75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    sceneContainer.appendChild(renderer.domElement);
    
    const light = new THREE.DirectionalLight(0xffffff, 3);
     light.position.set(3, 4, 5);
     scene.add(light)

     const helper = new THREE.DirectionalLightHelper(light, 5);
     scene.add(helper);
    
    const geometry = new THREE.SphereGeometry ( .5, 32, 16 );
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
   
    const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
    const material2 = new THREE.MeshBasicMaterial({ map: texture });
    ball = new THREE.Mesh( geometry, material2 );
    scene.add(ball);
    ball.scale.set(2, 2, 2)
    camera.position.z = 5;
}

document.querySelector("body").addEventListener("mousedown", () => {
  actionPant.play();
  console.log("mousedown");

  
})

document.querySelector("body").addEventListener("mouseup", () => {
 // actionPant.stop();
  actionPant.paused = true;
  console.log("mouseup");

  
})



function animate() {

requestAnimationFrame(animate);

ball.rotation.x += 0.01;
ball.rotation.y += 0.01;

ball.position.x = Math.sin(Date.now() /2000) * 2;
ball.position.y = Math.sin(Date.now() /4000) * 2;
ball.position.z = Math.sin(Date.now() /5000) * 2;

if (baitar) {
//baitar.rotation.x += 0.02;
//baitar.rotation.y += 0.02;
baitar.rotation.y = Math.sin(Date.now() /500) * 2;
}


if (gremlin) {
gremlin.rotation.x += 0.02;
gremlin.rotation.y += 0.02;

}

if (dog) {
  dog.rotation.x += 0.02;
  dog.rotation.y += 0.02;
  
  dog.position.x = Math.sin(Date.now() /2000) * 2;
  dog.position.y = Math.sin(Date.now() /4000) * 2;
  dog.position.z = Math.sin(Date.now() /5000) * 2;
  }
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
    baitar = gltf.scene;
    scene.add(baitar);
    baitar.scale.set(0.5, 0.5, 0.5)
    baitar.position.y = -2;
  });

loader.load('assets/gremlin.gltf', function (gltf) {
      gremlin = gltf.scene;
      scene.add(gremlin);
      gremlin.scale.set(4, 4, 4)
      gremlin.position.y = -2;
});

loader.load('assets/dog.gltf', function (gltf) {
  dog = gltf.scene;
  scene.add(dog);
  dog.scale.set(5, 5, 5)
  dog.position.y = -4;

  mixer = new THREE.AnimationMixer(dog)
  const clips = gltf.Animations;

  const clipPant = THREE.AnimationClip.findByName(clips, 'pant');
  const actionPant = mixer.clipAction(clipPant);
  actionPant.play();
});
// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


