// date
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//api
const APIkey = "&appid=fe065ecaada6775e73d05365a035eeae";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Event listener to add function to generate button
document.getElementById("generate").addEventListener("click", generate);

function generate(e) {
  let weatherInfo = {
    newZip: document.getElementById("zip").value,
    content: document.getElementById("feelings").value,
    date: newDate,
  };
  getData(baseURL, weatherInfo.newZip, APIkey).then(function (data) {
    postData("/add", {
      date: weatherInfo.date,
      temp: data.main.temp,
      content: weatherInfo.content,
    });
  });
}
const getData = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const userData = await res.json();
    console.log(res);
    if (res.ok) {
      updateUI();
      return userData;
    } else {
      alert("zip code is invalid, Please enter correct zip code");
    }
  } catch (error) {
    console.log("error", error);
  }
};

// post data
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};
// update UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temp: ${allData.temp}`;
    document.getElementById(
      "content"
    ).innerHTML = `Your feeling: ${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
