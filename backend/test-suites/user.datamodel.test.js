// Importing the function to sync and return the User model
const syncAndReturnModel = require('../models/user');
// Importing the sequelize instance from the database configuration
const sequelize = require('../config/db');

// Describing the test suite for the User model
describe('User Model', () => {
    let User; // Variable to store the User model

    // Before all tests, initialize the User model by calling the syncAndReturnModel function
    beforeAll(async () => {
        User = await syncAndReturnModel(); // Initialize the User Model
    });

    // Test case for creating a new user
    it('should create a new user', async () => {
        // Creating a new user with the provided details
        const user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });

        // Assertions to check if the user has been created with the correct details
        expect(user).toHaveProperty('user_id'); // Check if user has a user_id property
        expect(user.username).toBe('testuser'); // Check if the username is 'testuser'
        expect(user.email).toBe('test@example.com'); // Check if the email is 'test@example.com'
        expect(user.password).toBe('password123'); // Check if the password is 'password123'
    });

    // After all tests, close the connection to the database
    afterAll(async () => {
        await sequelize.close(); // Close the database connection
    });
});
