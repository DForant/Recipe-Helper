// Importing the syncAndReturnModel function from the recipe-category model file
const syncAndReturnModel = require('../models/recipe-category');
// Importing the sequelize instance from the database configuration file
const sequelize = require('../config/db');

// Describe block defines a test suite for the RecipeCategory model
describe('RecipeCategory model', () => {
    let RecipeCategory; // Variable to store the RecipeCategory model

    // Hook to run before all test cases
    beforeAll(async () => {
        RecipeCategory = await syncAndReturnModel(); // Initializes the RecipeCategory model by calling syncAndReturnModel
    });

    // Hook to run after all test cases
    afterAll(async () => {
        await sequelize.sync(); // Sync the model with the database after all tests
    });

    // Test case to check if the model name is correct
    it('should have the correct modelName', () => {
        expect(RecipeCategory.name).toBe('RecipeCategory'); // Check if the model name is 'RecipeCategory'
    });

    // Test case to check if the table name matches the model
    it('should match the table name', () => {
        expect(RecipeCategory.getTableName()).toBe('recipe_categories'); // Check if the table name is 'recipe_categories'
    });

    // Test case to check if the primary keys are defined correctly
    it('should define the primary keys correctly', () => {
        const primaryKeyAttributes = Object.keys(RecipeCategory.rawAttributes).filter(key => RecipeCategory.rawAttributes[key].primaryKey); // Get primary key attributes
        expect(primaryKeyAttributes).toEqual(['recipe_id', 'category_id']); // Check if the primary keys are 'recipe_id' and 'category_id'
    });

    // Test case to check if the model does not have timestamps
    it('should not have timestamps', () => {
        expect(RecipeCategory.options.timestamps).toBe(false); // Check if timestamps are disabled
    });

});
