let scene, camera, renderer, orbitControls;

function load3D() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // create render
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let stlLoader = new THREE.STLLoader();
    let stlMesh = new THREE.Object3D();
    let objLoader=new THREE.OBJLoader();

    //load this if mesh is OBJ
    // objLoader.load('', function (geometry) {
    //    let mat=new THREE.MeshBasicMaterial({ color:0x7777ff });
    //    objMesh=new THREE.Mesh(geometry, mat);
    //    stlMesh.scale.set(0.6,0.6,0.6);
    //    scene.add(objMesh);
    // });

    //load this if mesh is STL
    stlLoader.load('asset/Test2.stl', function (geometry) {
        let mat = new THREE.MeshLambertMaterial({ color: 0x7777ff });
        stlMesh = new THREE.Mesh(geometry, mat);
        stlMesh.scale.set(0.6, 0.6, 0.6);
        scene.add(stlMesh);
    });

    // position the camera 
    camera.position.x = 100;
    camera.position.y = 80;
    camera.position.z = 100;

    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    let ambientLight = new THREE.AmbientLight(0x383838);
    scene.add(ambientLight);

    // add spotlight
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(300, 300, 300);
    spotLight.intensity = 0.8;
    scene.add(spotLight);

    // append renderer output to HTML
    document.getElementById("WebGL").appendChild(renderer.domElement);

    render();
    function render() {
        renderer.autoClear = false;
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        orbitControls.update();
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = load3D;
window.addEventListener('resize', onResize, false);