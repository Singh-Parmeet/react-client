import axios from 'axios';

export const callApi = async (api, email, password) => {
  let response;
  const data = {
    email,
    password,
  };
  try {
    const res = await axios.post(api, data);
    response = res.data;
  } catch (error) {
    console.log(error.response);
    response = error.response.data;
  }
  return response;
};
