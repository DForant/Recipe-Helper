const syncAndReturnModel = require('../models/Rating'); 
const sequelize  = require('../config/db'); 


describe('Rating Model', () => {
    let Rating;

    beforeAll(async () => {
        Rating = await syncAndReturnModel() // Initializes the Rating model by calling syncAndReplace
        await sequelize.sync(); // This will recreate the tables for testing
      });
      
      afterAll(async () => {
        await sequelize.close(); // Close the connection after tests
      });

        it('should create a rating', async () => {
        const rating = await Rating.create({
        user_id: 1, // Replace with a valid user_id from your users table
        recipe_id: 1, // Replace with a valid recipe_id from your recipes table
        rating: 4.5
        });

        expect(rating.user_id).toBe(1);
        expect(rating.recipe_id).toBe(1);
        expect(rating.rating).toBe(4.5);
    });
});

