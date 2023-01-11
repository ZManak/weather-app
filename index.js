const request = require('request');
const argv = require('yargs').argv;

let apiKey = 'cf8e1e70e4f8c11bf22baeed803614a6';
let city = argv.c || 'madrid';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `There are ${weather.main.temp} ºC in ${weather.name}`;
    console.log(message);    
  }
});

