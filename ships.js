// Game ships data file

// Ship collection for the racing game
const GAME_SHIPS = [
    {
        id: "speeder",
        name: "Speeder", 
        description: "Fast and agile, but requires skill to handle at top speeds.",
        maxSpeed: 0.5, 
        acceleration: 0.02, 
        rotationSpeed: 0.06, 
        color: 0xff5722, 
        width: 2, 
        length: 3, 
        height: 0.5
    },
    {
        id: "tanker",
        name: "Tanker", 
        description: "Sturdy and stable. Slower but easier to control.",
        maxSpeed: 0.4, 
        acceleration: 0.015, 
        rotationSpeed: 0.04, 
        color: 0x2196f3, 
        width: 2.5, 
        length: 3.5, 
        height: 0.6
    },
    {
        id: "racer",
        name: "Racer", 
        description: "Built for pure speed. High top speed but more challenging to control.",
        maxSpeed: 0.6, 
        acceleration: 0.025, 
        rotationSpeed: 0.07, 
        color: 0xf44336, 
        width: 1.8, 
        length: 2.8, 
        height: 0.4
    },
    {
        id: "balancer",
        name: "Balancer", 
        description: "The perfect balance of speed and control. A great all-rounder.",
        maxSpeed: 0.45, 
        acceleration: 0.018, 
        rotationSpeed: 0.055, 
        color: 0x4CAF50, 
        width: 2.2, 
        length: 3.0, 
        height: 0.5
    },
    {
        id: "phantom",
        name: "Phantom", 
        description: "Experimental ship with unique handling. For experienced racers only.",
        maxSpeed: 0.65, 
        acceleration: 0.03, 
        rotationSpeed: 0.08, 
        color: 0x9C27B0, 
        width: 1.6, 
        length: 3.2, 
        height: 0.4
    }
];

// Function to get ship by ID
function getShipById(shipId) {
    return GAME_SHIPS.find(ship => ship.id === shipId);
}

// Function to get all available ships
function getAllShips() {
    return GAME_SHIPS;
}

// Export the ship functions
export { getShipById, getAllShips };