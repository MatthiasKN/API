// ***** Global variables ***** //
var weatherData;
var apiKey = 'fa6eb922b5784b2da86a4824d7fdf0cf';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'New York City';
var units = 'metric';
var maxTemp = 40;
var minTemp = -5;
var maxColor = 400;
var minColor = 240;
var currentTemp = 0;
var currentHumidity = 0;
var button;
var cityInput;
var currentWindSpeed;
var currentWindDirection;
var x, y;
var currentCloud;

// ***** Setup function ***** //
function setup(){
    fill(0, 0, 83);
    createCanvas(600, 450);
    colorMode(HSB);
    frameRate(30);
    button = select('#submit');
    cityInput = select('#city');
    button.mousePressed(queryAPI);
    x = 370;
    y = height;
    //img = loadImage("../img/codes/" + iconNumber);
}

function queryAPI(){
  var request = baseURL + cityInput.value() + '&units=' + units + '&apikey=' + apiKey;
  loadJSON(request, getWeatherData);
}

function getWeatherData(apiData){
  weatherData = apiData;
  currentTemp = weatherData.main.temp;
  currentHumidity = weatherData.main.humidity;
  city = cityInput.value();
  currentWindSpeed = weatherData.wind.speed;
  currentWindDirection = weatherData.wind.deg;
  currentCloud = weatherData.clouds.all;
  
  // console.log(weatherData.main.temp);
}

// ***** Draw function ***** //
function draw(){
    background(255);
    // Data Box Drawing;
    noFill();
    stroke(0, 0, 83);
    strokeWeight(2);
    rect(5, 1, 250, 140);
    //ellipseWindMove = x += currentWindSpeed;
    //iconNumber = "../img/codes/" + icon + ".png";
    //img = loadImage(iconNumber);
    if (weatherData) {
      noStroke();
      fill(0);
      text( "WEATHER DATA:", 20, 20);
      text('Temperature: ' + str(currentTemp) + ' C', 20, 50);
      text('Wind Speed ' + str(currentWindSpeed) + ' meters per second', 20, 85);
      text('Cloudiness ' + str(currentCloud) + '%', 20, 120);
      var hueColor = map(currentTemp, minTemp, maxTemp, minColor, maxColor);
      fill(hueColor, 100, 100);
      ellipse(x, 100, currentTemp*3, currentTemp*3);
      x = x + random(-currentWindSpeed + 1, currentWindSpeed - 1);
      y = y - 1
      if (y < 0) {
        y = height;
      }
    }
    else{
      text('Loading...', 20, 20);
    }
    // Legend Box Drawing;
    noFill();
    stroke(0, 0, 83);
    rect(5, 155, 250, 200);
    // Legend Drawing;
    noStroke();
    fill(0)
    text("LEGEND: ", 20, 172);
    ellipse(30, 200, 40, 40);
    text("Temperature further from Zero", 60, 200);
    ellipse(30, 236, 15, 15);
    text("Temperature closer to Zero", 60, 237);
    fill(356, 79, 94);
    ellipse(30, 260, 20, 20);
    fill(0);
    text("High Temperature", 60, 262);
    fill(201, 100, 79);
    ellipse(30, 285, 20, 20);
    fill(0)
    text("Low Temperature", 60, 287);
    ellipse(30 + (random (-.75,.75)), 310 + (random(-.75,.75)), 20, 20);
    fill(0)
    text("Low Wind Speed", 60, 312);
    ellipse(30 + (random (-2,2)), 335 + (random(-2,2)), 20, 20);
    fill(0)
    text("High Wind Speed", 60, 337);


}
   

 