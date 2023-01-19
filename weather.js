const express= require('express')
const app = express()
const bodyparser=require('body-parser')
const https=require('https')

app.use(bodyparser.urlencoded({extended:true}))
app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html")
})

app.listen(3000, function(){
    console.log("Server started")
})

app.get("/",function(req, res){
    res.send("Website up")
})

app.post("/",function(request,response){
    const apikey="8fdd459c2709722cb71fc7a9269d2d43"
    var city=request.body.cityname
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric"
    https.get(url,function(res){
        res.on("data",function(data){
            var weatherinfo=JSON.parse(data)
            var weather=weatherinfo.weather[0].main
            var temperature=weatherinfo.main.temp
            var place=weatherinfo.name
            var icon=weatherinfo.weather[0].icon
            var imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            response.write("<h1>Weather : "+weather+"</h1>")
            response.write("\n<h1>Temp : "+temperature+"<span>&#176;</span>C</h1>")
            response.write("<img src="+imgurl+">")
            response.send()
        })
    })
    //response.send()
})
/**/