import * as THREE130 from "three";

function rotateVertex(vertex: THREE130.Vector3, quaternion: THREE130.Quaternion) {
    const wQ = quaternion.w;
    const xQ = quaternion.x;
    const yQ = quaternion.y;
    const zQ = quaternion.z;

    const xR = (wQ ** 2 + xQ ** 2 - yQ ** 2 - zQ ** 2) * vertex.x + 2 * (xQ * yQ - wQ * zQ) * vertex.y + 2 * (xQ * zQ + wQ * yQ) * vertex.z
    const yR = 2 * (xQ * yQ + wQ * zQ) * vertex.x + (wQ ** 2 - xQ ** 2 + yQ ** 2 - zQ ** 2) * vertex.y + 2 * (yQ * zQ - wQ * xQ) * vertex.z
    const zR = 2 * (xQ * zQ - wQ * yQ) * vertex.x + 2 * (yQ * zQ + wQ * xQ) * vertex.y + (wQ ** 2 - xQ ** 2 - yQ ** 2 + zQ ** 2) * vertex.z

    return new THREE130.Vector3(xR, yR, zR)
}

export default function calculateRotatedCubeVertexPosition(minPt: THREE130.Vector3, maxPt: THREE130.Vector3, boxQN: THREE130.Quaternion) {

    const sourceMinPt = new THREE130.Vector3(minPt.x, minPt.y, minPt.z)
    const sourceMaxPt = new THREE130.Vector3(maxPt.x, maxPt.y, maxPt.z)

    const cubeCenter = new THREE130.Vector3(
        (sourceMinPt.x + sourceMaxPt.x) / 2,
        (sourceMinPt.y + sourceMaxPt.y) / 2,
        (sourceMinPt.z + sourceMaxPt.z) / 2,
    )

    const minPtC = sourceMinPt.sub(cubeCenter);
    const maxPtC = sourceMaxPt.sub(cubeCenter);

    const vertices = [
        new THREE130.Vector3(minPtC.x, minPtC.y, minPtC.z),
        new THREE130.Vector3(minPtC.x, minPtC.y, maxPtC.z),
        new THREE130.Vector3(minPtC.x, maxPtC.y, minPtC.z),
        new THREE130.Vector3(minPtC.x, maxPtC.y, maxPtC.z),
        new THREE130.Vector3(maxPtC.x, minPtC.y, minPtC.z),
        new THREE130.Vector3(maxPtC.x, minPtC.y, maxPtC.z),
        new THREE130.Vector3(maxPtC.x, maxPtC.y, minPtC.z),
        new THREE130.Vector3(maxPtC.x, maxPtC.y, maxPtC.z),
    ]

    const rotatedVertices = vertices.map(v => rotateVertex(v, boxQN).add(cubeCenter));


    const planes = [
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[0], rotatedVertices[1], rotatedVertices[2]), // bottom
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[4], rotatedVertices[6], rotatedVertices[5]), // top
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[0], rotatedVertices[2], rotatedVertices[4]), // left
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[1], rotatedVertices[5], rotatedVertices[3]), // right
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[2], rotatedVertices[6], rotatedVertices[4]), // front
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[0], rotatedVertices[4], rotatedVertices[5]), // back
    ];

    planes.forEach(plane => {
        const planeVec = [...plane.normal.toArray(), plane.constant]
        console.log(plane, planeVec)
    })

    return { rotatedVertices, planes }

}