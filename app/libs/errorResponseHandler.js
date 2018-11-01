import axios from 'axios';
import {Alert} from 'react-native';

function errorResponseHandler(error) {
  // check for errorHandle config
  if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
    return Promise.reject(error);
  }

  // if has response show the error
  if (error.response) {
    console.log(error.response);
    Alert.alert('Что-то пошло не так', 'Попробуйте позже');
    return Promise.reject(error);
  }
}

// apply interceptor on response
axios.interceptors.response.use(
  response => response,
  errorResponseHandler
);

export default errorResponseHandler;
