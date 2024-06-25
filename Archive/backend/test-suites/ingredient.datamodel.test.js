// Import necessary modules and models
const syncAndReturnModel = require('../models/ingredient'); // Import the syncAndReturnModel function
const sequelize = require('../config/db'); // Import the sequelize instance

// Describe block defines a test suite for the Ingredient model
describe('Ingredient model', () => {
  let Ingredient; // Declare a variable to hold the Ingredient model

  // Hook to run before all test cases
  beforeAll(async () => {
    Ingredient = await syncAndReturnModel(); // Initialize the Ingredient model by calling the syncAndReturnModel function
  });

  // Test case to check if a new ingredient can be created successfully
  it('should create a new ingredient', async () => {
    // Define sample ingredient data
    const ingredientData = {
      name: 'Flour', // Define the name of the ingredient
    };

    // Create an ingredient record in the database
    const ingredient = await Ingredient.create(ingredientData); // Create a new ingredient

    // Assertions to verify the created ingredient has the correct properties
    expect(ingredient).toBeInstanceOf(Ingredient); // Check if the created object is an instance of the Ingredient model
    expect(ingredient.ingredient_id).toBeGreaterThan(0); // Check if the ingredient_id is a positive value
    expect(ingredient.name).toEqual(ingredientData.name); // Check if the ingredient name matches the provided data
  });

  // Test case to check that null values are not allowed for the name field
  it('should not allow null values for the name field', async () => {
    expect.assertions(1); // Specify the number of assertions expected in this test case

    try {
      // Attempt to create an ingredient with a null name
      await Ingredient.create({ name: null }); // Attempt to create with invalid data
      fail('Expected an error for null name'); // Fail the test if no error is thrown
    } catch (error) {
      // Catch the error and assert that it contains the expected message
      expect(error.message).toContain('notNull Violation'); // Check for 'notNull Violation' in the error message
    }
  });

  // Hook to run after all test cases
  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests
  });  
});
