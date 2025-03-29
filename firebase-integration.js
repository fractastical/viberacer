// Firebase Integration for Racing Game
// This script handles user authentication, score saving, and leaderboard functionality

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCvgdn8c6D8RusKRr4vHAzFj1x4FNxrXVE",
  authDomain: "infinite-games-9c69e.firebaseapp.com",
  projectId: "infinite-games-9c69e",
  storageBucket: "infinite-games-9c69e.appspot.com",
  messagingSenderId: "602022483888",
  appId: "1:602022483888:web:f967a6c1cb236ae66ba875",
  measurementId: "G-9LE6E1BKZ7"
};

// Game-specific constants
const GAME_ID = "vibe-racing";

// Firebase state variables
let userId = null;
let userNickname = "Guest";
let isLoggedIn = false;

// DOM Elements
let loginContainer, userInfoDisplay, leaderboardContainer;

// Initialize Firebase when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Set up DOM references
  setupDOMReferences();

  // Check authentication state
  checkAuthState();

  // Set up event listeners for auth-related buttons
  setupAuthListeners();

  // Load the leaderboard
  loadLeaderboard();
  loadTrackLeaderboards();
});

function setupDOMReferences() {
  // Create login container if it doesn't exist
  if (!document.getElementById('loginContainer')) {
    createAuthUI();
  }

  loginContainer = document.getElementById('loginContainer');
  userInfoDisplay = document.getElementById('userInfo');
  leaderboardContainer = document.getElementById('leaderboard-container');
}

function createAuthUI() {
  // Create login container
  const loginContainer = document.createElement('div');
  loginContainer.id = 'loginContainer';
  loginContainer.classList.add('top-right');
  loginContainer.innerHTML = `
    <button id="loginButton">Login / Sign Up</button>
  `;

  // Create user info display
  const userInfo = document.createElement('div');
  userInfo.id = 'userInfo';
  userInfo.classList.add('top-right', 'hidden');
  userInfo.innerHTML = `
    <span id="userNickname"></span>
    <button id="logoutButton">Logout</button>
  `;

  // Create login modal
  const loginModal = document.createElement('div');
  loginModal.id = 'loginModal';
  loginModal.classList.add('modal');
  loginModal.innerHTML = `
    <div class="modal-content">
      <h2>Login</h2>
      <form id="loginForm">
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
      <div id="loginError" class="error-message"></div>

      <h2>Sign Up</h2>
      <form id="signupForm">
        <input type="text" id="signupNickname" placeholder="Nickname" required>
        <input type="email" id="signupEmail" placeholder="Email" required>
        <input type="password" id="signupPassword" placeholder="Password" required>
        <button type="submit">Sign Up</button>
      </form>
      <div id="signupError" class="error-message"></div>
      <button id="closeLoginModal">Close</button>
    </div>
  `;

  // Create leaderboard container
  const leaderboardContainer = document.createElement('div');
  leaderboardContainer.id = 'leaderboard-container';
  leaderboardContainer.innerHTML = `
    <div id="leaderboard">
      <h2>Leaderboard</h2>
      <ol id="leaderboard-list"></ol>
    </div>
  `;

  const trackLeaderboards = document.createElement('div');
  trackLeaderboards.id = 'track-leaderboards';
  leaderboardContainer.appendChild(trackLeaderboards);

  // Add the elements to the body
  document.body.appendChild(loginContainer);
  document.body.appendChild(userInfo);
  document.body.appendChild(loginModal);
  document.body.appendChild(leaderboardContainer);

  // Add CSS
  addStyles();
}

function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .top-right {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 100;
    }
    
    .hidden {
      display: none;
    }
    
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
    
    .modal-content {
      background-color: #f4f4f4;
      margin: 15% auto;
      padding: 20px;
      border-radius: 5px;
      width: 300px;
      max-width: 80%;
    }
    
    .error-message {
      color: red;
      margin: 10px 0;
    }
    
    #leaderboard-container {
      position: fixed;
      right: 10px;
      top: 50px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      max-width: 250px;
      max-height: 400px;
      overflow-y: auto;
    }
    
    input {
      display: block;
      margin: 10px 0;
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
    }
    
    button {
      padding: 8px 12px;
      margin: 5px 0;
      cursor: pointer;
    }

    #race-results-modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
    }
    
    .race-results-content {
      background-color: #f4f4f4;
      color: #333;
      margin: 10% auto;
      padding: 20px;
      border-radius: 5px;
      width: 400px;
      max-width: 90%;
    }
    
    .best-time {
      color: #4CAF50;
      font-weight: bold;
    }
    
    .track-leaderboard {
      margin-top: 15px;
      border-top: 1px solid #333;
      padding-top: 10px;
    }
    
    .track-leaderboard h3 {
      margin-top: 0;
    }
  `;
  document.head.appendChild(style);
}

function setupAuthListeners() {
  // Login button click
  document.getElementById('loginButton')?.addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'block';
  });

  // Close modal
  document.getElementById('closeLoginModal')?.addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'none';
  });

  // Login form submit
  document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginUser(email, password);
  });

  // Signup form submit
  document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = document.getElementById('signupNickname').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    signupUser(nickname, email, password);
  });

  // Logout button click
  document.getElementById('logoutButton')?.addEventListener('click', () => {
    logoutUser();
  });
}

function checkAuthState() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userId = user.uid;
      loadUserData(userId);
      isLoggedIn = true;

      // Hide login container and show user info
      if (loginContainer) loginContainer.classList.add('hidden');
      if (userInfoDisplay) userInfoDisplay.classList.remove('hidden');
    } else {
      userId = null;
      userNickname = "Guest";
      isLoggedIn = false;

      // Show login container and hide user info
      if (loginContainer) loginContainer.classList.remove('hidden');
      if (userInfoDisplay) userInfoDisplay.classList.add('hidden');
    }
  });
}

async function loginUser(email, password) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginForm').reset();
  } catch (error) {
    document.getElementById('loginError').textContent = error.message;
  }
}

async function signupUser(nickname, email, password) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Save initial user data
    await saveInitialUserData(user.uid, email, nickname);

    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupForm').reset();
  } catch (error) {
    document.getElementById('signupError').textContent = error.message;
  }
}

async function loadTrackLeaderboards(trackIds = ['circuit-alpha', 'grand-circuit']) {
  const container = document.getElementById('track-leaderboards');
  if (!container) return;

  container.innerHTML = '<h3>Track Leaderboards</h3>';

  for (const trackId of trackIds) {
    try {
      // Use scores collection instead of race_results
      const snapshot = await firebase.firestore()
        .collection("scores")
        .where("gameId", "==", GAME_ID)
        .where("trackId", "==", trackId)
        .orderBy("bestLapTime", "asc")
        .limit(5)
        .get();

      const titleMap = {
        'circuit-alpha': "🏁 Circuit Alpha",
        'grand-circuit': "🏆 Grand Circuit"
      };

      const title = titleMap[trackId] || trackId;
      const ul = document.createElement('ul');
      ul.innerHTML = `<strong>${title}</strong>`;

      if (snapshot.empty) {
        const li = document.createElement('li');
        li.textContent = "No times recorded yet";
        ul.appendChild(li);
      } else {
        snapshot.forEach(doc => {
          const data = doc.data();
          const li = document.createElement('li');
          li.textContent = `${data.nickname || 'Anonymous'}: ${formatTime(data.bestLapTime)}`;

          if (data.userId === userId) {
            li.style.fontWeight = 'bold';
            li.style.color = '#FFD700'; // Gold color
          }

          ul.appendChild(li);
        });
      }

      container.appendChild(ul);
    } catch (err) {
      console.warn(`Error loading leaderboard for track ${trackId}:`, err);
      const ul = document.createElement('ul');
      const titleMap = {
        'circuit-alpha': "🏁 Circuit Alpha",
        'grand-circuit': "🏆 Grand Circuit"
      };
      ul.innerHTML = `<strong>${titleMap[trackId] || trackId}</strong>`;
      const li = document.createElement('li');
      li.textContent = "Unable to load leaderboard";
      ul.appendChild(li);
      container.appendChild(ul);
    }
  }
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

async function logoutUser() {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

async function saveInitialUserData(userId, email, nickname) {
  const initialData = {
    email: email,
    nickname: nickname,
    createdAt: new Date(),
    games: {
      [GAME_ID]: {
        bestLapTimes: {},
        totalRaces: 0,
        lastPlayed: new Date()
      }
    }
  };

  await firebase.firestore().collection('users').doc(userId).set(initialData);
}

async function loadUserData(userId) {
  try {
    const userDoc = await firebase.firestore().collection('users').doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      userNickname = userData.nickname || "Racer";

      // Update the nickname display
      const nicknameElement = document.getElementById('userNickname');
      if (nicknameElement) nicknameElement.textContent = userNickname;

      return userData;
    } else {
      // No user data found, create initial data
      const user = firebase.auth().currentUser;
      if (user) {
        await saveInitialUserData(userId, user.email, "Racer");
        return {
          nickname: "Racer",
          games: {
            [GAME_ID]: {
              bestLapTimes: {},
              totalRaces: 0,
              lastPlayed: new Date()
            }
          }
        };
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
}

// Save race results to Firebase
async function saveRaceResults(trackId, lapTimes, shipId) {
  const bestLapTime = Math.min(...lapTimes);
  const totalTime = lapTimes.reduce((sum, time) => sum + time, 0);

  // For guests, just show results but don't save
  if (!isLoggedIn || !userId) {
    showRaceResultsModal(trackId, lapTimes, bestLapTime, false);
    return false;
  }

  try {
    const timestamp = new Date();

    // Get user data
    const userDoc = await firebase.firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();

    // Check if this is a new best time
    const currentBestTime = userData.games?.[GAME_ID]?.bestLapTimes?.[trackId] || Number.MAX_VALUE;
    const isNewPersonalBest = bestLapTime < currentBestTime;

    // Prepare race data
    const raceData = {
      userId: userId,
      nickname: userNickname,
      gameId: GAME_ID,
      trackId: trackId,
      shipId: shipId,
      lapTimes: lapTimes,
      score: bestLapTime, // Using score field to match existing collection
      bestLapTime: bestLapTime,
      totalTime: totalTime,
      timestamp: timestamp
    };

    // Add to scores collection instead of race_results
    await firebase.firestore().collection('scores').add(raceData);

    // Add to game-specific leaderboard as well
    await firebase.firestore().collection('leaderboards').doc(GAME_ID).collection('scores').add({
      userId: userId,
      nickname: userNickname,
      score: bestLapTime,
      trackId: trackId,
      timestamp: timestamp
    });

    // Update user document with new best time if applicable
    if (isNewPersonalBest) {
      await firebase.firestore().collection('users').doc(userId).update({
        [`games.${GAME_ID}.bestLapTimes.${trackId}`]: bestLapTime,
        [`games.${GAME_ID}.totalRaces`]: firebase.firestore.FieldValue.increment(1),
        [`games.${GAME_ID}.lastPlayed`]: timestamp
      });
    } else {
      await firebase.firestore().collection('users').doc(userId).update({
        [`games.${GAME_ID}.totalRaces`]: firebase.firestore.FieldValue.increment(1),
        [`games.${GAME_ID}.lastPlayed`]: timestamp
      });
    }

    // Show race results
    showRaceResultsModal(trackId, lapTimes, bestLapTime, isNewPersonalBest);

    // Refresh leaderboards
    loadTrackLeaderboards();

    console.log('Race results saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving race results:', error);
    return false;
  }
}

// Load leaderboard data
async function loadLeaderboard(limit = 10) {
  try {
    const leaderboardSnapshot = await firebase.firestore()
      .collection('scores')
      .where("gameId", "==", GAME_ID)
      .orderBy('bestLapTime', 'asc')
      .limit(limit)
      .get();

    const leaderboardData = [];
    leaderboardSnapshot.forEach(doc => {
      const data = doc.data();
      leaderboardData.push({
        nickname: data.nickname || 'Anonymous',
        trackId: data.trackId,
        bestLapTime: data.bestLapTime,
        isCurrentUser: data.userId === userId
      });
    });

    displayLeaderboard(leaderboardData);
    return leaderboardData;
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return [];
  }
}

// Display leaderboard in the UI
function displayLeaderboard(scores) {
  const leaderboardList = document.getElementById('leaderboard-list');

  if (!leaderboardList) return;

  leaderboardList.innerHTML = '';

  if (scores.length === 0) {
    leaderboardList.innerHTML = '<li>No race times recorded yet!</li>';
    return;
  }

  scores.forEach((entry) => {
    const scoreItem = document.createElement('li');
    scoreItem.textContent = `${entry.nickname} - ${entry.trackId}: ${formatTime(entry.bestLapTime)}`;

    if (entry.isCurrentUser) {
      scoreItem.style.fontWeight = 'bold';
      scoreItem.style.color = '#FFD700'; // Gold color for user's time
    }

    leaderboardList.appendChild(scoreItem);
  });
}

// Show race results modal
async function showRaceResultsModal(trackId, lapTimes, bestLapTime, isNewPersonalBest) {
  // Create the race results modal if it doesn't exist
  if (!document.getElementById('race-results-modal')) {
    createRaceResultsModal();
  }

  // Get track name
  const trackNames = {
    'circuit-alpha': 'Circuit Alpha',
    'grand-circuit': 'Grand Circuit'
  };

  const trackName = trackNames[trackId] || trackId;

  // Update modal title
  document.getElementById('race-track-name').textContent = trackName;

  // Update lap times
  const lapTimesList = document.getElementById('lap-times-list');
  lapTimesList.innerHTML = '';

  lapTimes.forEach((time, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${formatTime(time)}`;

    if (time === bestLapTime) {
      li.classList.add('best-time');
    }

    lapTimesList.appendChild(li);
  });

  // Update best time display
  const bestTimeElement = document.getElementById('best-lap-time');
  bestTimeElement.textContent = formatTime(bestLapTime);

  // Show new best message if applicable
  const newBestMessage = document.getElementById('new-personal-best');
  if (isNewPersonalBest) {
    newBestMessage.textContent = 'New Personal Best!';
    newBestMessage.style.display = 'block';
  } else {
    newBestMessage.style.display = 'none';
  }

  // Load track leaderboard
  const leaderboardElement = document.getElementById('track-leaderboard-list');
  leaderboardElement.innerHTML = 'Loading...';

  try {
    // Use scores collection instead of race_results
    const snapshot = await firebase.firestore()
      .collection('scores')
      .where("gameId", "==", GAME_ID)
      .where('trackId', '==', trackId)
      .orderBy('bestLapTime', 'asc')
      .limit(5)
      .get();

    leaderboardElement.innerHTML = '';

    if (snapshot.empty) {
      leaderboardElement.innerHTML = '<li>No times recorded yet</li>';
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.nickname || 'Anonymous'}: ${formatTime(data.bestLapTime)}`;

        if (data.userId === userId) {
          li.style.fontWeight = 'bold';
          li.style.color = '#FFD700'; // Gold color
        }

        leaderboardElement.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error loading track leaderboard:', error);
    leaderboardElement.innerHTML = '<li>Error loading leaderboard</li>';
  }

  // Show the modal
  document.getElementById('race-results-modal').style.display = 'block';
}

function closeRaceResultsModal() {
  const modal = document.getElementById('race-results-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function createRaceResultsModal() {
  const modal = document.createElement('div');
  modal.id = 'race-results-modal';

  modal.innerHTML = `
    <div class="race-results-content">
      <span style="position: absolute; top: 10px; right: 15px; font-size: 20px; cursor: pointer;" onclick="window.RaceFirebase.closeRaceResultsModal()">&times;</span>
      <h2>Race Complete: <span id="race-track-name"></span></h2>
      
      <div id="new-personal-best" style="color: gold; font-weight: bold; margin: 10px 0; display: none;"></div>
      
      <div>
        <h3>Your Lap Times:</h3>
        <ol id="lap-times-list"></ol>
        <p>Best Lap: <span id="best-lap-time" class="best-time"></span></p>
      </div>
      
      <div class="track-leaderboard">
        <h3>Track Leaderboard</h3>
        <ol id="track-leaderboard-list"></ol>
      </div>
      
      <div style="margin-top: 20px; text-align: center;">
        <button onclick="resetGame()">Race Again</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

// Export functions to make them available to the main game
window.RaceFirebase = {
  saveRaceResults,
  loadLeaderboard,
  loadTrackLeaderboards,
  showRaceResultsModal,
  closeRaceResultsModal,
  formatTime,
  isLoggedIn: () => isLoggedIn,
  getUserId: () => userId,
  getUserNickname: () => userNickname
};