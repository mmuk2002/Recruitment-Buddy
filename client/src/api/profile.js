import axios from "axios";
import { HOST } from "../host-config";
import { useAuth } from "../AuthContext";
import { getRequestHeaders } from "../utils/functions";

export const getUserInfo = async (userId) => {

  const config = await getRequestHeaders();

    const requestParams = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDk3NjcxOTksInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwOTc2NzE5OSwiZXhwIjoxNzA5NzcwNzk5LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UZB9BRK2DOw74CWyNWivqN6dMhA52TdjOghOFQ2Xld58IpqtVl3GM8X3upItIY3VkQMLovZGvwKmjbE8lwodCdXC8x0a6y_KmlyhwyzrRUbTIlIYNnlV1Lkjki9tIS9Jm_CxP67gW1FcED-9igRyh57DxpMkjHgb8U2LaxOUX59OQ69gXNg9v_daS4jESU3KozGoZNsIUTTH_qo5UCfE4vS3RuT5hsgSfLVLcUilVx88ITdB166MsJWyhvqwrIl2DL77NdeZ4D38-CQDSpqe3Ob-MQ54gdsTLcoAxfGL6kRsFWQoifYrlCcEq9JqWXal2Q-1H1nnQXWhdDvbkOMojg',
      },
    };

  
    return axios.get(HOST + "/api/users/firebaseUid/" + userId, config);
  };

export const updateUserInfo = async (userId, payload) => {

  const config = await getRequestHeaders();

  const requestParams = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwOWY4ZTMzN2ZjNzg1NTE0ZTExMGM2ZDg0N2Y0M2M3NDM1M2U0YWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVjcnVpdG1lbnRidWRkeS1lZDRmMCIsImF1ZCI6InJlY3J1aXRtZW50YnVkZHktZWQ0ZjAiLCJhdXRoX3RpbWUiOjE3MDk3NjcxOTksInVzZXJfaWQiOiJuYlhCdTF1MnVaWWhRWXZVSWNEeElKVklaeDkyIiwic3ViIjoibmJYQnUxdTJ1WlloUVl2VUljRHhJSlZJWng5MiIsImlhdCI6MTcwOTc2NzE5OSwiZXhwIjoxNzA5NzcwNzk5LCJlbWFpbCI6InJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlY3J1aXRtZW50YnVkZHlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UZB9BRK2DOw74CWyNWivqN6dMhA52TdjOghOFQ2Xld58IpqtVl3GM8X3upItIY3VkQMLovZGvwKmjbE8lwodCdXC8x0a6y_KmlyhwyzrRUbTIlIYNnlV1Lkjki9tIS9Jm_CxP67gW1FcED-9igRyh57DxpMkjHgb8U2LaxOUX59OQ69gXNg9v_daS4jESU3KozGoZNsIUTTH_qo5UCfE4vS3RuT5hsgSfLVLcUilVx88ITdB166MsJWyhvqwrIl2DL77NdeZ4D38-CQDSpqe3Ob-MQ54gdsTLcoAxfGL6kRsFWQoifYrlCcEq9JqWXal2Q-1H1nnQXWhdDvbkOMojg',
    },
  };


  return axios.put(HOST + "/api/users/" + userId, payload, config)
};