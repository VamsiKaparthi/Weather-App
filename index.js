let getWeather = async (location) => {
  try {
    let intialResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2b154870f8384801844114653231607&q=${location}&aqi=no`,
      {
        mode: "cors",
      }
    );
    if (!intialResponse.ok) {
      throw new Error("Enter a real place");
    }
    let finalResponse = await intialResponse.json();
    return finalResponse;
  } catch (err) {
    return "error";
  }
};
let buildWeather = (weather) => {
  if (weather != "error") {
    //current temp
    let currentTemp = weather.current.feelslike_c;
    let currentTempDom = document.querySelector(".current-temp");
    currentTempDom.innerHTML = `${currentTemp}°C`;
    //current wind
    let windDirection = weather.current.wind_dir;
    let windSpeed = weather.current.wind_kph;
    let windDom = document.querySelector(".current-wind");
    if (windDirection == "N") {
      windDirection = "North";
    } else if (windDirection == "S") {
      windDirection = "South";
    } else if (windDirection == "W") {
      windDirection = "West";
    } else if (windDirection == "E") {
      windDirection = "East";
    }
    windDom.innerHTML = `${windDirection}  ${windSpeed}km/h`;
  }
};
document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  let location = document.getElementById("location").value;
  let weather = await getWeather(location);
  console.log(weather);
  buildWeather(weather);
  console.log(weather.location.name);
  document.getElementById("location").value = "";
});
