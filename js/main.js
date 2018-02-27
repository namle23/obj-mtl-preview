let scene, camera, renderer;

function loadFileFromURL(url) {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function (e) {

        // file selection is done you can now read the file
        var file = this.files[0];

        // set your file encoding
        var encoding = 'ISO-8859-1';

        // create a file reader
        var reader = new FileReader();

        // set on load handler for reader
        reader.onload = function (e) {
            var result = reader.result;

            // parse using your corresponding loader
            loader.parse(result);
        }

        // read the file as text using the reader
        reader.readAsText(file, encoding);

    });
}

function load3D() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // create render
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor(new THREE.Color(0x000, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let loader = new THREE.STLLoader();
    let group = new THREE.Object3D();
    loader.load("http://www.cc.puv.fi/~tka/2018/nam/obj-mtl-preview/Test2.stl", function (geometry) {
        console.log(geometry);
        let mat = new THREE.MeshLambertMaterial({ color: 0x7777ff });
        group = new THREE.Mesh(geometry, mat);
        group.rotation.x = -0.5 * Math.PI;
        group.scale.set(0.6, 0.6, 0.6);
        scene.add(group);
    });

    // position the camera 
    camera.position.x = 100;
    camera.position.y = 80;
    camera.position.z = 100;

    //declare orbitControl, renderer.domElement prevent mouse effect in dat.GUI area
    let orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

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

function resetPage() {
    document.getElementById('resetPage').addEventListener('click', function () {
        location.reload();
    }, false);
}

window.onload = load3D;
window.addEventListener('resize', onResize, false);