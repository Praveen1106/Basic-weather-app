// jshint esversion : 6

const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){


                res.sendFile(__dirname + "/index.html");
        })
//     })
// })

app.post("/",function(req, res){

const city = req.body.cityname
const apikey = "2d8b5c34bb92a6e613deeef0148d5fb2"
const unit = "metric"
const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&units="+ unit +"&appid=" + apikey
    https.get(URL, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const imgurl = weatherData.weather[0].icon
            const icon = "http://openweathermap.org/img/wn/" + imgurl + "@2x.png"
 

            res.write("<p>the weather is \"" + desc + "\"</p>")
            res.write("<img src=" + icon + ">")
            res.write("<h1>The temperature in " + city + " is " + temp + " degree celsius</h1>")
            res.send()

        })
    })        
})


app.listen(3020,function(){
    console.log("server is running at port 3020")
})