// Track data for the racing game

// Make the track data global so it can be accessed from the main script
window.GAME_TRACKS = [
    // Track 1: Simple Circuit - 2 long stretches and 4 90-degree turns
    {
        id: "circuit-alpha",
        name: "Circuit Alpha",
        description: "A simple circuit with 2 long stretches and 4 90-degree turns. Perfect for beginners.",
        difficulty: 1,
        checkpoints: [
            { x: 0, z: 30, width: 10, height: 2, isStart: true },     // Start/finish line
            { x: 0, z: -30, width: 10, height: 2 },                   // Top stretch
            { x: 30, z: 0, width: 2, height: 10 },                    // Right turn
            { x: -30, z: 0, width: 2, height: 10 }                    // Left turn
        ],
        boundaries: [
            // Outer walls
            { x: 0, z: -40, width: 70, height: 2, depth: 2 },         // Top
            { x: 40, z: 0, width: 2, height: 2, depth: 80 },          // Right
            { x: 0, z: 40, width: 70, height: 2, depth: 2 },          // Bottom
            { x: -40, z: 0, width: 2, height: 2, depth: 80 },         // Left
            
            // Inner walls
            { x: 0, z: -20, width: 30, height: 2, depth: 2 },         // Top
            { x: 20, z: 0, width: 2, height: 2, depth: 40 },          // Right
            { x: 0, z: 20, width: 30, height: 2, depth: 2 },          // Bottom
            { x: -20, z: 0, width: 2, height: 2, depth: 40 }          // Left
        ],
        startPosition: { x: 0, y: 0.5, z: 25, rotation: 0 }
    },
    
    // Track 2: Grand Circuit - Longer, more complex track with multiple turns
    {
        id: "grand-circuit",
        name: "Grand Circuit",
        description: "A challenging track with tight corners, chicanes, and long straights. Test your racing skills!",
        difficulty: 3,
        checkpoints: [
            { x: 0, z: 45, width: 10, height: 2, isStart: true },     // Start/finish line
            { x: 0, z: 15, width: 10, height: 2 },                    // First straight checkpoint
            { x: 25, z: -10, width: 2, height: 10 },                  // First right turn
            { x: 50, z: -30, width: 10, height: 2 },                  // Second straight
            { x: 75, z: -10, width: 2, height: 10 },                  // Second right turn
            { x: 65, z: 20, width: 10, height: 2 },                   // Third straight
            { x: 40, z: 30, width: 2, height: 10 },                   // Third right turn
            { x: 20, z: 50, width: 10, height: 2 },                   // Fourth straight
            { x: -15, z: 40, width: 2, height: 10 },                  // Left hairpin part 1
            { x: -40, z: 20, width: 10, height: 2 },                  // Left hairpin part 2
            { x: -60, z: 0, width: 2, height: 10 },                   // Left chicane
            { x: -40, z: -20, width: 10, height: 2 },                 // Bottom left straight
            { x: -20, z: -40, width: 2, height: 10 },                 // Bottom left turn
            { x: 0, z: -20, width: 10, height: 2 }                    // Final stretch back to start
        ],
        boundaries: [
            // Outer track boundaries - Main straights
            { x: 0, z: 55, width: 100, height: 2, depth: 2 },         // Start/finish straight outer
            { x: 85, z: -30, width: 10, height: 2, depth: 2 },        // Far right straight
            { x: 20, z: 60, width: 10, height: 2, depth: 90 },        // Top straight
            { x: -70, z: 0, width: 2, height: 2, depth: 80 },         // Far left straight
            { x: -20, z: -50, width: 30, height: 2, depth: 2 },       // Bottom straight
            
            // Outer track boundaries - Curves
            { x: 90, z: -15, width: 2, height: 2, depth: 30 },        // Top right corner outer
            { x: 75, z: 40, width: 30, height: 2, depth: 2 },         // Right top corner outer
            { x: 40, z: 50, width: 2, height: 2, depth: 20 },         // Top right corner outer
            { x: -15, z: 50, width: 70, height: 2, depth: 2 },        // Top left corner outer
            { x: -60, z: 30, width: 2, height: 2, depth: 40 },        // Top left curve outer
            { x: -50, z: -30, width: 40, height: 2, depth: 2 },       // Bottom left curve outer
            { x: -20, z: -20, width: 2, height: 2, depth: 60 },       // Bottom left to center curve
            
            // Inner track boundaries
            { x: 0, z: 35, width: 60, height: 2, depth: 2 },          // Start/finish straight inner
            { x: 40, z: -10, width: 2, height: 2, depth: 90 },        // Right side inner wall 1
            { x: 65, z: -20, width: 50, height: 2, depth: 2 },        // Far right inner wall
            { x: 55, z: 10, width: 40, height: 2, depth: 2 },         // Top right inner wall
            { x: 30, z: 40, width: 2, height: 2, depth: 60 },         // Top curve inner wall
            { x: 0, z: 40, width: 50, height: 2, depth: 2 },          // Top middle inner wall
            { x: -30, z: 30, width: 2, height: 2, depth: 20 },        // Left top curve inner
            { x: -50, z: 10, width: 40, height: 2, depth: 2 },        // Left middle inner
            { x: -50, z: -10, width: 2, height: 2, depth: 40 },       // Left bottom inner
            { x: -30, z: -30, width: 40, height: 2, depth: 2 },       // Bottom left inner
            { x: -10, z: -10, width: 2, height: 2, depth: 40 },       // Bottom to center inner
            
            // Chicane/obstacle elements
            { x: 15, z: 0, width: 10, height: 2, depth: 10 }          // Center obstacle
        ],
        startPosition: { x: 0, y: 0.5, z: 40, rotation: 0 }
    }
];

// Also add helper functions to the global scope
window.getAllTracks = function() {
    return window.GAME_TRACKS;
};

window.getTrackById = function(trackId) {
    return window.GAME_TRACKS.find(track => track.id === trackId);
};