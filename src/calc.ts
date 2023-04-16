import * as THREE130 from "three";

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

    const rotatedVertices = vertices.map(v => v.applyQuaternion(boxQN).add(cubeCenter));

    const planes = [
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[0], rotatedVertices[1], rotatedVertices[2]), // -x face
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[1], rotatedVertices[5], rotatedVertices[7]), // +z face
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[5], rotatedVertices[4], rotatedVertices[6]), // +x face
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[4], rotatedVertices[0], rotatedVertices[2]), // -z face
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[2], rotatedVertices[3], rotatedVertices[6]), // -y face
        new THREE130.Plane().setFromCoplanarPoints(rotatedVertices[1], rotatedVertices[0], rotatedVertices[4]), // +y face
    ];

    const forgePlanes = planes.map(plane => {
        return new THREE130.Vector4(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant).toArray();
    });

    console.log(JSON.stringify(forgePlanes))

    return {
        rotatedVertices,
        planes,
        forgePlanes,
    };

}