
import supertest from 'supertest';
import { expect } from 'chai';

describe('User Controller', () => {
  let userId;

  it('should create a new user', async () => {
    const res = await supertest('http://localhost:8080')
      .post('/api/users')
      .send({ username: 'newuser', email: 'newuser@example.com', password: 'password123' });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('User created successfully');
    userId = res.body.user._id;
  });

  it('should get all users', async () => {
    const res = await supertest('http://localhost:8080').get('/api/users');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a user by ID', async () => {
    const res = await supertest('http://localhost:8080').get(/api/users/${userId});

    expect(res.status).to.equal(200);
    expect(res.body.username).to.equal('newuser');
  });

  it('should update a user by ID', async () => {
    const res = await supertest('http://localhost:8080')
      .put(/api/users/${userId})
      .send({ username: 'updateduser' });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('User updated successfully');
    expect(res.body.user.username).to.equal('updateduser');
  });

  it('should delete a user by ID', async () => {
    const res = await supertest('http://localhost:8080').delete(/api/users/${userId});

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('User deleted successfully');
  });
});
