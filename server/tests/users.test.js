const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

const TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMTcyNjcsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAxNzI2NywiZXhwIjoxNzEyMDIwODY3LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PmvNQGjEB_KxuZ0L2VmQKjTCJYKJd2WYmLiMi2L_CNVk4HMmthCUeLF_-KSlrl7kMV0zKN6sf6UknRV74YQNqztnMgur10iEX3ZPTCeWHj5zLooNFg947V8qZVWr8Xx_JUaT_LAr0YKgmAX9RgGBodObu3SwkZluJ0G742tbEyIv3NK6TYJVp7cYMfRtzgYc3yYHtYDocbm-ig3q9xnjGgRxVelLyl6iHGOYVaHDXHRWB1p4Ym3cK2ooGtT3HqDN_YBDdyhnfQJDd9GL9A3S69hR9W8BFMEHPuw6TPa8iJF2ymfE179M4KpRT83-_d-mLc1e-PbV5ZMDVRG_6KMSag';

// Connect to db before each test
beforeEach(async () => {
    await mongoose.connect("mongodb+srv://recruitmentbuddy:1357911@cluster0.solu9aj.mongodb.net/?retryWrites=true&w=majority");
});

// Close db connection after each test
afterEach(async() => {
    await mongoose.connection.close();
});

// Unit Tests
describe("GET /api/users/:userId", () => {
    it("should get the user from userId", async() => {
        const userId = '65cea289942e4bcd4f4f9d9d';
        const res = await request(app)
            .get("/api/users/" + userId)
            .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw');
        expect(res.statusCode).toBe(200);
        expect(res.body.fullName).toBe("John Doe2");
    })

    it("incorrect id", async() => {
        const userId = 'idjhssid';
        const res = await request(app)
            .get("/api/users/" + userId)
            .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw');
        expect(res.statusCode).toBe(500);
    })

    it("no auth id", async() => {
        const userId = '65cea289942e4bcd4f4f9d9d';
        const res = await request(app).get("/api/users/" + userId, {});
        expect(res.statusCode).toBe(401);
    })
})

describe("UPDATE /api/users/:userId", () => {
    it("should update the user with userId", async() => {
        const userId = '65cea289942e4bcd4f4f9d9d';
        
        const payload = {
            "username": "riyapatel22",
            "email": "riyapatel@outlook.com",
            "phoneNumber": "1234567890",
            "role": "mentee",
            "firebaseUid": "some-unique-firebase-uid-2",
            "fullName": "John Doe2",
            "bio": "Experienced software developer...",
            "skills": ["Java", "C++", "Python"],
            "education": {
                "institution": "Vanderbilt University",
                "degree": "Bachelor's Degree",
                "fieldOfStudy": "Computer Science",
                "startDate": "2022-09-01T00:00:00.000Z",
                "endDate": "2024-09-01T00:00:00.000Z"
            },
            "experience": {
                "title": "Software Engineer",
                "company": "Company Name",
                "location": "New York, NY",
                "startDate": "2022-09-01T00:00:00.000Z",
                "endDate": "2024-09-01T00:00:00.000Z",
                "description": "Worked at X company to do Y work"
            },
            "calendlyLink": "https://calendly.com/riyapatel1"
        }

        const res = await request(app).put("/api/users/" + userId)
                                        .send({body: payload})
                                        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw');
        expect(res.statusCode).toBe(200);
        expect(res.body.fullName).toBe("John Doe2");
    })
    it("incorrect userId", async() => {
        const userId = '231223';
        
        const payload = {
            "username": "riyapatel22",
            "email": "riyapatel@outlook.com",
            "phoneNumber": "1234567890",
            "role": "mentee",
            "firebaseUid": "some-unique-firebase-uid-2",
            "fullName": "John Doe2",
            "bio": "Experienced software developer...",
            "skills": ["Java", "C++", "Python"],
            "education": {
                "institution": "Vanderbilt University",
                "degree": "Bachelor's Degree",
                "fieldOfStudy": "Computer Science",
                "startDate": "2022-09-01T00:00:00.000Z",
                "endDate": "2024-09-01T00:00:00.000Z"
            },
            "experience": {
                "title": "Software Engineer",
                "company": "Company Name",
                "location": "New York, NY",
                "startDate": "2022-09-01T00:00:00.000Z",
                "endDate": "2024-09-01T00:00:00.000Z",
                "description": "Worked at X company to do Y work"
            },
            "calendlyLink": "https://calendly.com/riyapatel1"
        }

        const res = await request(app).put("/api/users/" + userId)
                                        .send({body: payload})
                                        .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNzhkMGViNzdhMjdlNGUxMGMzMTFmZTcxZDgwM2I5MmY3NjYwZGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMjEyMjEsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAyMTIyMSwiZXhwIjoxNzEyMDI0ODIxLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.K4H7YfU5DkieD0E9KANf_eQKEAh_wnqNK1sDtkRbc2ymmEbPdMNeOzg4RzylsCWNZFEe9p6-942mvCJM7rZvtxHXfQBnpLvec__YnE8rRZebJwNwH3ZkFByHidZ3VczWgyymuB6UzTgJil_H5prMu3JFFO9NEOMBrkNdERpQmvdKQ_3y1WWiq8WMdkDYEtiplsIJH5g07hhoFRDjO5vrQmfnT_zzmsF8ksisQaGJfmc-chEcjBRKYzRkbt1BQ_nHBXcUKn0FRNs3piybHVZoTSJH3b9lvsQvgo-POumqmTj4u4bHdpSEKXNpowBAVz7_mzf8v1Mc9Obw-SDEr8kMcw');
        expect(res.statusCode).toBe(500);
    })
})