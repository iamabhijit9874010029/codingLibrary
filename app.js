const express = require('express');
const mongoose = require('mongoose');
const Code = require('./models/code');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://localhost:27017";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //this return promise
  .then((result) =>{ console.log("Database-connected, listen to port: 8080"); app.listen(8080)})
  //after db connected than it will listen to port3000
  .catch(err => console.log(err)); //else errors will be shown


// register view engine
app.set('view engine', 'ejs');
 
// middleware & static files
app.use(express.static('public')); //this will helps to use style.css file
app.use(express.urlencoded({ extended: true })); //this will helps to get submitted data of form in req.body obj



// home routes
app.get('/', (req, res) => {
  res.redirect('/codes'); //this will redirect page to /codes
});

//codes i.e index route
app.get('/codes',(req,res)=>{
  console.log("req made on"+req.url);
   Code.find().sort({createdAt:-1})//it will find all data and show it in descending order
    .then(result => { 
      res.render('index', { codes: result ,title: 'Home' }); //it will then render index page along with codes
    })
    .catch(err => {
      console.log(err);
    });
})

//about route
app.get('/about',(req,res)=>{
  console.log("req made on"+req.url);
  res.render('about',{title:'About'});
})

//route for code create
app.get('/code/create',(req,res)=>{
  console.log("GET req made on"+req.url);
  res.render('addcode',{title:'Add-Code'});
})

//route for codes/withvar
app.get('/codes/:id', (req, res) => {
  const id = req.params.id;
  Code.findById(id)
    .then(result => {
      res.render('details', { code: result, action:'edit',title: 'Code Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

//route for edit/name/action variable that will display current value to input field
app.get('/edit/:name/:action',(req,res)=>{
  const name = req.params.name;
  console.log("req made on"+req.url);
  Code.findOne({name:name})
    .then(result => {
      res.render('edit', { code: result ,title: 'Edit-Code' });
    })
    .catch(err => {
      console.log(err);
    });
})

//submitting data routes
  app.post('/code/create',(req,res)=>{
  console.log("POST req made on"+req.url);
  console.log("Form submitted to server");


  /*Note: when you are passing form obj directly to collection using model you
          have to give same name in form of that data that is to be passed in database 
          and that name is declared inside schema*/
  const code = new Code(req.body); //passing object of form data directly to collection
  code.save() //then saving this to database and this return promise
    .then(result => {
      res.redirect('/codes');//is success save this will redirect to home page
    })
    .catch(err => { //if data not saved error showed
      console.log(err);
    });

})

//route for updating codes data
app.post('/edit/:id',(req,res)=>{
  console.log("POST req made on"+req.url);
  Code.updateOne({_id:req.params.id},req.body) //then updating that code whose id is get from url 
                                               //first passing id which code is to be updated than passing update info
    .then(result => {
      res.redirect('/codes');//is success save this will redirect to home page
      console.log("codes profile Updated");
    })
    .catch(err => { //if data not saved error showed
      console.log(err);
    });

})


//routes for deleting codes by getting codes name from url then finding that  codes then doing delete
app.post('/codes/:name',(req,res)=>{ //form action of details.ejs pass name of code that later is assume as name
  const name = req.params.name;
  console.log(name);
  Code.deleteOne({name:name})
  .then(result => {
    res.redirect('/codes');
  })
  .catch(err => {
    console.log(err);
  });
})

//404 errors routes
//this will auto run incase no routes
//Note: must put this route at last route list
app.use((req,res)=>{
  console.log("req made on"+req.url);
  res.render('404',{title:'NotFound'});
})






