import axios from "axios";
import { HOST } from "../host-config";

export const getUserInfo = async (userId) => {

    const requestParams = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNiYjg3ZGNhM2JjYjY5ZDcyYjZjYmExYjU5YjMzY2M1MjI5N2NhOGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDk1MjQyNDAsInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwOTUyNDI0MCwiZXhwIjoxNzA5NTI3ODQwLCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ckfjxvAr8TT3iQ0yodgJ40lJOU-k6-8Yc7grp1hbJm6JFPBRaiIsPNbwcDHKZKEoqqASZEv9o4vHy5ggvnxIpuYr3pwO_jwRhRUx0Lci8znnoixdzWF8ZWUlAJx6Zr7Ft5_kNmUc0JEZdvRxUkNiV6jK-_U7aUckzH8UTbsGIp4Dla5xBpsa-SBEPKaWuLOdBeyIQsPLYSUFnLhqubf4Q91V8kW7Zr0I0PcWfhCzgJJv9wYOinWSHKBcQnvkspCFD8mH1hW_lj7uRdfQzM9QXAELPbWc_-HzYoh0j1kQsiy6DQFbvawaQjQsgpkL5oVE3IotwF65mlX3FjvtnqMvYQ',
      },
    };

  
    return axios.get(HOST + "/api/users/" + userId, requestParams);
  };