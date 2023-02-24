import axios from 'axios';

const url = 'http://127.0.0.1:7000/api/';
export const callApi = async (api, route, formData = {}, params = {}) => {
  let response;
  try {
    const options = {
      url: `${url}${api}`,
      method: route,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      params,
      data: formData,
    };
    const { data } = await axios(options);
    response = data;
  } catch (error) {
    response = error.response.data;
  }
  return response;
};
