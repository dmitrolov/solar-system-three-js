window.onload = () => {
    const elements = {
        root: document.getElementById('root'),
    }
    const doc = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const keyboard = {}
    const palyer = {
        height: 1.8,
        speed: 0.1,
        turnSpeed: Math.PI * 0.012
    }
    const meshObjects = {}

    // camera
    const camera = new THREE.PerspectiveCamera(90, doc.width / doc.height, 1, 10000);
    camera.position.set(0, palyer.height, 5)

    // floor
    meshObjects.floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0x6C6C6C })
    )
    meshObjects.floor.rotation.x -= Math.PI / 2
    meshObjects.floor.receiveShadow = true;

    //ambientLight
    meshObjects.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)

    // pointLight
    meshObjects.pointLight = new THREE.PointLight(0xffffff, 0.8, 18)
    meshObjects.pointLight.position.set(1, 5, 1)
    meshObjects.pointLight.castShadow = true;

    // directionalLight
    meshObjects.directionalLight = new THREE.DirectionalLight(0xdfebff, 0.3);
    meshObjects.directionalLight.position.set(1, 7, 3);
    // meshObjects.directionalLight.position.multiplyScalar(1.3);

    meshObjects.directionalLight.castShadow = true;
    meshObjects.directionalLight.shadowCameraVisible = true;

    
    meshObjects.directionalLight.shadowCameraFar = 10;
    meshObjects.directionalLight.shadowDarkness = 0.2;

    // textureLoader
    const textureLoader = new THREE.TextureLoader();
    // const crateTexture = textureLoader.load('./crate0/crate0_diffuse.png')
    // const crateTexture = textureLoader.load('./img/futa.jpg')
    const crateTexture = textureLoader.load('./img/sefridges.png')
    const crateBumpMap = textureLoader.load('./crate0/crate0_bump.png')
    const crateNormalMap = textureLoader.load('./crate0/crate0_normal.png')

    // boxes
    const createBox = (x, y, z) => {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(x, y, z),
            new THREE.MeshPhongMaterial({ 
                color: 0xff9999,
                map: crateTexture,
                bumpMap: crateBumpMap,
                normalMap: crateNormalMap,
                side: THREE.BackSide //
                // wireframe: true
            }) // MeshLambertMaterial
        )
        mesh.position.y += 1
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        return mesh
    }
    meshObjects.box1 = createBox(1, 1, 1)
    meshObjects.box2 = createBox(1, 1, 1)
    meshObjects.crate = createBox(5, 512, 512)

    const helper = new THREE.CameraHelper(meshObjects.pointLight.shadow.camera);
    const helper2 = new THREE.CameraHelper(meshObjects.directionalLight.shadow.camera);

    // scene
    const scene = new THREE.Scene();
    scene.add(meshObjects.floor)
    scene.add(meshObjects.ambientLight)
    scene.add(meshObjects.pointLight)
    scene.add(meshObjects.directionalLight);
    scene.add(meshObjects.box1)
    scene.add(meshObjects.box2)
    scene.add(meshObjects.crate)
    // scene.add(helper);
    // scene.add(helper2);

    // renderer
    const renderer = new THREE.WebGLRenderer(); // THREE.CanvasRenderer
    renderer.setSize(doc.width, doc.height);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    elements.root.appendChild(renderer.domElement)

    animate()

    function animate() {
        requestAnimationFrame(animate);

        meshObjects.box1.rotation.x += 0.01;
        meshObjects.box1.rotation.y += 0.02;
        meshObjects.box1.position.x = 10;
        // meshObjects.box1.position.z = 5;

        meshObjects.box2.rotation.x += 0.02;
        meshObjects.box2.rotation.y += 0.03;
        meshObjects.box2.position.x = -10;

        if (keyboard['ArrowLeft']) {
            camera.rotation.y += palyer.turnSpeed
        }
        if (keyboard['ArrowRight']) {
            camera.rotation.y -= palyer.turnSpeed
        }
        if (keyboard['KeyW']) {
            camera.position.x -= Math.sin(camera.rotation.y) * palyer.speed
            camera.position.z -= Math.cos(camera.rotation.y) * palyer.speed
        }
        if (keyboard['KeyS']) {
            camera.position.x += Math.sin(camera.rotation.y) * palyer.speed
            camera.position.z += Math.cos(camera.rotation.y) * palyer.speed
        }
        if (keyboard['KeyA']) {
            camera.position.x -= Math.sin(camera.rotation.y + Math.PI / 2) * palyer.speed
            camera.position.z -= Math.cos(camera.rotation.y + Math.PI / 2) * palyer.speed
        }
        if (keyboard['KeyD']) {
            camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * palyer.speed
            camera.position.z += Math.cos(camera.rotation.y + Math.PI / 2) * palyer.speed
        }
        renderer.render(scene, camera)
    }

    window.addEventListener('keydown', (event) => {
        console.log(event.code);
        keyboard[event.code] = true
    })
    window.addEventListener('keyup', (event) => {
        console.log(event.code);
        keyboard[event.code] = false
    })

}