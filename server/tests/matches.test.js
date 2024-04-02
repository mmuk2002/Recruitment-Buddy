const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

// Connect to db before each test
beforeEach(async () => {
    await mongoose.connect("mongodb+srv://recruitmentbuddy:1357911@cluster0.solu9aj.mongodb.net/?retryWrites=true&w=majority");
});

// Close db connection after each test
afterEach(async() => {
    await mongoose.connection.close();
});

// Unit Tests
describe("GET /api/matches/:userId", () => {
    it("should get all matches for a user", async() => {
        const firebaseUid = 'nbXBu1u2uZYhQYvUIcDxIJVIZx92';
        const TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMTcyNjcsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAxNzI2NywiZXhwIjoxNzEyMDIwODY3LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PmvNQGjEB_KxuZ0L2VmQKjTCJYKJd2WYmLiMi2L_CNVk4HMmthCUeLF_-KSlrl7kMV0zKN6sf6UknRV74YQNqztnMgur10iEX3ZPTCeWHj5zLooNFg947V8qZVWr8Xx_JUaT_LAr0YKgmAX9RgGBodObu3SwkZluJ0G742tbEyIv3NK6TYJVp7cYMfRtzgYc3yYHtYDocbm-ig3q9xnjGgRxVelLyl6iHGOYVaHDXHRWB1p4Ym3cK2ooGtT3HqDN_YBDdyhnfQJDd9GL9A3S69hR9W8BFMEHPuw6TPa8iJF2ymfE179M4KpRT83-_d-mLc1e-PbV5ZMDVRG_6KMSag';

        const res = await request(app)
            .get("/api/matches/" + firebaseUid)
            .set('Authorization', 'Bearer ${TOKEN}');
        expect(res.statusCode).toBe(200);
        // expect(res.body.fullname).toBe("John Doe");
    })
})

describe("CREATE /api/matches/", () => {
    it("should update the user with userId", async() => {
        const res = await request(app).post("/api/matches/65e7eb6d796d009f0b3a02ad")
                                    .send({body: JSON.stringify({
                                        mentee: 'nbXBu1u2uZYhQYvUIcDxIJVIZx92',
                                        mentor: 'yyfufr8KOzS6Lu1k3FMoOtklr3f1',
                                        status: 'active',
                                        contactInfo: {
                                          email: 'khan@vanderbilt.edu',
                                          phone: '2245397209'
                                        }
                                      })})
                                    .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw',);
        expect(res.statusCode).toBe(200);
    })
})

describe("DELETE /api/matches/:id", () => {
    it("should delete the match with matchId", async() => {
        const matchId = '65cea42c893ed5eb3e92e9c1';


        const res = await request(app).delete("/api/matches/" + matchId)
                                    .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw');
        expect(res.statusCode).toBe(200);
    })

    it("incorrect matchId", async() => {
        const matchId = 'fdfewewhtgs';


        const res = await request(app).delete("/api/matches/" + matchId)
                                    .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw');
        expect(res.statusCode).toBe(500);
    })
})