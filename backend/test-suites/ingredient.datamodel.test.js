// Import necessary modules and models
const syncAndReturnModel = require('../models/ingredient');
const sequelize = require('../config/db'); 

describe('Ingredient model', () => {
  let Ingredient; // Declare a variable to hold the Ingredient model

  beforeAll(async () => {
    Ingredient = await syncAndReturnModel(); // Initialize the Ingredient model by calling the syncAndReturnModel function
    await sequelize.sync({ force: true }); // Sync the model with the database, forcing table creation (use with caution)
  });

  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
  });

  it('should create a new ingredient', async () => {
    // Define sample ingredient data
    const ingredientData = {
      name: 'Flour'
    };

    // Create an ingredient record in the database
    const ingredient = await Ingredient.create(ingredientData);

    // Assertions
    expect(ingredient).toBeInstanceOf(Ingredient); // Check if the created object is an instance of the Ingredient model
    expect(ingredient.ingredient_id).toBeGreaterThan(0); // Check if the ingredient_id is a positive value
    expect(ingredient.name).toEqual(ingredientData.name); // Check if the ingredient name matches the provided data
  });

  it('should not allow null values for the name field', async () => {
    try {
      // Attempt to create an ingredient with a null name
      await Ingredient.create({ name: null });
      // If the above line does not throw an error, the test fails
      fail('Expected an error for null name');
    } catch (error) {
      // Check if the error message indicates a violation of the allowNull constraint
      expect(error.message).toContain('notNull Violation');
    }
  })
});
