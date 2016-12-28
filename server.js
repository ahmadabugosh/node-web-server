const express = require('express');
const hbs= require('hbs');
const fs= require('fs');
const port=process.env.PORT || 3000;
var app =express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine' ,'hbs');


//how you register middlemare

app.use((req,res, next) => {
var now= new Date().toString();
var log=`${now}: ${req.method} ${req.url}`
console.log(log);
fs.appendFile('server.log' , log +'\n', (err) =>{
if(err)
{
	console.log('Unable to run server log');
}

});
next();
});

// app.use((req,res, next) => {

// res.render('maintenance.hbs', {

// 	pageTitle:'Maintenance Page',
	
// });

// });

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();

});


hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});

app.get('/', (req,res) => {

res.render('home.hbs', {

	pageTitle:'Home Page',
	welcomeText:'Welcome to our website!'
});

});



app.get('/about', (req,res) => {

res.render('about.hbs', {

	pageTitle:'About Page',
});

});

app.get('/projects', (req,res) => {

res.render('projects.hbs', {

	pageTitle:'Projects Page',
});

});


// app.get('/bad', (req,res) => {

// //res.send('<h1>Hello express</h1>');
// res.send({
//  	error: 'Error handling request'

// });

// });

// app.get('/', (req,res) => {

// //res.send('<h1>Hello express</h1>');
// res.send({
//  	name: 'Ahmad',
//  	wife: 'Rukaya',
//  	daughter: 'Sophia'

// });

// });

app.listen(port, () => {
	console.log(`Server is up on ${port}`);
});


