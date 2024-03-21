import axios from "axios";
import { HOST } from "../host-config";
import { auth } from "../firebase";

export const getUserInfo = async (userId) => {

    const requestParams = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDk4Mjg4NzksInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwOTgyODg3OSwiZXhwIjoxNzA5ODMyNDc5LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PZ_Rl42spJ3EAg1zxCR4Avr6M9wi19ZiriFegcRVWf_Er01_x5UFKZ86Hlrqso1TOVoCUvjjiHX0rOt7zVLKwmYdPBQKphgDz_e5dnmu8aljHyOiXU02_Jyf-pe9huSKPagFzx0iGMeixOFjfTjNu7ZPX-yF2WRur-btepAX0Limfpo67m4sBFNX3OXKBPnx-oCx7ioCdaiAWTAtmQuGyY2Tcc65jVjs4yVilTt3EHncXN41_mrSlbA-t_nzjyzNx7jz948wW9jVyI7AgfIMFBhhTEtBFenNYz1s0bwKts2X9Iz8yBSIKmLCrZVarjbqi8RfSN6jlf-so_OoyP_MAA',
      },
    };

  
    return axios.get(HOST + "/api/users/" + userId, requestParams);
  };

export const updateUserInfo = async (userId, payload) => {

  const requestParams = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDk4Mjg4NzksInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwOTgyODg3OSwiZXhwIjoxNzA5ODMyNDc5LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.PZ_Rl42spJ3EAg1zxCR4Avr6M9wi19ZiriFegcRVWf_Er01_x5UFKZ86Hlrqso1TOVoCUvjjiHX0rOt7zVLKwmYdPBQKphgDz_e5dnmu8aljHyOiXU02_Jyf-pe9huSKPagFzx0iGMeixOFjfTjNu7ZPX-yF2WRur-btepAX0Limfpo67m4sBFNX3OXKBPnx-oCx7ioCdaiAWTAtmQuGyY2Tcc65jVjs4yVilTt3EHncXN41_mrSlbA-t_nzjyzNx7jz948wW9jVyI7AgfIMFBhhTEtBFenNYz1s0bwKts2X9Iz8yBSIKmLCrZVarjbqi8RfSN6jlf-so_OoyP_MAA',
    },
  };

  return axios.put(HOST + "/api/users/" + userId, payload, requestParams)
};