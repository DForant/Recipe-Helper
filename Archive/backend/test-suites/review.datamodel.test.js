// Import the syncAndReturnModel function from the Review model file
const syncAndReturnModel = require('../models/review'); // Import the database configuration
const sequelize = require('../config/db');

// Describe block defines a test suite for the Review model
describe('Review Model', () => {
  // Variable to store the Review model
  let Review;

  // beforeAll is run once before all the tests in this suite
  beforeAll(async () => {
    // Assign the Review model returned by syncAndReturnModel to the Review variable
    Review = await syncAndReturnModel();
  });

  // Test case to check if the `review_id` field is defined
  it('should have a `review_id` field', () => {
    // Expect the `review_id` field to be defined in the Review model's raw attributes
    expect(Review.rawAttributes.review_id).toBeDefined();
  });

  // Test case to check if a new review can be created with `review_text`
  it('should create a new review with `review_text`', async () => {
    // Create a new review with user_id, recipe_id, and review_text
    const review = await Review.create({
      user_id: 1,
      recipe_id: 1,
      review_text: 'Delicious recipe!'
    }); // Expect the `review_text` of the created review to match the input
    expect(review.review_text).toBe('Delicious recipe!');
  });

  // afterAll is run once after all the tests in this suite
  afterAll(async () => {
    // Sync the database and close the connection after all tests
    await sequelize.sync();
  });
});
