let getWeather = async (location) => {
  try {
    let intialResponse = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=2b154870f8384801844114653231607&q=${location}&days=3&aqi=yes&alerts=no`,
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
    //sidebar details
    let currentTemp = weather.current.feelslike_c;
    let currentTempDom = document.querySelector(".current-temp");
    currentTempDom.innerHTML = `${currentTemp}°C`;

    let windDirection = windDirectionStringify(weather.current.wind_dir);
    let windSpeed = weather.current.wind_kph;
    let windDom = document.querySelector(".current-wind");
    windDom.innerHTML = `${windDirection}  ${windSpeed}km/h`;

    //Main details
    let location = weather.location.name;
    let locationDom = document.querySelector(".location");
    locationDom.innerHTML = `${location}`;

    let condition = weather.current.condition.text;
    console.log(condition);
    let conditionDom = document.querySelector(".condition");
    conditionDom.innerHTML = condition;

    let time = weather.location.localtime;
    time = time.split(" ");
    let timeDom = document.querySelector(".date");
    timeDom.innerHTML = `${time[1]}&nbsp&nbsp&nbsp&nbsp${time[0]}`;

    //forecast details
    forecastDayFunction(weather);
    forecastHourFunction(weather);
  }
};
let forecastHourFunction = (weather) => {
  let timeForecast = document.querySelector(".timeForecast");
  timeForecast.innerHTML = "";
  let time = weather.location.localtime;
  let forecastArr = weather.forecast.forecastday[0].hour;
  console.log(forecastArr);
  time = time.split(" ");
  let timeArr = time[1].split(":");
  let hour = timeArr[0];
  let interval = 24 - hour;
  for (let index = hour; index < 24; index++) {
    let div = document.createElement("div");
    let element = forecastArr[index];
    let condition = element.condition.icon;
    let temp = element.temp_c;
    div.classList.add("timeDiv");
    div.innerHTML = `<span>${index}:00</span>
    <img src="${condition}" alt="con" />
    <span>${temp}</span>`;
    timeForecast.appendChild(div);
  }
};
let forecastDayFunction = (weather) => {
  const array = weather.forecast.forecastday;
  const ahead = document.querySelector(".ahead");
  ahead.innerHTML = "";
  for (let index = 1; index < 3; index++) {
    const element = array[index];
    let icon = element.day.condition.icon;
    let date = element.date;
    let condition = element.day.condition.text;
    let div = document.createElement("div");
    div.classList.add("aheadDiv");
    div.innerHTML = `<img
    id="forecastImg-${index}"
    class="forecastImage"
    alt="for"
    style="
      height: auto;
      width: 25%;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
    "
  />
  <div class="details">
    <span>${date}</span>
    <span>${condition}</span>
  </div>
  <div class="extremes">
    <span>9°</span>
    <span>16°</span>
  </div>`;

    ahead.appendChild(div);
    document.getElementById(`forecastImg-${index}`).src = icon;
  }
};
let windDirectionStringify = (windDirection) => {
  if (windDirection == "N") {
    return "North";
  } else if (windDirection == "S") {
    return "South";
  } else if (windDirection == "W") {
    return "West";
  } else if (windDirection == "E") {
    return "East";
  }
  return "Unknown";
};
document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  let location = document.getElementById("location").value;
  let weather = await getWeather(location);
  console.log(weather);
  buildWeather(weather);
  document.getElementById("location").value = "";
});
