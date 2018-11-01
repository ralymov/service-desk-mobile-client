window.axios = require('axios');
window.axios.defaults.baseURL = 'https://5dfbd334.ngrok.io/api/';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
require('../libs/errorResponseHandler');
window._ = require('lodash');











