import { app, sequelize } from '@infra/api/express';
import request from 'supertest';

describe('e2e: fund customer by id', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should find a customer by id end response type is json', async () => {
    const customer = {
      name: 'john',
      address: {
        street: 'street',
        number: 123,
        zipCode: 12345,
        city: 'city',
        country: 'country'
      }
    }
    const { body: { id } } = await request(app)
      .post('/customers')
      .set('Accept', 'application/json')
      .send(customer);

    const result = await request(app)
      .get(`/customers/${id}`);

    expect(result.statusCode).toBe(200);
    expect(result.body.id).toStrictEqual(id);
    expect(result.body.name).toStrictEqual(customer.name);
    expect(result.body.address).toStrictEqual(customer.address);
  });

  it('should find a customer by id end response type is xml', async () => {
    const customer = {
      name: 'john',
      address: {
        street: 'street',
        number: 123,
        zipCode: 12345,
        city: 'city',
        country: 'country'
      }
    }
    const { body: { id } } = await request(app)
      .post('/customers')
      .send(customer);

    const result = await request(app)
      .get(`/customers/${id}`)
      .set('Accept', 'application/xml')
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(result.text).toContain('<customer');
    expect(result.text).toContain('<name>');
    expect(result.text).toContain('address');
    expect(result.text).toContain('<street>street</street>');
    expect(result.text).toContain('<number>123</number>');
    expect(result.text).toContain('<zipCode>12345</zipCode>');
    expect(result.text).toContain('<city>city</city>');
    expect(result.text).toContain('<country>country</country>');
  });

  it('should return status code 404 when a customer not found', async () => {
    const result = await request(app)
      .get(`/customers/anyId`);

    expect(result.statusCode).toBe(404);
  });
})