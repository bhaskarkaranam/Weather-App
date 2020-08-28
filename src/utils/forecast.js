const request = require('request')

const forecast = (lat ,lon ,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4b831fd8dbbbd4ff4e6822774cb9996f&query='+ lat+','+lon
    request({url  , json :true}, (error,{body})=>{
        if(error) {
            callback('No network!',undefined)
        }
        else if(body.error) {
            callback(body.error,undefined)
        }
        else {
           // console.log('The temperature out there is '+response.body.current.temperature + '. And the chance of rain occuring is '+ response.body.current.precip +'%')
           callback(undefined,'The weather is '+ body.current.weather_descriptions[0]+'. The temperature out there is '+body.current.temperature + '. And the chance of rain occuring is '+ body.current.precip +'%')
        }
    })
}

module.exports = forecast