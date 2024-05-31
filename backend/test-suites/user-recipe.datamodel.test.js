// Importing the UserRecipe model
const UserRecipe = require('../models/user-recipe');
// Importing the database configuration
const sequelize = require('../config/db');

// Describing the tests for the UserRecipe Model
describe('UserRecipe Model', () => {
    // Before all tests, sync the database which will recreate the tables
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // This will recreate the tables
    });

    // Test for creating a new UserRecipe entry
    it('should create a new UserRecipe entry', async () => {
        const userRecipe = await UserRecipe.create({ user_id: 1, recipe_id: 1 }); // Creating a new entry
        expect(userRecipe.user_id).toBe(1); // Expecting the user_id to be 1
        expect(userRecipe.recipe_id).toBe(1); // Expecting the recipe_id to be 1
    });

    // Test for finding a UserRecipe entry by user_id
    it('should find a UserRecipe entry by user_id', async () => {
        await UserRecipe.create({ user_id: 2, recipe_id: 2 }); // Creating an entry to find later
        const foundUserRecipe = await UserRecipe.findOne({ where: { user_id: 2 } }); // Finding the entry
        expect(foundUserRecipe.recipe_id).toBe(2); // Expecting the recipe_id to be 2
    });

    // Test to ensure duplicate user_id and recipe_id combinations are not allowed
    it('should not allow duplicate user_id and recipe_id combination', async () => {
        expect.assertions(1); // Expecting one assertion to be called
        try {
            await UserRecipe.create({ user_id: 1, recipe_id: 1 }); // Attempting to create a duplicate entry
        } catch (e) {
            expect(e).toBeTruthy(); // Expecting an error to be thrown
        }
    });

    // Test for deleting a UserRecipe entry
    it('should delete a UserRecipe entry', async () => {
        const userRecipe = await UserRecipe.create({ user_id: 3, recipe_id: 3 }); // Creating an entry to delete later
        await userRecipe.destroy(); // Deleting the entry
        const foundUserRecipe = await UserRecipe.findOne({ where: { user_id: 3 } }); // Attempting to find the deleted entry
        expect(foundUserRecipe).toBeNull(); // Expecting the result to be null
    });

    // After all tests, close the database connection
    afterAll(async () => {
        await sequelize.close(); // Close the connection after the tests
    });
});
