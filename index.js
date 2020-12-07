const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new THREE.TextureLoader();
const texture = loader.setCrossOrigin('anonymous').setPath('/').load('nx.jpg');
texture.anisotropy = 16;

const materials = [
    new THREE.MeshLambertMaterial({ map: loader.load('doorA.jpg'), side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ map: loader.load('doorB.jpg'), side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ map: loader.load('ceiling.jpg'), side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ map: loader.load('floor.jpg'), side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ map: loader.load('wall.jpg'), side: THREE.BackSide }),
    new THREE.MeshLambertMaterial({ map: loader.load('wall.jpg'), side: THREE.BackSide }),
]

const geometry = new THREE.BoxGeometry(3, 1, 3);
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = -0.1;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableZoom = false;

const alight = new THREE.AmbientLight( 0x404040, 5);
scene.add(alight);


const light = new THREE.DirectionalLight( 0xdfebff, 1 );
light.position.set( 50, 200, 100 );
light.position.multiplyScalar( 1.3 );

light.castShadow = true;

light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

const d = 300;

light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;

light.shadow.camera.far = 1000;

//scene.add( light );

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}

animate();

var vector = new THREE.Vector3();
document.body.onmousedown = e => {
    console.log(e)
}

var moved = false;
window.onmousemove = () => {
    moved = true;
}

window.onclick = e => {
    if(!moved) {
        camera.getWorldDirection(vector)
        console.log(vector.x);
        if(vector.x >  0.8) {
            window.location.href = '/eraseRoom';
        }
        else if(vector.x < -0.8) {
            window.location.href = '/messageRoom';
        }
    }
    moved = false;
}
