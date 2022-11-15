const mymap=L.map('mymap').setView([34.0614, -118.08162], 13);
//attribution is for the map source and tiles are the spatial map itself
 
const attribution=
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {attribution});

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
tiles.addTo(mymap);
//the marker is the icon that shows the exact latitude and longitude location
const markerIcon=L.icon({
    iconUrl:'images/icon-location.svg',
    iconSize:[100, 40],
    iconAnchor:[50,20]
});
const marker= L.marker([0, 0], {icon: markerIcon}).addTo(mymap);


const ipDisplay = document.getElementById("ip-address");
const locationDisplay = document.getElementById("location");
const timezoneDisplay = document.getElementById("timezone");
const ispDisplay = document.getElementById("isp");
const mapDisplay = document.getElementById("mymap");

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    var userInput = e.target[0].value;
    // add an ip validation here
    main(userInput);
  })


    
      function main(ipAddress){
        const ip = ipAddress;
        const api_key = 'at_MMESFm0UNhTLS5Fj4IY9RIr6a3P1C';
        const api_url = 'https://geo.ipify.org/api/v2/country,city?';
        const url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;
      
        
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(res => {
            displayInfo(res);
            displayMap(res);
          })
      }

      function displayInfo(res){
        ipDisplay.innerText = res.ip;
        locationDisplay.innerText = res.location.city + " " + res.location.country + " " + res.location.postalCode;
        timezoneDisplay.innerText = "UTC " + res.location.timezone;
        ispDisplay.innerText = res.isp;  
      }

      function displayMap(res){
        mymap.setView([res.location.lat, res.location.lng], 13);
        marker.setLatLng([res.location.lat, res.location.lng], 13)
          }
    