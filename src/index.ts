import * as THREE130 from "three";

const scene = new THREE130.Scene();
scene.background = new THREE130.Color("gray");

// #region CAMERA

const camera = new THREE130.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    100000,
);
camera.position.x = 169.0136027223;
camera.position.y = 45.5502155361;
camera.position.z = 120.9541529967;

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

// #endregion

const normals = [
    new THREE130.Vector3(1, 0, 0),
    new THREE130.Vector3(0, 1, 0),
    new THREE130.Vector3(0, 0, 1),
    new THREE130.Vector3(-1, 0, 0),
    new THREE130.Vector3(0, -1, 0),
    new THREE130.Vector3(0, 0, -1)
];

const boxRotationMatrix = new THREE130.Matrix4();
boxRotationMatrix.makeRotationFromQuaternion(boxQN);
const testbox = new THREE130.Box3(minPt, maxPt);

const helper1 = new THREE130.Box3Helper(testbox, new THREE130.Color("red"));
scene.add(helper1);

const helper2 = new THREE130.Box3Helper(
    box3,
    new THREE130.Color("yellow")
).applyQuaternion(boxQN);
scene.add(helper2);



const planeGeometry = new THREE130.PlaneGeometry(500, 500);
const material = new THREE130.MeshBasicMaterial({
    color: "brown",
    transparent: true,
    opacity: 0.7,
    side: THREE130.DoubleSide
});
const planes = new THREE130.Mesh(planeGeometry, material)
// scene.add(planes)


const edges = new THREE130.EdgesGeometry(new THREE130.BoxGeometry(200, 200, 100))
const lines = new THREE130.LineSegments(edges, new THREE130.LineBasicMaterial({ color: "aqua" }))
// scene.add(lines)


console.log(helper2)

const renderer = new THREE130.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphere = new THREE130.SphereGeometry(5, 100, 100);

const sphere1 = new THREE130.Mesh(sphere, new THREE130.LineBasicMaterial({ color: "green" }));
sphere1.position.x = 123.6215543063
sphere1.position.y = 179.6533807719
sphere1.position.z = 52.3180612734
sphere1.applyQuaternion(boxQN)

scene.add(sphere1)
console.log(sphere1);

renderer.render(scene, camera);

