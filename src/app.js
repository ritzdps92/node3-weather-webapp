const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('',(req, res)=>{
    console.log("Starting");    
    res.render('index',{
        title:"Weather",
        name: "Ritesh Singh",
        createdBy:"Ritesh Singh"
    }); 
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About Weather",
        name:"Ritesh"
    }); 
})

app.get('/help',(req, res)=>{
    res.render('help', {
        title:"Help",
        name:"Ritesh"
    }); 
})





app.get('/Weather',(req, res)=>{
    console.log("In weather!!")
    if(!req.query.address){
        return res.send({
            'error':"You must Provide a search term"
        })
    }

    //console.log(req.query)
    const address = req.query.address
    geocode(address, (error, response)=>{
        if(error){
            return res.send({
                'error':error
            })
        }
    
        //response.longitude, response.latitude
        console.log("from geo code, longitude:", response.longitutde);
        console.log("from geo code, latitude:", response.latitude);
        forecast(response.longitutde, response.latitude, (error, data)=>{
            if(error){
                return res.send({
                    'error':error
                })
            }
            res.send({
                Address: address,
                Location: response.location,
                forecast: data
            });
          
        })
    
    });

});


app.get('*',(req, res)=>{
    //res.send('My 404 Page');
    res.render('404',{
        title:'404',
        name:'Ritesh Singh',
        errorMessage:'Page not found'
    })
})


app.listen(3000, ()=>{
    console.log("Server is started on port 3000");
});