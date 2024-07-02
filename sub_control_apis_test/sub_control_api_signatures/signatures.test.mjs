import supertest from 'supertest';
import { expect } from 'chai';

describe('Signature Controller', () => {
  let signatureId;

  it('should create a new signature', async () => {
    const res = await supertest('http://localhost:8082')
      .post('/api/signatures')
      .send({
        userId: 'someuserid',
        name: 'New Signature',
        logoUrl: 'http://example.com/logo.png',
        value: 200,
        currency: 'USD',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        period: 'yearly',
      });

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal('Signature created successfully');
    signatureId = res.body.signature._id;
  });

  it('should get all signatures', async () => {
    const res = await supertest('http://localhost:8082').get('/api/signatures');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a signature by ID', async () => {
    const res = await supertest('http://localhost:8082').get(/api/signatures/${signatureId});

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('New Signature');
  });

  it('should update a signature by ID', async () => {
    const res = await supertest('http://localhost:8082')
      .put(/api/signatures/${signatureId})
      .send({ name: 'Updated Signature' });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Signature updated successfully');
    expect(res.body.signature.name).to.equal('Updated Signature');
  });

  it('should delete a signature by ID', async () => {
    const res = await supertest('http://localhost:8082').delete(/api/signatures/${signatureId});

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Signature deleted successfully');
  });
});
