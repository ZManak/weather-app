const express = require('express');
const request = require('request');
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Template engine
app.set('view engine', 'pug');
app.set('views', './views');



app.get('/', function (req, res) {
  res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {
  let city = req.body.city;
  const apiKey = 'cf8e1e70e4f8c11bf22baeed803614a6';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      let weather = JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})