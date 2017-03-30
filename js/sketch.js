// ***** Global variables ***** //
var weatherData;
var apiKey = 'fa6eb922b5784b2da86a4824d7fdf0cf';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'New York City';
var units = 'metric';
var maxTemp = 40;
var minTemp = -5;
var maxColor = 360;
var minColor = 240;
var currentTemp = 0;
var currentHumidity = 0;
var button;
var cityInput;
var currentWindSpeed;
var currentWindDirection;
var x = 0;
var img;
var icon;

// ***** Setup function ***** //
function setup(){
    createCanvas(800, 800);
    colorMode(HSB);
    frameRate(30);
    button = select('#submit');
    cityInput = select('#city');
    button.mousePressed(queryAPI);
    iconNumber = icon;
    img = loadImage("../img/codes/" + iconNumber);
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
  icon = weatherData.weather[0].id;
  
  // console.log(weatherData.main.temp);
}

// ***** Draw function ***** //
function draw(){
    background(255);
    ellipseWindMove = (x += currentWindSpeed);
    //iconNumber = "../img/codes/" + icon + ".png";
    img = loadImage(iconNumber);
    if (weatherData) {
      noStroke();
      fill(0);
      text('Temperature: ' + str(currentTemp) + ' C', 20, 20);
      text('Humidity: ' + str(currentHumidity) + '%', 20, 40);
      text('Wind Speed ' + str(currentWindSpeed) + ' meters per second', 20, 60);
      text('Wind Direction ' + str(currentWindDirection) + ' degrees', 20, 80);
      text('Cloudiness ' + str(currentCloud) + '%', 20, 100);
      text("ImgID: " + icon, 20, 120);
      var hueColor = map(currentTemp, minTemp, maxTemp, minColor, maxColor);
      fill(hueColor, 100, 100);
      ellipse(200 , 200, currentTemp*5, currentTemp*5);
      image(img, 40, 20)  
    }
    else{
      text('Loading...', 20, 20);
    }
   
}
 