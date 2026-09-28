//? SETUP--

//npm init -y
// npm install express express-handlebars dotenv mongoose nodemon

//! =======CREATE SERVER========

const express = require ('express')
const mongoose = require('mongoose')
const {engine}= require ('express-handlebars')

const {PORT, MONGODB_URL}= require('./config/config')
const routing= require('./router/noteRoutes')
const controller=require("./controllers/noteController")


const app= express()
//middleware

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))
app.get('/', controller.home)

//helper function
app.engine('handlebars', engine(
    {
        helpers:{
            eq:function(a,b){
                return a===b
            }
        }
    }
))

app.set('view engine','handlebars')
app.use('/api', routing)

let connectDb= async()=> {
    console.log(MONGODB_URL)
    await mongoose.connect(MONGODB_URL)
    console.log('Note App DB is connected')

}

connectDb()

app.listen(PORT, err=>{
    if(err) throw err
    console.log(`Server is running on http://localhost:${PORT}`)
})