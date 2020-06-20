const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .container");

const apiKey = "19f6455846a409255b84e9b9bd8b9e07";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

 //ajax here
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      msg.textContent = "";
      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <div class="flex-container">
      <div class="delhi">
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
      </div>

        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      
        <div class="figure">
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        
      
      </div>
      `;

      list.innerHTML = markup;
      
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });
});
