const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([ 
'./texture_map.png',
'./texture_map.png',
'./texture_map.png',
'./texture_map.png',
'./texture_map.png',
'./texture_map.png',
]);
texture.anisotropy = 16;


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ 
    map: texture,
    side: THREE.BackSide 
});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = -0.1;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableZoom = false;

const alight = new THREE.AmbientLight( 0x404040 );
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

scene.add( light );

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}

animate();
