import * as THREE130 from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import calculateRotatedCubeVertexPosition from "./calc";

// #region INITIAL SETUP
const renderer = new THREE130.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE130.Scene();
scene.background = new THREE130.Color("white");


const camera = new THREE130.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    100000,
);

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(
    169.0136027223,
    45.5502155361,
    120.9541529967,
)

camera.applyQuaternion(
    new THREE130.Quaternion(
        0.3924190613069171,
        0.16154255978086512,
        0.3446887661441734,
        0.8373176999034214
    )
);

// #endregion

// #region BOX POSITION 
const maxPt = new THREE130.Vector3(
    123.6215543063,
    179.6533807719,
    52.3180612734
);

const minPt = new THREE130.Vector3(
    46.9986887541,
    103.0305152197,
    -24.3048042788
);

const box3 = new THREE130.Box3(minPt, maxPt);
const boxQN = new THREE130.Quaternion(
    0.1500588158,
    -0.3815752977,
    0.2374096503,
    0.8806357374,

    // 0, 0, 0, 0
);

const { rotatedVertices, planes } = calculateRotatedCubeVertexPosition(minPt, maxPt, boxQN);

// #endregion

const box3helper1 = new THREE130.Box3Helper(box3, new THREE130.Color("red"));
scene.add(box3helper1);

const box3helper2 = new THREE130.Box3Helper(box3, new THREE130.Color("green"))
box3helper2.applyQuaternion(boxQN);
scene.add(box3helper2);

rotatedVertices.forEach(vertex => {
    const vSphereObj = new THREE130.Mesh(
        new THREE130.SphereGeometry(3, 100, 100),
        new THREE130.LineBasicMaterial({ color: "green" }),
    );
    vSphereObj.position.x = vertex.x
    vSphereObj.position.y = vertex.y
    vSphereObj.position.z = vertex.z

    scene.add(vSphereObj)
})

planes.forEach(plane => {
    const boxCutplane = new THREE130.Vector4(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant);
    console.log(plane, boxCutplane.toArray())

    const planeObj = new THREE130.PlaneHelper(plane, 200, 0xffc500);
    scene.add(planeObj);
})

animate()

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
}

function render() {
    renderer.render(scene, camera);
}