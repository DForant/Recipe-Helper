// Importing the necessary modules
const syncAndReturnModel = require('../models/recipe-image'); // Importing the syncAndReturnModel function from the recipe-image model file
const sequelize = require('../config/db'); // Importing the sequelize instance configured for the database

// Jest describe block to group related tests for the RecipeImage Model
describe('RecipeImage Model', () => {
  let RecipeImage; // Variable to store the RecipeImage model

  // Before all tests, syncing the model with the database
  beforeAll(async () => {
    RecipeImage = await syncAndReturnModel(); // Initialize the RecipeImage model by calling the syncAndReturnModel function
  });

  // Test to check if the model syncs with the database
  it('should sync with the database', async () => {
    await expect(sequelize.sync()).resolves.not.toThrow(); // Expect the sequelize.sync() to not throw any errors
  });

  // Test to check if the 'recipe_id' field is defined correctly
  it('should have a "recipe_id" field', () => {
    expect(RecipeImage.rawAttributes.recipe_id).toBeDefined(); // Check if 'recipe_id' attribute is defined in the model
    expect(RecipeImage.rawAttributes.recipe_id.type.toString()).toEqual('INTEGER'); // Check if 'recipe_id' type is INTEGER
    expect(RecipeImage.rawAttributes.recipe_id.allowNull).toBeFalsy(); // Check if 'recipe_id' allowNull property is false
    expect(RecipeImage.rawAttributes.recipe_id.primaryKey).toBeTruthy(); // Check if 'recipe_id' is set as a primaryKey
  });

  // Test to check if the 'image_url' field is defined correctly
  it('should have an "image_url" field', () => {
    expect(RecipeImage.rawAttributes.image_url).toBeDefined(); // Check if 'image_url' attribute is defined in the model
    expect(RecipeImage.rawAttributes.image_url.type.toString()).toEqual('VARCHAR(255)'); // Check if 'image_url' type is VARCHAR(255)
    expect(RecipeImage.rawAttributes.image_url.defaultValue).toBeNull(); // Check if 'image_url' has a default value of null
  });

  // Test to ensure 'recipe_id' cannot be null
  it('should not allow nulls for recipe_id', async () => {
    expect.assertions(1); // Declare that one assertion is expected to be called
    try {
      await RecipeImage.create({ recipe_id: null }); // Attempt to create a RecipeImage with null 'recipe_id'
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError'); // Expect to catch a SequelizeValidationError
    }
  });

  // After all tests, closing the database connection
  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
  });
});
