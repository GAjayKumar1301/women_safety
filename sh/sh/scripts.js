// Initialize map variable
let map;
let triangleLayer;
let rotateAngle = 0; // Variable to track map rotation angle

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // For simplicity, using hardcoded check (Replace with real authentication)
    if (username === 'user' && password === 'password') {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('homePage').style.display = 'block';
        initializeMap();  // Initialize the map once logged in
    } else {
        alert('Invalid username or password.');
    }
});

// Handle Create Account
document.getElementById('createAccountForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // For simplicity, show a success message (Replace with real account creation logic)
    alert('Account created successfully! You can now log in.');
    showLogin(); // Return to login page
});

// Show Create Account page
function showCreateAccount() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('createAccountPage').style.display = 'block';
}

// Show Login page
function showLogin() {
    document.getElementById('createAccountPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
}

// Initialize the map
function initializeMap() {
    map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);
}

// Function to create a triangle on the map
function createTriangle() {
    // Get points from user input
    const point1 = document.getElementById('point1').value.split(',').map(Number);
    const point2 = document.getElementById('point2').value.split(',').map(Number);
    const point3 = document.getElementById('point3').value.split(',').map(Number);

    if (point1.length === 2 && point2.length === 2 && point3.length === 2) {
        // Clear the existing triangle if any
        if (triangleLayer) {
            map.removeLayer(triangleLayer);
        }

        // Create a blue triangle on the map
        triangleLayer = L.polygon([point1, point2, point3], { color: 'blue' }).addTo(map);

        // Fit map bounds to the triangle
        map.fitBounds(triangleLayer.getBounds());

        // Calculate center point of the triangle
        const center = triangleLayer.getBounds().getCenter();
        const radius = prompt("Enter the radius in kilometers for the circle around the center point:");

        if (radius) {
            drawCircle(center, parseFloat(radius));
        }
    } else {
        alert('Please enter valid coordinates for all three points.');
    }
}

// Function to draw a circle on the map
function drawCircle(center, radius) {
    // Remove previous circle if any
    if (window.circleLayer) {
        map.removeLayer(window.circleLayer);
    }

    // Convert radius from kilometers to meters
    const radiusInMeters = radius * 1000;

    // Draw a circle around the center point
    window.circleLayer = L.circle(center, {
        color: 'green',
        fillColor: '#00FF00',
        fillOpacity: 0.2,
        radius: radiusInMeters
    }).addTo(map);
}

// Function to rotate the map
function rotateMap() {
    rotateAngle = (rotateAngle + 45) % 360; // Increment angle by 45 degrees
    map.setBearing(rotateAngle); // Apply rotation
}
