// Import the function to sync and return the Admin model from the admin model file
const syncAndReturnModel = require('../models/admin');

// Import the sequelize instance from the database configuration file
const sequelize = require('../config/db');

// Describe block defines a test suite for the Admin model
describe('Admin Model', () => {
  // Declare a variable to hold the Admin model, which will be assigned before all tests run
  let Admin;

  // beforeAll hook runs before all the tests in this describe block
  beforeAll(async () => {
    // Assign the Admin model by calling the syncAndReturnModel function
    Admin = await syncAndReturnModel();
  });

  // afterAll hook runs after all the tests in this describe block
  afterAll(async () => {
    // Close the sequelize connection to the database
    await sequelize.close();
  });
  
  // 'it' block defines an individual test case for creating a new admin
  it('should create a new admin', async () => {
    // Define the data for creating a new admin
    const adminData = {
      username: 'testAdmin',
      email: 'test@admin.com',
      password: 'securePassword123'
    };

    // Create a new admin record in the database using the Admin model and the test data
    const admin = await Admin.create(adminData);
    // Expect statements to check if the created admin's attributes match the test data
    expect(admin.username).toBe(adminData.username);
    expect(admin.email).toBe(adminData.email);
    expect(admin.password).toBe(adminData.password);
  });

  // 'it' block defines an individual test case to ensure 'username' is not null
  it('should not allow null for username', async () => {
    // Expect an error to be thrown if 'username' is null
    await expect(Admin.create({ admin_id: 1, email: 'test@example.com', password: 'securePassword' }))
      .rejects.toThrow();
  });

  // 'it' block defines an individual test case to ensure 'email' is not null
  it('should not allow null for email', async () => {
    // Expect an error to be thrown if 'email' is null
    await expect(Admin.create({ admin_id: 1, username: 'testUser', password: 'securePassword' }))
      .rejects.toThrow();
  });

  // 'it' block defines an individual test case to validate the email format
  it('should validate email format', async () => {
    // Expect an error to be thrown if 'email' is not in a valid format
    await expect(Admin.create({ admin_id: 1, username: 'testUser', email: 'notAnEmail', password: 'securePassword' }))
      .rejects.toThrow();
  });

  // 'it' block defines an individual test case to ensure 'password' is not null
  it('should not allow null for password', async () => {
    // Expect an error to be thrown if 'password' is null
    await expect(Admin.create({ admin_id: 1, username: 'testUser', email: 'test@example.com' }))
      .rejects.toThrow();
  });

});
