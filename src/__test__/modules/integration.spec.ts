import request from 'supertest';

import { app } from '../../app';

describe('exemple integration test ', () => {
  it('should be able to exemple', async () => {
    const response = await request(app).get('/exemple/').send();

    expect(response.status).toBe(200);
  });
});
