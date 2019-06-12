const axios = require('axios');

axios.get('http://localhost:7777/data').then(function(res) {
    console.log(res.data);
})