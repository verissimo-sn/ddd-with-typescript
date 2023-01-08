import { app, sequelize } from '@infra/api/express';
import request from 'supertest';

describe('e2e: Create a customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer correctly', async () => {
    const sendData = {
      name: 'john',
      address: {
        street: 'street',
        number: 123,
        zipCode: 12345,
        city: 'city',
        country: 'country'
      }
    }

    const result = await request(app)
      .post('/customers')
      .send(sendData);

    expect(result.statusCode).toBe(201);
    expect(result.body.id).toBeDefined();
  });

  it('should not create a customer and return status code 500 when any params not provided', async () => {
    const sendData = {
      name: 'john',
      address: {
        street: 'street',
        number: 123,
        zipCode: 12345,
        city: 'city',
      }
    }

    const result = await request(app)
      .post('/customers')
      .send(sendData);

    expect(result.statusCode).toBe(500);
  });
})