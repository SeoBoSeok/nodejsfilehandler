const request = require('request');
const fs = require('fs');

request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
});

request('https://naver.com').pipe(fs.createWriteStream('naver.html'));