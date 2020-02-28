const request = require('supertest');

let server;

describe('/api/members', () => {
    beforeEach(() => { server = require('../app'); });
    afterEach(() => { server.close(); });

    describe('GET /', () => {
        it('should return all members', async () => {
            const res = await request(server).get('/api/members');
            expect(res.status).toBe(200);
        });
    });
});