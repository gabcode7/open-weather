const express = require("express");
const ejs = require("ejs");
const https = require("https");
const { response } = require("express");
const app = express(); 
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) { 
    res.render("home");
});

app.post("/search", function(req, res) { 
    const city = req.body.city;
    const apiKey = "APIKEY";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&appid=" +  apiKey + "&units=metric";

    https.get(url, function (response) {
       // console.log(response.statusCode);
       response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon; 
            res.render("search", {
              city: city,
              weatherDescription: weatherDescription,
              temp: temp,
              icon: icon,
            });
       });

     });

    

});

app.listen(3000, function() { 
    console.log("Server started in port 3000!");
})