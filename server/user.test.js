const {axios} = require('axios');
const { getUser, createUser, updateUser, deleteUser, getAllUsers, getUserByFirebaseUid} = require('./controllers/userController');
const User = require('./models/User');

describe('test', () => {
    it('getUser', () => {
        
        // simulate get request for user information
        const getUserInfo = async (userId) => {
            try {
                const requestParams = {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMDI3NTQsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAwMjc1NCwiZXhwIjoxNzEyMDA2MzU0LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.MF_9WDYNF_aiX2bMjWEGEYMj6vs8NF9TnPSn2hH7kRD40NH3UHmDXoE8Ie4fXxzLgae2BCCDoiAzB6cbR7peZo02YEjIIsVo1GiK3C4Py7sLG--1Y4C-RZroEsVkZ1v51p9VAJUBex_FbI4Y9fTnul-acA1UnN7byxyCGOnnLTqMWAwLdq9xnTSuYR3Ple3Pnqz13F9umfOURQDAVIsIUbRlhv2ddDy_q_3R2iVh9JQPddg_nZ79udfzifUhgcfv5u0gcxcX8_3wWZDcu80EROO9xHuC2m-RQX-BKCqEW3EKDx-3pi7EnWbz6Gh-s0rOPmCGBRqUUX6a4iidyNgMrw',
              },
            };
            return axios.get(HOST + "/api/users/" + userId, requestParams);
            } catch (error) {
                console.error('Error fetching user info: ', error);
                throw error;
            }
        };

        const fetchData = async() => {
            const userId = '65cea289942e4bcd4f4f9d9d';
            const HOST = "http://127.0.0.1:5000";
            const userInfo = await getUserInfo(userId);
            
        }
        fetchData();
    })

    it('updateUser', () => {
        
        // simulate update request for user information

        const updateUserInfo = async (userId, payload) => {
        try {
            const requestParams = {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjI1OTZmNTJmNTJlZDQ0MDQ5Mzk2YmU3ZGYzNGQyYzY0ZjQ1M2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MTIwMDI3NTQsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcxMjAwMjc1NCwiZXhwIjoxNzEyMDA2MzU0LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.MF_9WDYNF_aiX2bMjWEGEYMj6vs8NF9TnPSn2hH7kRD40NH3UHmDXoE8Ie4fXxzLgae2BCCDoiAzB6cbR7peZo02YEjIIsVo1GiK3C4Py7sLG--1Y4C-RZroEsVkZ1v51p9VAJUBex_FbI4Y9fTnul-acA1UnN7byxyCGOnnLTqMWAwLdq9xnTSuYR3Ple3Pnqz13F9umfOURQDAVIsIUbRlhv2ddDy_q_3R2iVh9JQPddg_nZ79udfzifUhgcfv5u0gcxcX8_3wWZDcu80EROO9xHuC2m-RQX-BKCqEW3EKDx-3pi7EnWbz6Gh-s0rOPmCGBRqUUX6a4iidyNgMrw',
              },
            };
            return axios.put(HOST + "/api/users/" + userId, payload, requestParams)
            
        } catch (error) {
            console.error('Error updating user info: ', error);
            throw error;
            }
        };

        const updateData = async() => {
            const userId = '65cea289942e4bcd4f4f9d9d';
            const HOST = "http://127.0.0.1:5000";
            const payload = {
                "username": "riyapatel22",
                "email": "riyapatel@outlook.com",
                "phoneNumber": "1234567890",
                "role": "mentee",
                "firebaseUid": "some-unique-firebase-uid-2",
                "fullName": "New Temp Riya Patel",
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

            const userInfo = await updateUserInfo(userId);
            
        }
        updateData();
    })
})

