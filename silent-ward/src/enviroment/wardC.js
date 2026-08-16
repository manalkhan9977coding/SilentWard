import * as THREE from "three";

import {
    darkMaterial,
    wallMaterial,
    floorMaterial,
} from "./material";


// ====================================
// CREATE BOX
// ====================================

function createBox(
    width,
    height,
    depth,
    material,
    x,
    y,
    z
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    mesh.position.set(
        x,
        y,
        z
    );


    mesh.castShadow = true;
    mesh.receiveShadow = true;


    return mesh;
}


// ====================================
// CREATE WARD C
// ====================================

export function createWardC(scene) {

    const colliders = [];


    function addCollider(mesh) {

        scene.add(mesh);

        colliders.push(mesh);

    }


    const wardCLight =
        new THREE.PointLight(
            0xffffff,
            2,
            20
        );

    wardCLight.position.set(
        0,
        3.5,
        -12
    );

    wardCLight.castShadow = true;

    scene.add(
        wardCLight
    );


    // ====================================
    // ROOM CONFIG
    // ====================================

    const ROOM_WIDTH = 10;
    const ROOM_DEPTH = 8;
    const ROOM_HEIGHT = 4;


    // ====================================
    // FLOOR
    // ====================================

    scene.add(
        createBox(
            ROOM_WIDTH,
            0.2,
            ROOM_DEPTH,
            floorMaterial,
            0,
            -0.1,
            -12
        )
    );


    // ====================================
    // BACK WALL
    // ====================================

    addCollider(
        createBox(
            ROOM_WIDTH,
            ROOM_HEIGHT,
            0.2,
            wallMaterial,
            0,
            ROOM_HEIGHT / 2,
            -16
        )
    );


    // ====================================
    // LEFT WALL
    // ====================================

    addCollider(
        createBox(
            0.2,
            ROOM_HEIGHT,
            ROOM_DEPTH,
            wallMaterial,
            -5,
            ROOM_HEIGHT / 2,
            -12
        )
    );


    // ====================================
    // RIGHT WALL
    // ====================================

    addCollider(
        createBox(
            0.2,
            ROOM_HEIGHT,
            ROOM_DEPTH,
            wallMaterial,
            5,
            ROOM_HEIGHT / 2,
            -12
        )
    );


    // ====================================
    // CEILING
    // ====================================

    scene.add(
        createBox(
            ROOM_WIDTH,
            0.2,
            ROOM_DEPTH,
            darkMaterial,
            0,
            ROOM_HEIGHT,
            -12
        )
    );


    return colliders;

}