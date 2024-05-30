const UserRecipe = require('../models/user-recipe'); 
const sequelize = require('../config/db');

describe('UserRecipe Model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // This will recreate the tables
    });

    afterAll(async () => {
        await sequelize.close(); // Close the connection after the tests
      });          
    
    it('should create a new UserRecipe entry', async () => {
        const userRecipe = await UserRecipe.create({ user_id: 1, recipe_id: 1 });
        expect(userRecipe.user_id).toBe(1);
        expect(userRecipe.recipe_id).toBe(1);
    });

    it('should find a UserRecipe entry by user_id', async () => {
        await UserRecipe.create({ user_id: 2, recipe_id: 2 });
        const foundUserRecipe = await UserRecipe.findOne({ where: { user_id: 2 } });
        expect(foundUserRecipe.recipe_id).toBe(2);
    });

    it('should not allow duplicate user_id and recipe_id combination', async () => {
        expect.assertions(1);
        try {
        await UserRecipe.create({ user_id: 1, recipe_id: 1 });
        } catch (e) {
        expect(e).toBeTruthy();
        }
    });

    it('should delete a UserRecipe entry', async () => {
        const userRecipe = await UserRecipe.create({ user_id: 3, recipe_id: 3 });
        await userRecipe.destroy();
        const foundUserRecipe = await UserRecipe.findOne({ where: { user_id: 3 } });
        expect(foundUserRecipe).toBeNull();
    });
});