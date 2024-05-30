// Import the 'syncAndReturnModel' function from the 'category' model file
const syncAndReturnModel = require('../models/category');
// Import the configured sequelize instance from the 'db' configuration file
const sequelize = require('../config/db');

// Describe block defines a test suite for the Category model
describe('Category Model', () => {
  let Category; // Declare a variable to store the Category model

  // Hook to run before all test cases
  beforeAll(async () => {
    Category = await syncAndReturnModel(); // Initialize the Category model by calling the imported function
  });

  // Test case to check if a new category can be created successfully
  it('should create a new category', async () => {
    const categoryData = {
      name: 'Test Category' // Define the data for the new category
    };

    const category = await Category.create(categoryData); // Create a new category in the database

    // Assertions to verify the created category has the correct properties
    expect(category).toBeInstanceOf(Category); // Check if 'category' is an instance of Category model
    expect(category.category_id).toBeGreaterThan(0); // Check if 'category_id' is assigned and greater than 0
    expect(category.name).toEqual(categoryData.name); // Check if 'name' matches the provided data
  });

  // Test case to check that a category cannot be created with invalid data
  it('should not create a category with invalid data', async () => {
    expect.assertions(1); // Specify the number of assertions expected in this test case
  
    try {
      await Category.create({ name: null }); // Attempt to create a category with invalid data (null name)
    } catch (error) {
      // Catch the error and assert that it contains the expected message
      expect(error.message).toContain('notNull Violation'); // Check if the error message includes 'notNull Violation'
    }
  });

  // Hook to run after all test cases
  afterAll(async () => {
    await sequelize.close(); // Close the database connection
  });
  
});
