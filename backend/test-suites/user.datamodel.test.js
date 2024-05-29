const syncAndReturnModel = require('../models/user');
const sequelize = require('../config/db');

describe('User Model', () => {
    let User; // Create a User model instance

    beforeAll(async () => {
        User = await syncAndReturnModel() // Initialize the User Model calling the syncAndReturnModel
        await sequelize.sync({ force: true }); // sync the model with the database. This forces table creation use with caution
    });

    afterAll(async () => {
        // After all tests, we close the connection to the database
        await sequelize.close();
    });

    // Test case for user creation
    it('should create a new user', async () => {
        const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
        });

        // Assertions to check if the user has been created with the correct details
        expect(user).toHaveProperty('user_id');
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('password123');
    });
});