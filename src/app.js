const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.set('views',viewsPath)
app.set('view engine','hbs')

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title : 'Weather Application!',
        name : 'Bhaskar'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title : 'Help Page',
        name : 'Bhaskar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About us!',
        name : "Bhaskar"
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error : "Please provide address item"
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {})=>{
        // console.log(response)
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude,(error,data)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast : data,
                location ,
                address : req.query.address,
            })
            // console.log(location)
            // console.log(data)
        })
    })


    // res.send({
    //     address : req.query.address,
    //     location : 'Bangalore, karnataka, India',
    //     forecast : 'Partly cloudy'
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'Please provide search item'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('notfound',{
        title : 'Error',
        name : 'Bhaskar',
        errorMsg : 'Help article not found!'
    })
})

app.get('*',(req, res)=>{
    res.render('notfound',{
        title : 'Error',
        name : 'Bhaskar',
        errorMsg : 'Page not found!'
    })
})


app.listen(port, ()=>{
    console.log('app started in port '+port)
})