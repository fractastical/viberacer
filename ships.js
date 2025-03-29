// Ship data for the racing game

// Make the ship data global so it can be accessed from the main script
window.GAME_SHIPS = [
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
        height: 0.5,
        // Custom render function for this ship
        renderFunction: function(THREE) {
            const group = new THREE.Group();
            
            // Create the sleek body
            const bodyGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
            const bodyMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.3,
                metalness: 0.7
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            group.add(body);
            
            // Add aerodynamic wings
            const wingGeometry = new THREE.BoxGeometry(this.width * 1.5, this.height * 0.2, this.length * 0.3);
            const wingMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.5,
                metalness: 0.8
            });
            
            const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
            leftWing.position.set(-this.width * 0.85, 0, 0);
            leftWing.castShadow = true;
            group.add(leftWing);
            
            const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
            rightWing.position.set(this.width * 0.85, 0, 0);
            rightWing.castShadow = true;
            group.add(rightWing);
            
            // Add streamlined cockpit
            const cockpitGeometry = new THREE.SphereGeometry(this.width * 0.25, 16, 12);
            const cockpitMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x88ccff,
                roughness: 0.1,
                metalness: 0.9,
                transparent: true,
                opacity: 0.7
            });
            const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
            cockpit.position.set(0, this.height * 0.5, -this.length * 0.2);
            group.add(cockpit);
            
            // Add dual engine glow
            const engineGeometry = new THREE.CylinderGeometry(this.width * 0.15, this.width * 0.25, 0.5, 16);
            const engineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
            const engine1 = new THREE.Mesh(engineGeometry, engineMaterial);
            engine1.position.set(-this.width * 0.3, 0, this.length * 0.4);
            engine1.rotation.x = Math.PI / 2;
            group.add(engine1);
            
            const engine2 = new THREE.Mesh(engineGeometry, engineMaterial);
            engine2.position.set(this.width * 0.3, 0, this.length * 0.4);
            engine2.rotation.x = Math.PI / 2;
            group.add(engine2);
            
            // Add decorative fins
            const finGeometry = new THREE.BoxGeometry(this.width * 0.1, this.height * 1.2, this.length * 0.2);
            const finMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.5,
                metalness: 0.7
            });
            const fin = new THREE.Mesh(finGeometry, finMaterial);
            fin.position.set(0, this.height * 0.6, this.length * 0.2);
            group.add(fin);
            
            return group;
        }
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
        height: 0.6,
        // Custom render function for this ship
        renderFunction: function(THREE) {
            const group = new THREE.Group();
            
            // Create the bulky body
            const bodyGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
            const bodyMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.6,
                metalness: 0.4
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            group.add(body);
            
            // Add heavier, sturdier wings
            const wingGeometry = new THREE.BoxGeometry(this.width * 1.2, this.height * 0.5, this.length * 0.5);
            const wingMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x555555,
                roughness: 0.7,
                metalness: 0.3
            });
            
            const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
            leftWing.position.set(-this.width * 0.7, 0, 0);
            leftWing.castShadow = true;
            group.add(leftWing);
            
            const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
            rightWing.position.set(this.width * 0.7, 0, 0);
            rightWing.castShadow = true;
            group.add(rightWing);
            
            // Add armored cockpit
            const cockpitGeometry = new THREE.BoxGeometry(this.width * 0.6, this.height * 0.6, this.length * 0.3);
            const cockpitMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x446688,
                roughness: 0.3,
                metalness: 0.7,
                transparent: false
            });
            const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
            cockpit.position.set(0, this.height * 0.5, -this.length * 0.2);
            group.add(cockpit);
            
            // Add reinforced bumper
            const bumperGeometry = new THREE.BoxGeometry(this.width * 0.8, this.height * 0.4, this.length * 0.1);
            const bumperMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.8,
                metalness: 0.4
            });
            const bumper = new THREE.Mesh(bumperGeometry, bumperMaterial);
            bumper.position.set(0, 0, -this.length * 0.45);
            group.add(bumper);
            
            // Add quad engine exhausts
            const engineGeometry = new THREE.CylinderGeometry(this.width * 0.12, this.width * 0.18, 0.4, 16);
            const engineMaterial = new THREE.MeshBasicMaterial({ color: 0x3366ff });
            
            const enginePositions = [
                [-this.width * 0.4, -this.height * 0.1, this.length * 0.45],
                [this.width * 0.4, -this.height * 0.1, this.length * 0.45],
                [-this.width * 0.4, this.height * 0.1, this.length * 0.45],
                [this.width * 0.4, this.height * 0.1, this.length * 0.45]
            ];
            
            enginePositions.forEach(pos => {
                const engine = new THREE.Mesh(engineGeometry, engineMaterial);
                engine.position.set(pos[0], pos[1], pos[2]);
                engine.rotation.x = Math.PI / 2;
                group.add(engine);
            });
            
            return group;
        }
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
        height: 0.4,
        // Custom render function for this ship
        renderFunction: function(THREE) {
            const group = new THREE.Group();
            
            // Create the sleek, low-profile body
            const bodyGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
            bodyGeometry.translate(0, 0, -this.length * 0.1); // Shift center of gravity forward
            const bodyMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.2,
                metalness: 0.9
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            group.add(body);
            
            // Create the pointed nose
            const noseGeometry = new THREE.ConeGeometry(this.width * 0.4, this.length * 0.4, 4);
            noseGeometry.rotateX(-Math.PI / 2);
            noseGeometry.translate(0, 0, -this.length * 0.6);
            const noseMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.3,
                metalness: 0.8
            });
            const nose = new THREE.Mesh(noseGeometry, noseMaterial);
            group.add(nose);
            
            // Add streamlined, angled wings
            const wingShape = new THREE.Shape();
            wingShape.moveTo(0, 0);
            wingShape.lineTo(this.width * 0.8, -this.length * 0.3);
            wingShape.lineTo(this.width * 0.8, this.length * 0.1);
            wingShape.lineTo(0, 0);
            
            const wingExtrudeSettings = {
                steps: 1,
                depth: this.height * 0.2,
                bevelEnabled: false
            };
            
            const wingGeometry = new THREE.ExtrudeGeometry(wingShape, wingExtrudeSettings);
            const wingMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                roughness: 0.4,
                metalness: 0.7
            });
            
            const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
            leftWing.position.set(-this.width * 0.4, 0, 0);
            leftWing.castShadow = true;
            group.add(leftWing);
            
            const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
            rightWing.rotation.y = Math.PI;
            rightWing.position.set(this.width * 0.4, 0, 0);
            rightWing.castShadow = true;
            group.add(rightWing);
            
            // Add cockpit - more aerodynamic
            const cockpitGeometry = new THREE.SphereGeometry(this.width * 0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
            cockpitGeometry.scale(1, 0.7, 1.5);
            const cockpitMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x000000,
                roughness: 0.1,
                metalness: 0.9,
                transparent: true,
                opacity: 0.8
            });
            const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
            cockpit.position.set(0, this.height * 0.45, -this.length * 0.25);
            cockpit.rotation.x = -Math.PI / 2;
            group.add(cockpit);
            
            // Add powerful engine
            const engineGeometry = new THREE.CylinderGeometry(this.width * 0.3, this.width * 0.4, 0.8, 16);
            const engineMaterial = new THREE.MeshBasicMaterial({ color: 0xff3300 });
            const engine = new THREE.Mesh(engineGeometry, engineMaterial);
            engine.position.set(0, 0, this.length * 0.4);
            engine.rotation.x = Math.PI / 2;
            group.add(engine);
            
            // Add stabilizer fin
            const finGeometry = new THREE.BoxGeometry(this.width * 0.1, this.height * 1.5, this.length * 0.3);
            const finMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.3,
                metalness: 0.8
            });
            const fin = new THREE.Mesh(finGeometry, finMaterial);
            fin.position.set(0, this.height * 0.7, this.length * 0.2);
            group.add(fin);
            
            return group;
        }
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
        height: 0.5,
        // Custom render function for this ship
        renderFunction: function(THREE) {
            const group = new THREE.Group();
            
            // Create balanced body design
            const bodyGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
            const bodyMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.4,
                metalness: 0.6
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            group.add(body);
            
            // Add balanced wings
            const wingGeometry = new THREE.BoxGeometry(this.width * 1.3, this.height * 0.3, this.length * 0.4);
            const wingMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                roughness: 0.5,
                metalness: 0.6
            });
            
            const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
            leftWing.position.set(-this.width * 0.75, 0, 0);
            leftWing.castShadow = true;
            group.add(leftWing);
            
            const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
            rightWing.position.set(this.width * 0.75, 0, 0);
            rightWing.castShadow = true;
            group.add(rightWing);
            
            // Add cockpit
            const cockpitGeometry = new THREE.CapsuleGeometry(this.width * 0.3, this.length * 0.4, 4, 8);
            cockpitGeometry.rotateZ(Math.PI / 2);
            const cockpitMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xb7f7c3,
                roughness: 0.2,
                metalness: 0.7,
                transparent: true,
                opacity: 0.8
            });
            const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
            cockpit.position.set(0, this.height * 0.4, -this.length * 0.15);
            group.add(cockpit);
            
            // Add engine glow
            const engineGeometry = new THREE.ConeGeometry(this.width * 0.2, 0.6, 16);
            const engineMaterial = new THREE.MeshBasicMaterial({ color: 0x55ff55 });
            
            const engine1 = new THREE.Mesh(engineGeometry, engineMaterial);
            engine1.position.set(-this.width * 0.25, 0, this.length * 0.45);
            engine1.rotation.x = -Math.PI / 2;
            group.add(engine1);
            
            const engine2 = new THREE.Mesh(engineGeometry, engineMaterial);
            engine2.position.set(this.width * 0.25, 0, this.length * 0.45);
            engine2.rotation.x = -Math.PI / 2;
            group.add(engine2);
            
            // Add balanced stabilizers
            const stabilizerGeometry = new THREE.BoxGeometry(this.width * 0.8, this.height * 0.15, this.length * 0.1);
            const stabilizerMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.5,
                metalness: 0.5
            });
            
            const topStabilizer = new THREE.Mesh(stabilizerGeometry, stabilizerMaterial);
            topStabilizer.position.set(0, this.height * 0.5, this.length * 0.3);
            group.add(topStabilizer);
            
            const bottomStabilizer = new THREE.Mesh(stabilizerGeometry, stabilizerMaterial);
            bottomStabilizer.position.set(0, -this.height * 0.5, this.length * 0.3);
            group.add(bottomStabilizer);
            
            return group;
        }
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
        height: 0.4,
        // Custom render function for this ship
        renderFunction: function(THREE) {
            const group = new THREE.Group();
            
            // Create futuristic asymmetric body
            const bodyGeometry = new THREE.BoxGeometry(this.width, this.height, this.length);
            bodyGeometry.translate(this.width * 0.1, 0, 0); // Slightly off-center for asymmetric design
            const bodyMaterial = new THREE.MeshStandardMaterial({ 
                color: this.color,
                roughness: 0.1,
                metalness: 0.9
            });
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
            body.castShadow = true;
            body.receiveShadow = true;
            group.add(body);
            
            // Add asymmetric wing design
            const leftWingShape = new THREE.Shape();
            leftWingShape.moveTo(0, 0);
            leftWingShape.lineTo(-this.width * 0.8, -this.length * 0.4);
            leftWingShape.lineTo(-this.width * 1.2, 0);
            leftWingShape.lineTo(-this.width * 0.4, this.length * 0.2);
            leftWingShape.lineTo(0, 0);
            
            const rightWingShape = new THREE.Shape();
            rightWingShape.moveTo(0, 0);
            rightWingShape.lineTo(this.width * 1.0, -this.length * 0.3);
            rightWingShape.lineTo(this.width * 0.7, 0);
            rightWingShape.lineTo(this.width * 0.5, this.length * 0.3);
            rightWingShape.lineTo(0, 0);
            
            const wingExtrudeSettings = {
                steps: 1,
                depth: this.height * 0.2,
                bevelEnabled: false
            };
            
            const leftWingGeometry = new THREE.ExtrudeGeometry(leftWingShape, wingExtrudeSettings);
            const rightWingGeometry = new THREE.ExtrudeGeometry(rightWingShape, wingExtrudeSettings);
            
            const wingMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x6a1b9a,
                roughness: 0.2,
                metalness: 0.8
            });
            
            const leftWing = new THREE.Mesh(leftWingGeometry, wingMaterial);
            leftWing.position.set(this.width * 0.3, 0, 0);
            leftWing.castShadow = true;
            group.add(leftWing);
            
            const rightWing = new THREE.Mesh(rightWingGeometry, wingMaterial);
            rightWing.position.set(this.width * 0.3, 0, 0);
            rightWing.castShadow = true;
            group.add(rightWing);
            
            // Add sleek enclosed cockpit
            const cockpitGeometry = new THREE.SphereGeometry(this.width * 0.25, 16, 12);
            cockpitGeometry.scale(1, 0.5, 1.5);
            const cockpitMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xee82ee,
                roughness: 0.05,
                metalness: 0.95,
                transparent: true,
                opacity: 0.6
            });
            const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
            cockpit.position.set(0, this.height * 0.5, -this.length * 0.25);
            group.add(cockpit);
            
            // Add experimental plasma engines
            const engineGeometry1 = new THREE.TorusGeometry(this.width * 0.2, this.width * 0.05, 16, 24);
            const engineGeometry2 = new THREE.TorusGeometry(this.width * 0.15, this.width * 0.03, 16, 24);
            const engineMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xcc66ff,
                transparent: true,
                opacity: 0.8
            });
            
            const engine1 = new THREE.Mesh(engineGeometry1, engineMaterial);
            engine1.position.set(-this.width * 0.3, 0, this.length * 0.4);
            engine1.rotation.y = Math.PI / 2;
            group.add(engine1);
            
            const engine2 = new THREE.Mesh(engineGeometry2, engineMaterial);
            engine2.position.set(this.width * 0.4, 0, this.length * 0.4);
            engine2.rotation.y = Math.PI / 2;
            group.add(engine2);
            
            // Add plasma glow
            const glowGeometry = new THREE.SphereGeometry(this.width * 0.1, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xcc00ff,
                transparent: true,
                opacity: 0.7
            });
            
            const glow1 = new THREE.Mesh(glowGeometry, glowMaterial);
            glow1.position.set(-this.width * 0.3, 0, this.length * 0.4);
            group.add(glow1);
            
            const glow2 = new THREE.Mesh(glowGeometry, glowMaterial);
            glow2.position.set(this.width * 0.4, 0, this.length * 0.4);
            group.add(glow2);
            
            // Add angular fins
            const finGeometry = new THREE.BoxGeometry(this.width * 0.06, this.height * 1.2, this.length * 0.3);
            finGeometry.translate(0, this.height * 0.6, 0);
            finGeometry.rotateZ(Math.PI * 0.1);
            const finMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x7b1fa2,
                roughness: 0.3,
                metalness: 0.7
            });
            const fin = new THREE.Mesh(finGeometry, finMaterial);
            fin.position.set(0, 0, this.length * 0.2);
            group.add(fin);
            
            return group;
        }
    }
];

// Also add helper functions to the global scope
window.getAllShips = function() {
    return window.GAME_SHIPS;
};

window.getShipById = function(shipId) {
    return window.GAME_SHIPS.find(ship => ship.id === shipId);
};

