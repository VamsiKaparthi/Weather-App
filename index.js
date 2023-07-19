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
    console.log(finalResponse);
  } catch (err) {
    console.log(err);
  }
};
getWeather("Ggn");
