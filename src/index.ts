import * as THREE130 from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// #region INITIAL SETUP
const renderer = new THREE130.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE130.Scene();
scene.background = new THREE130.Color("gray");


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
    0.8806357374
);
const boxRM = new THREE130.Matrix4().makeRotationFromQuaternion(boxQN);

// #endregion

const normals = [
    new THREE130.Vector3(1, 0, 0),
    new THREE130.Vector3(0, 1, 0),
    new THREE130.Vector3(0, 0, 1),
    new THREE130.Vector3(-1, 0, 0),
    new THREE130.Vector3(0, -1, 0),
    new THREE130.Vector3(0, 0, -1)
];

const planeMaterial = new THREE130.MeshBasicMaterial({
    color: "brown",
    transparent: true,
    opacity: 0.7,
    side: THREE130.DoubleSide
});

const sphere = new THREE130.SphereGeometry(3, 100, 100);

const box3helper1 = new THREE130.Box3Helper(box3, new THREE130.Color("red"));
scene.add(box3helper1);

const box3helper2 = new THREE130.Box3Helper(box3, new THREE130.Color("yellow"))
box3helper2.applyQuaternion(boxQN);
scene.add(box3helper2);

const boxVertices = [
    new THREE130.Vector3(box3.min.x, box3.min.y, box3.min.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.min.x, box3.min.y, box3.max.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.min.x, box3.max.y, box3.min.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.min.x, box3.max.y, box3.max.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.max.x, box3.min.y, box3.min.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.max.x, box3.min.y, box3.max.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.max.x, box3.max.y, box3.min.z).applyMatrix4(boxRM),
    new THREE130.Vector3(box3.max.x, box3.max.y, box3.max.z).applyMatrix4(boxRM),
];

boxVertices.forEach(vertex => {
    const vSphereObj = new THREE130.Mesh(sphere, new THREE130.LineBasicMaterial({ color: "green" }));
    vSphereObj.position.x = vertex.x
    vSphereObj.position.y = vertex.y
    vSphereObj.position.z = vertex.z

    scene.add(vSphereObj)
})

const boxPlanes = [
    new THREE130.Plane().setFromCoplanarPoints(boxVertices[0], boxVertices[1], boxVertices[2]), // bottom
    new THREE130.Plane().setFromCoplanarPoints(boxVertices[4], boxVertices[6], boxVertices[5]), // top
    new THREE130.Plane().setFromCoplanarPoints(boxVertices[0], boxVertices[2], boxVertices[4]), // left
    new THREE130.Plane().setFromCoplanarPoints(boxVertices[1], boxVertices[5], boxVertices[3]), // right
    new THREE130.Plane().setFromCoplanarPoints(boxVertices[2], boxVertices[6], boxVertices[4]), // front
    new THREE130.Plane().setFromCoplanarPoints(boxVertices[0], boxVertices[4], boxVertices[5]), // back
];

boxPlanes.forEach(plane => {
    const planeObj = new THREE130.PlaneHelper(plane, 1, 0xffc500);
    scene.add(planeObj);
})

console.log("box3", box3)
console.log("box3helper1.box", box3helper1.box)
console.log("box3helper2.box", box3helper2.box)

console.log("box3helper1.matrixWorld", box3helper1.matrixWorld)
console.log("box3helper2.matrixWorld", box3helper2.matrixWorld)

console.log(box3helper2)

const edges = new THREE130.EdgesGeometry(new THREE130.BoxGeometry(200, 200, 100))
const lines = new THREE130.LineSegments(edges, new THREE130.LineBasicMaterial({ color: "aqua" }))

animate()

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    render();
}

function render() {
    renderer.render(scene, camera);
}