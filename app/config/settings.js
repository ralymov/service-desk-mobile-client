window.axios = require('axios');
window.axios.defaults.baseURL = 'https://03942ef2.ngrok.io/api/';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
require('../libs/errorResponseHandler');
window._ = require('lodash');











