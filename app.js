
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const mail = req.body.email;

  const data = {
    members : [
      {
        email_address : mail,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName

        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/c76bd71819";

  const options = {
    method : "POST",
    auth : "Abesh:0ef3fde8e40cd2896428ddf8106c3ad6-us6"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile (__dirname + "/success.html");
    } else {
      res.sendFile (__dirname + "/failure.html");
    }


    response.on("data", function(data) {
    console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});




//API kaspersky
//0ef3fde8e40cd2896428ddf8106c3ad6-us6

//List id
//c76bd71819
