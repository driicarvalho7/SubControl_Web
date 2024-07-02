import supertest from 'supertest';
import { expect } from 'chai';

describe('Login Controller', () => {
  it('should login a user with valid credentials', async () => {
    const res = await supertest('http://localhost:8080')
      .post('/api/login')
      .send({ email: 'a@a.com', password: '123' });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Login successful');
  });

  it('should not login a user with invalid credentials', async () => {
    const res = await supertest('http://localhost:8080')
      .post('/api/login')
      .send({ email: 'a@a.com', password: 'wrong_password' });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid email or password');
  });
});
