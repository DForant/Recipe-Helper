const syncAndReturnModel  = require('../models/admin');
const sequelize = require('../config/db');

let Admin

beforeAll(async () => {
  Admin = await syncAndReturnModel()
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Admin Model', () => {
  it('should create a new admin', async () => {
    const adminData = {
      username: 'testAdmin',
      email: 'test@admin.com',
      password: 'securePassword123'
    };

    const admin = await Admin.create(adminData);
    expect(admin.username).toBe(adminData.username);
    expect(admin.email).toBe(adminData.email);
    expect(admin.password).toBe(adminData.password);
  });
});
