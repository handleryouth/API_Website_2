//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var targetDomain = req.body.domain; /*ip address*/
  var APIKEY = "at_pnd4iY9BCcXrWO3KpVEClzYu3lx03";
  const url = "https://geo.ipify.org/api/v1?apiKey=" + APIKEY + "&ipAddress=" + targetDomain;

  https.get(url, function(reponse) {
    reponse.on("data", function(data) {
      const ipInformation = JSON.parse(data);
      var city = ipInformation.location.city;
      if (city === "") {
        city = "N.A. (City)";
      }

      var region = ipInformation.location.region;
      if (region === "") {
        region = ", " + "N.A. (Region)";
      }
      else{
        region = ", " + ipInformation.location.region;
      }

      var postalCode = ipInformation.location.postalCode;
      if (postalCode === "") {
        postalCode = ", " + "N.A. (Postal)";
      }
      else{
        postalCode = ", " + ipInformation.location.postalCode;
      }

      var timezone = ipInformation.location.timezone;
      if (timezone === "") {
        timezone = "N.A. (Timezone)";
      }
      else{
        timezone = "UTC " + timezone;
      }
      var isp = ipInformation.isp;
      if (isp === "") {
        isp = "N.A. ISP";
      }

      var latitude = ipInformation.location.lat;
      var longitude = ipInformation.location.lng;
      res.render("index1", {
        ipadd: targetDomain,
        cityName: city,
        regionName: region,
        postalNumber: postalCode,
        UTCTime: timezone,
        internetService: isp,
        latNumber : latitude,
        longNumber : longitude
      });
    });
  });
});


app.listen(3000, function() {
  console.log("server is running on port 3000");
});
