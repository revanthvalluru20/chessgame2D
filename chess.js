const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a chessboard
const boardSize = 8;
const squareSize = 1;

const boardGeometry = new THREE.BoxGeometry(squareSize, 0.1, squareSize);
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xf0d9b5 });
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0xb58863 });

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const material = (i + j) % 2 === 0 ? whiteMaterial : blackMaterial;
        const square = new THREE.Mesh(boardGeometry, material);
        square.position.set(i - boardSize / 2 + 0.5, 0, j - boardSize / 2 + 0.5);
        scene.add(square);
    }
}

// Create chess pieces
const pieceMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

function createPiece(x, y, z) {
    const pieceGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.7, 32);
    const piece = new THREE.Mesh(pieceGeometry, pieceMaterial);
    piece.position.set(x, 0.35, z);
    return piece;
}

for (let i = 0; i < boardSize; i++) {
    scene.add(createPiece(i - boardSize / 2 + 0.5, 0, 1 - boardSize / 2 + 0.5)); // Example pieces
    scene.add(createPiece(i - boardSize / 2 + 0.5, 0, boardSize / 2 - 0.5)); // Example pieces
}

camera.position.z = 10;
camera.position.y = 5;
camera.lookAt(0, 0, 0);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Only required if controls.enableDamping = true, or controls.autoRotate = true
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
