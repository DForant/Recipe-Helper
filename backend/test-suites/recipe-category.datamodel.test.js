const syncAndReturnModel = require('../models/recipe-category');
const sequelize = require('../config/db');

describe('RecipeCategory model', () => {
    let RecipeCategory;

    beforeAll(async () => {
        RecipeCategory = await syncAndReturnModel();
    });

    afterAll(async () => {
        await sequelize.sync(); // close the connection after all tests
    })

    it('should have the correct modelName', () => {
    expect(RecipeCategory.name).toBe('RecipeCategory');
    });

    it('should match the table name', () => {
    expect(RecipeCategory.getTableName()).toBe('recipe_categories');
    });

    it('should define the primary keys correctly', () => {
    const primaryKeyAttributes = Object.keys(RecipeCategory.rawAttributes).filter(key => RecipeCategory.rawAttributes[key].primaryKey);
    expect(primaryKeyAttributes).toEqual(['recipe_id', 'category_id']);
    });

    it('should not have timestamps', () => {
    expect(RecipeCategory.options.timestamps).toBe(false);
    });

    // Add more tests as needed to cover the functionality you wish to test
});

