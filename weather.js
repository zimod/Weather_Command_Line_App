const https = require("https");//require the https module
const http = require("http");//require the http module for status codes
const api = require("./api.json");//require the api.json for api key

const getWeather = (query)=>{
  //connect to the API URL (https://teamtreehouse.com/zimodong.json)
  const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`,(response)=>{
                                         if(response.statusCode === 200){//okay
                                           //Read the data
                                           let body = '';
                                           response.on('data',(data)=>{
                                           //important to know, on data events emits streams of data(packages) several times until all finished
                                           body += data.toString();//use toString to transfer the buffer to string
                                           });//end on data

                                           //the end event makes sure that all streams are loaded and no more
                                           response.on('end',()=>{
                                             //parse the data to JSON
                                             const profile = JSON.parse(body);
                                             //console.dir(profile);
                                             //print it out
                                             console.dir(profile);
                                           });//end on end
                                         } else{//end if status code error we need to require the http module for http.STATUS_CODES[]
                                           const message = `There was an error getting the weather for ${query}(${http.STATUS_CODES[response.statusCode]})`;
                                           const statusCodeError = new Error(message);
                                           console.log(statusCodeError);
                                         }
                                 });//end get
   request.on("error",(err)=>{//error handler
     console.log(error.message);
   });//end on error
};//end getProfile

module.exports.get = getWeather;
