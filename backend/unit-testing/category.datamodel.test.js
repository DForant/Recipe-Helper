const syncAndReturnModel = require('../path/to/your/model/file'); // Update the path to where your model file is located;

describe('Category Model', () => {
  let Category;

  beforeAll(async () => {
    Category = await syncAndReturnModel();
  });

  test('should sync with the database', async () => {
    await expect(Category.sync()).resolves.not.toThrow();
  });

  test('should have the correct model name', () => {
    expect(Category.modelName).toBe('Category');
  });

  test('should have the correct table name', () => {
    expect(Category.getTableName()).toBe('categories');
  });

  test('should define the primary key', () => {
    expect(Category.primaryKeyAttribute).toBe('category_id');
  });

  test('should define the correct attributes', () => {
    const attributes = Category.rawAttributes;
    expect(attributes.category_id).toBeDefined();
    expect(attributes.name).toBeDefined();
    expect(attributes.category_id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(attributes.name.type).toBeInstanceOf(DataTypes.STRING);
  });
});
