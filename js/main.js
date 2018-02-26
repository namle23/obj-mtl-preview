let scene, camera, renderer, orbitControl;

function display3dModel(OBJ_PATH, OBJ_NAME, MTL_PATH, MTL_NAME) {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);

    orbitControl = new THREE.OrbitControl(camera);

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });

    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.x = 50;
    camera.position.y = 80;
    camera.position.z = 40;

    let ambientLight = new THREE.AmbientLight(0x383838);
    scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(300, 300, 300);
    spotLight.intensity = 1;
    scene.add(spotLight);

    let clock = THREE.Clock();
    let delta = clock.getDelta();

    document.getElementById('WebGL').appendChild(renderer.domElement);

    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(MTL_PATH);
    mtlLoader.setPath(MTL_PATH);
    mtlLoader.load(MTL_NAME, function (materials) {

        materials.preload();

        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(OBJ_PATH);
        objLoader.load(OBJ_NAME, function (object) {

            scene.add(object);
            object.position.y -= 60;

        });
    });

    render();

    function render() {
        renderer.autoClear = false;
        orbitControl.update(delta);
        requestAnimationFrame(render);
    }
}

//load image for wallpaper
function loadImage(imageURL) {
    document.body.style.backgroundImage = "url(" + imageURL + ")";
}

//reset page
document.getElementById('btnReset').addEventListener('click', function () {
    location.reload();
});

window.onload = display3dModel;
window.onload = loadImage;

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setResize(window.innerWidth, window.innerHeight);
}, false);