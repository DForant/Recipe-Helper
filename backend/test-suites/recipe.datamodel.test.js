// Importing the necessary modules
const syncAndReturnModel = require('../models/recipe'); // Importing the Recipe model synchronization function
const sequelize = require('../config/db'); // Importing the Sequelize database configuration

// Describing a test suite for the 'Recipe' model
describe('Recipe model', () => {
  let Recipe; // Declare variable to hold the Recipe model

  // Before any tests run, connecting to the database
  beforeAll(async () => {
    Recipe = await syncAndReturnModel(); // Initialize the Recipe model by calling the syncAndReturnModel function
  });

  // Test case: Checking if the 'Recipe' table exists in the database
  it('should have the "recipes" table', async () => {
    await expect(sequelize.queryInterface.showAllTables())
      .resolves.toContain('recipes'); // Expect the 'recipes' table to exist in the database
  });

  // Test case: Checking if creating a new recipe works correctly
  it('should create a new recipe', async () => {
    const recipeData = {
      title: 'Test Recipe',
      description: 'This is a test description',
      instructions: 'These are test instructions'
    }; // Define data for a new recipe
    const newRecipe = await Recipe.create(recipeData); // Create a new recipe in the database
    expect(newRecipe).toHaveProperty('recipe_id'); // Expect the new recipe to have an 'id' property (auto-incremented)
    expect(newRecipe.title).toBe(recipeData.title); // Expect the new recipe's title to match the provided data
  });

  // Test case: Checking if finding a recipe by its ID works correctly
  it('should find a recipe by ID', async () => {
    const recipe = await Recipe.findByPk(1); // Find a recipe by its primary key (ID)
    expect(recipe).toBeInstanceOf(Recipe); // Expect the found recipe to be an instance of 'Recipe'
    expect(recipe).toHaveProperty('recipe_id', 1); // Expect the found recipe to have a 'recipe_id' property
  });

  // Test case: Checking that the 'title' field cannot be null
  it('should not allow null for the "title" field', async () => {
    // Trying to create a recipe with a null 'title'
    await expect(Recipe.create({
      title: null,
      description: 'This is a test description',
      instructions: 'These are test instructions'
    })).rejects.toThrow(); // Expect Sequelize to throw an error due to the 'allowNull: false' constraint
  });

  // Check that nulls are allowed in description and instructions
  it('should allow null for description and instructions', async () => {
    const instance = await Recipe.create({ 
      title: 'This is a test title',  
      description: null,
      instructions: null
    }); // Create an instance of Recipe with null fields for description and instructions
    expect(instance.description).toBeNull(); // Check if the instance allows null for description
    expect(instance.instructions).toBeNull(); // Check if the instance allows null for instructions
  });

  // After all tests have finished, closing the database connection
  afterAll(async () => {
    await sequelize.close(); // Close the database connection after all tests have run.
  });
});
