// Importing the syncAndReturnModel function from the Rating model file
const syncAndReturnModel = require('../models/Rating');
// Importing the sequelize instance from the database configuration
const sequelize  = require('../config/db');

// Describe block defines a test suite for the Rating model
describe('Rating Model', () => {
    let Rating; // Variable to store the Rating model

    // Hook to run before all test cases
    beforeAll(async () => {
        Rating = await syncAndReturnModel(); // Initializes the Rating model by calling syncAndReturnModel
    });

    // Hook to run after all test cases
    afterAll(async () => {
        await sequelize.close(); // Close the database connection after tests
    });

    // Test case to check if a new rating can be created successfully
    it('should create a rating', async () => {
        // Define the data for a new rating
        const ratingData = {
            user_id: 1, // Replace with a valid user_id from your users table
            recipe_id: 1, // Replace with a valid recipe_id from your recipes table
            rating: 4.5 // Set the rating value
        };

        // Create a new rating record in the database
        const rating = await Rating.create(ratingData);

        // Assertions to verify the created rating has the correct properties
        expect(rating.user_id).toBe(1); // Check if the user_id matches the provided data
        expect(rating.recipe_id).toBe(1); // Check if the recipe_id matches the provided data
        expect(rating.rating).toBe(4.5); // Check if the rating value matches the provided data
    });
});
