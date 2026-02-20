/**
 * User Data Fetcher - JavaScript
 * Fetches user data from JSONPlaceholder API using async/await
 */

// API Configuration
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// DOM Elements
const fetchUsersBtn = document.getElementById('fetchUsersBtn');
const loadingElement = document.getElementById('loading');
const errorMessageElement = document.getElementById('errorMessage');
const usersContainer = document.getElementById('usersContainer');

// Fallback sample users in case API is unavailable
const SAMPLE_USERS = [
    {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        address: { city: 'Gwenborough' }
    },
    {
        id: 2,
        name: 'Ervin Howell',
        email: 'Shanna@melissa.tv',
        address: { city: 'Wisokyburgh' }
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        email: 'Nathan@yesenia.net',
        address: { city: 'McKenziehaven' }
    }
];

/**
 * Show loading indicator
 */
function showLoading() {
    loadingElement.classList.remove('hidden');
    errorMessageElement.classList.add('hidden');
    usersContainer.innerHTML = '';
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    loadingElement.classList.add('hidden');
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function displayError(message) {
    hideLoading();
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove('hidden');
}

/**
 * Clear error message
 */
function clearError() {
    errorMessageElement.classList.add('hidden');
    errorMessageElement.textContent = '';
}

/**
 * Create HTML for a single user card
 * @param {Object} user - User object from API
 * @returns {string} HTML string for user card
 */
function createUserCard(user) {
    return `
        <div class="user-card">
            <h3 class="user-name">${user.name}</h3>
            <ul class="user-details">
                <li>
                    <strong>Email:</strong> ${user.email}
                </li>
                <li>
                    <strong>City:</strong> ${user.address.city}
                </li>
            </ul>
        </div>
    `;
}

/**
 * Display users in the container
 * @param {Array} users - Array of user objects
 */
function displayUsers(users) {
    hideLoading();
    clearError();
    
    if (!users || users.length === 0) {
        displayError('No users found.');
        return;
    }
    
    // Generate HTML for all users
    const usersHTML = users.map(user => createUserCard(user)).join('');
    usersContainer.innerHTML = usersHTML;
}

/**
 * Fetch users from the API using async/await
 * @returns {Promise<Array>} Array of users or fallback data on error
 */
async function fetchUsers() {
    try {
        // Show loading state
        showLoading();
        
        // Fetch data from API using async/await
        const response = await fetch(API_URL);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse JSON response using async/await
        const users = await response.json();
        
        // Return the users data
        return users;
        
    } catch (error) {
        // Log error to console
        console.error('Error fetching users:', error);
        
        // Display error message to user
        displayError(`Failed to fetch users: ${error.message}. Showing sample data.`);
        
        // Return fallback sample data
        return SAMPLE_USERS;
    }
}

/**
 * Main function to handle fetch button click
 */
async function handleFetchUsers() {
    try {
        // Call async function to fetch users
        const users = await fetchUsers();
        
        // Display the users (this will handle the loading state)
        displayUsers(users);
        
    } catch (error) {
        // Catch any unexpected errors
        console.error('Unexpected error:', error);
        displayError('An unexpected error occurred. Please try again.');
    }
}

// Add event listener to the fetch button
fetchUsersBtn.addEventListener('click', handleFetchUsers);
