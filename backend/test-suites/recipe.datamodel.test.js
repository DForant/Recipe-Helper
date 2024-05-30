// Importing the necessary modules
const syncAndReturnModel = require('../models/recipe');
const sequelize = require('../config/db');

// Describing a test suite for the 'Recipe' model
describe('Recipe model', () => {
  let Recipe // Declare variable to hold the Recipe model

  // Before any tests run, connecting to the database
  beforeAll(async () => {
      Recipe = await syncAndReturnModel() // Initialize the Recipe model by calling the syncAndReturnModel function
  });

  // After all tests have finished, closing the database connection
  afterAll(async () => {
      await sequelize.close(); // close the database connection after all test have run.
  });
  // Test case: Checking if the 'Recipe' table exists in the database
  it('should have the "recipes" table', async () => {
    await expect(sequelize.queryInterface.showAllTables())
      .resolves.toContain('recipes');
  });

  // Test case: Checking if creating a new recipe works correctly
  it('should create a new recipe', async () => {
    const recipeData = {
      title: 'Test Recipe',
      description: 'This is a test description',
      instructions: 'These are test instructions'
    };
    const newRecipe = await Recipe.create(recipeData);
    // Expecting the new recipe to have an 'id' property (auto-incremented)
    expect(newRecipe).toHaveProperty('recipe_id');
    // Expecting the new recipe's title to match the provided data
    expect(newRecipe.title).toBe(recipeData.title);
  });

  // Test case: Checking if finding a recipe by its ID works correctly
  it('should find a recipe by ID', async () => {
    const recipe = await Recipe.findByPk(1);
    // Expecting the found recipe to be an instance of 'Recipe'
    expect(recipe).toBeInstanceOf(Recipe);
    // Expecting the found recipe to have a 'recipe_id' property
    expect(recipe).toHaveProperty('recipe_id', 1);
  });

  // Test case: Checking that the 'title' field cannot be null
    it('should not allow null for the "title" field', async () => {
        // Trying to create a recipe with a null 'title'
        await expect(Recipe.create({
        title: null,
        description: 'This is a test description',
        instructions: 'These are test instructions'
    })).rejects.toThrow(); // Expecting Sequelize to throw an error due to the 'allowNull: false' constraint
  });

  // Check that nulls are allowed in description and instructions
  it('should allow null for description and instructions', async () => {
    // Create an instance of YourModel with null fields
    const instance = await Recipe.create({ 
      title: 'This is a test title',  
      description: null,
      instructions: null
    });

    // Check if the instance allows null for description and instructions
    expect(instance.description).toBeNull();
    expect(instance.instructions).toBeNull();
  });
})

