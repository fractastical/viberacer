// Track data for the racing game

// Make the track data global so it can be accessed from the main script
window.GAME_TRACKS = [
    // Track 1: Circuit Alpha - simple track with updated checkpoint order
    {
        id: "circuit-alpha",
        name: "Circuit Alpha",
        description: "A simple circuit with 2 long stretches and 4 90-degree turns. Perfect for beginners.",
        difficulty: 1,
        checkpoints: [
            // Start/finish line at the bottom straight
            { x: 0, z: 30, width: 30, height: 2, isStart: true },     // Checkpoint 0: Start/finish line
            
            // Proceed counter-clockwise around the track
            { x: -20, z: 10, width: 2, height: 20 },                  // Checkpoint 1: After first left turn
            { x: -20, z: -10, width: 2, height: 20 },                 // Checkpoint 2: Before second left turn
            
            // Top straight
            { x: 0, z: -30, width: 30, height: 2 },                   // Checkpoint 3: Top straight
            
            // Right side checkpoints
            { x: 20, z: -10, width: 2, height: 20 },                  // Checkpoint 4: After first right turn
            { x: 20, z: 10, width: 2, height: 20 }                    // Checkpoint 5: Before final right turn back to start
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
    
    // Track 2: Grand Circuit - simplified to intermediate difficulty
    {
        id: "grand-circuit",
        name: "Grand Circuit",
        description: "An intermediate track with a mix of straight sections and moderate turns.",
        difficulty: 2,
        checkpoints: [
            // Start/finish line on the bottom straight
            { x: 0, z: 45, width: 30, height: 2, isStart: true },     // Checkpoint 0: Start/finish line
            
            // First section - gentle curve to the left
            { x: -20, z: 30, width: 2, height: 20 },                  // Checkpoint 1: First left curve
            
            // Back straight - long straight section
            { x: -45, z: 0, width: 2, height: 30 },                   // Checkpoint 2: Back straight
            
            // Top section - gentle S curve
            { x: -20, z: -30, width: 2, height: 20 },                 // Checkpoint 3: Top left curve
            { x: 0, z: -45, width: 30, height: 2 },                   // Checkpoint 4: Top section
            
            // Final section - right curves back to start
            { x: 20, z: -30, width: 2, height: 20 },                  // Checkpoint 5: Top right curve
            { x: 45, z: 0, width: 2, height: 30 },                    // Checkpoint 6: Right side straight
            { x: 20, z: 30, width: 2, height: 20 }                    // Checkpoint 7: Final right curve
        ],
        boundaries: [
            // Outer walls
            { x: 0, z: -55, width: 100, height: 2, depth: 2 },        // Top
            { x: 55, z: 0, width: 2, height: 2, depth: 110 },         // Right
            { x: 0, z: 55, width: 100, height: 2, depth: 2 },         // Bottom
            { x: -55, z: 0, width: 2, height: 2, depth: 110 },        // Left
            
            // Inner oval
            { x: -25, z: -25, width: 2, height: 2, depth: 40 },       // Top-left curve
            { x: 0, z: -35, width: 50, height: 2, depth: 2 },         // Top inner
            { x: 25, z: -25, width: 2, height: 2, depth: 40 },        // Top-right curve
            { x: 35, z: 0, width: 2, height: 2, depth: 50 },          // Right inner
            { x: 25, z: 25, width: 2, height: 2, depth: 40 },         // Bottom-right curve
            { x: 0, z: 35, width: 50, height: 2, depth: 2 },          // Bottom inner
            { x: -25, z: 25, width: 2, height: 2, depth: 40 },        // Bottom-left curve
            { x: -35, z: 0, width: 2, height: 2, depth: 50 }          // Left inner
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