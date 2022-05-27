// ✨ implement axiosWithAuth

import axios from "axios";

const AxiosLogin = (loginUrl, credentials) => {

  axios.post(loginUrl, credentials)
  .then(res => {
    localStorage.setItem('token', res.data.token);
    console.log('success!');
  })
  .catch(err => {
    console.log(err)
  })
};

export default AxiosLogin;
