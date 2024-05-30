// Importing the necessary modules
const syncAndReturnModel = require('../models/recipe-image');
const sequelize = require('../config/db');


// Jest describe block to group related tests
describe('RecipeImage Model', () => {
  let RecipeImage

  // Before all tests, syncing the model with the database
  beforeAll(async () => {
    RecipeImage = await syncAndReturnModel() // Initialize the RecipeImage model by calling the syncAndReturnModel
  });

  // After all tests, closing the database connection
  afterAll(async () => {
    await sequelize.close(); // close the database connection after all tests
  });


  // Test to check if the model syncs with the database
  it('should sync with the database', async () => {
    await expect(sequelize.sync()).resolves.not.toThrow();
  });

  // Test to check if the 'recipe_id' field is defined correctly
  it('should have a "recipe_id" field', () => {
    expect(RecipeImage.rawAttributes.recipe_id).toBeDefined();
    expect(RecipeImage.rawAttributes.recipe_id.type.toString()).toEqual('INTEGER');
    expect(RecipeImage.rawAttributes.recipe_id.allowNull).toBeFalsy();
    expect(RecipeImage.rawAttributes.recipe_id.primaryKey).toBeTruthy();
  });

  // Test to check if the 'image_url' field is defined correctly
  it('should have an "image_url" field', () => {
    expect(RecipeImage.rawAttributes.image_url).toBeDefined();
    expect(RecipeImage.rawAttributes.image_url.type.toString()).toEqual('VARCHAR(255)');
    expect(RecipeImage.rawAttributes.image_url.defaultValue).toBeNull();
  });

  it('should not allow nulls for recipe_id', async () => {
    expect.assertions(1);
    try {
      await RecipeImage.create({ recipe_id: null });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
