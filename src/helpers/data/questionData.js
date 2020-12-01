import axios from 'axios';

const baseUrl = 'https://prept-14a53.firebaseio.com/';

const getQuestions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}.json`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createQuestion = (data) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}.json`, data).then((response) => {
    const update = { firebaseKey: response.data.name };
    axios.patch(`${baseUrl}/${response.data.name}.json`, update).then(() => {
      resolve(response);
    }).catch((error) => reject(error));
  });
});

export default { getQuestions, createQuestion };
