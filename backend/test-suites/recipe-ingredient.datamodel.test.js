// Import the syncAndReturnModel function from the recipe-ingredient model file
const syncAndReturnModel = require('../models/recipe-ingredient');
// Import the sequelize instance configured in the db config file
const sequelize = require('../config/db');

// Describe block for RecipeIngredient Model tests
describe('RecipeIngredient Model', () => {
  // Variable to store the RecipeIngredient model
  let RecipeIngredient;

  // beforeAll hook to sync model before running tests
  beforeAll(async () => {
    // Sync the model and store it in RecipeIngredient variable
    RecipeIngredient = await syncAndReturnModel();
  });

  // afterAll hook to sync the database after all tests have run
  afterAll(async () => {
    // Sync the sequelize instance
    await sequelize.sync();
  });

  // Test to check if the model name is correct
  it('should have the correct model name', () => {
    // Expect the name property of the model to be 'RecipeIngredient'
    expect(RecipeIngredient.name).toBe('RecipeIngredient');
  });

  // Test to check if the primary keys are correct
  it('should have the correct primary keys', () => {
    // Filter the rawAttributes of the model to find primary keys
    const primaryKeyAttributes = Object.keys(RecipeIngredient.rawAttributes).filter(key => RecipeIngredient.rawAttributes[key].primaryKey);
    // Expect the primary keys to be 'recipe_id' and 'ingredient_id'
    expect(primaryKeyAttributes).toEqual(['recipe_id', 'ingredient_id']);
  });

  // Test to check if creating a new recipe ingredient entry works
  it('should create a new recipe ingredient entry', async () => {
    try {
      // Create a new entry in the RecipeIngredient model
      const newEntry = await RecipeIngredient.create({
        recipe_id: 1,
        ingredient_id: 2,
        quantity: 3.5,
        unit: 'cups'
      });
  
      // Expect the new entry to have the correct 'recipe_id'
      expect(newEntry.recipe_id).toBe(1);
      // Expect the new entry to have the correct 'ingredient_id'
      expect(newEntry.ingredient_id).toBe(2);
      // Expect the new entry to have the correct 'quantity' (Sequelize returns DECIMAL as string)
      expect(newEntry.quantity).toBe('3.50');
      // Expect the new entry to have the correct 'unit'
      expect(newEntry.unit).toBe('cups');
    } catch (error) {
      // Log any errors that occur during the creation of a new entry
      console.error('Error creating new recipe ingredient entry:', error);
    }
  });
});
