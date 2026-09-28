import * as THREE from 'three';

export function extractTrianglesFromObject(obj: THREE.Object3D, nameFilter?: string) {
    const rawTriangles: { pos: THREE.Vector3[], norm: THREE.Vector3 }[] = [];
    obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            if (nameFilter) {
                let matches = false;
                let current: THREE.Object3D | null = child;
                while (current) {
                    if (current.name && current.name.includes(nameFilter)) {
                        matches = true;
                        break;
                    }
                    current = current.parent;
                }
                if (!matches) return;
            }
            const mesh = child as THREE.Mesh;
            const posAttr = mesh.geometry.attributes.position;
            const index = mesh.geometry.index;
            if (posAttr) {
                mesh.updateMatrixWorld(true);
                const mat = mesh.matrixWorld;
                if (index) {
                    for (let i = 0; i < index.count; i += 3) {
                        const a = new THREE.Vector3().fromBufferAttribute(posAttr, index.getX(i)).applyMatrix4(mat);
                        const b = new THREE.Vector3().fromBufferAttribute(posAttr, index.getX(i+1)).applyMatrix4(mat);
                        const c = new THREE.Vector3().fromBufferAttribute(posAttr, index.getX(i+2)).applyMatrix4(mat);
                        const cb = new THREE.Vector3().subVectors(c, b);
                        const ab = new THREE.Vector3().subVectors(a, b);
                        const norm = cb.cross(ab).normalize();
                        rawTriangles.push({ pos: [a, b, c], norm });
                    }
                } else {
                    for (let i = 0; i < posAttr.count; i += 3) {
                        const a = new THREE.Vector3().fromBufferAttribute(posAttr, i).applyMatrix4(mat);
                        const b = new THREE.Vector3().fromBufferAttribute(posAttr, i+1).applyMatrix4(mat);
                        const c = new THREE.Vector3().fromBufferAttribute(posAttr, i+2).applyMatrix4(mat);
                        const cb = new THREE.Vector3().subVectors(c, b);
                        const ab = new THREE.Vector3().subVectors(a, b);
                        const norm = cb.cross(ab).normalize();
                        rawTriangles.push({ pos: [a, b, c], norm });
                    }
                }
            }
        }
    });
    return rawTriangles;
}

export function sampleTriangles(rawTriangles: { pos: THREE.Vector3[], norm: THREE.Vector3 }[], count: number, scale: number, rotation: {x: number, y: number, z: number} = {x:0, y:0, z:0}, offset: THREE.Vector3 = new THREE.Vector3()) {
    const sampledVerts: { p: THREE.Vector3, n: THREE.Vector3 }[] = [];
    if (rawTriangles.length === 0) {
        for (let i = 0; i < count; i++) sampledVerts.push({ p: new THREE.Vector3(), n: new THREE.Vector3(0,1,0) });
        return sampledVerts;
    }
    
    // Calculate bounding box for centering
    const box = new THREE.Box3();
    rawTriangles.forEach(tri => {
        box.expandByPoint(tri.pos[0]);
        box.expandByPoint(tri.pos[1]);
        box.expandByPoint(tri.pos[2]);
    });
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const calculatedScale = scale / (maxDim || 1);

    for (let i = 0; i < count; i++) {
        const tri = rawTriangles[Math.floor(Math.random() * rawTriangles.length)];
        const r1 = Math.random();
        const r2 = Math.random();
        const sqrtR1 = Math.sqrt(r1);
        const u = 1 - sqrtR1;
        const v = r2 * sqrtR1;
        const w = 1 - u - v;
        const p = new THREE.Vector3(
            tri.pos[0].x * u + tri.pos[1].x * v + tri.pos[2].x * w,
            tri.pos[0].y * u + tri.pos[1].y * v + tri.pos[2].y * w,
            tri.pos[0].z * u + tri.pos[1].z * v + tri.pos[2].z * w
        );
        
        p.sub(center).multiplyScalar(calculatedScale);
        
        // Apply rotation
        const euler = new THREE.Euler(rotation.x, rotation.y, rotation.z, 'XYZ');
        p.applyEuler(euler);
        const n = tri.norm.clone().applyEuler(euler);
        
        p.add(offset);
        
        sampledVerts.push({ p, n });
    }
    return sampledVerts;
}
