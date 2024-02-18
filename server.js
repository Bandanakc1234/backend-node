const express = require("express")
require("dotenv").config()
require("./database/connection")

//middleware
const bodyParser = require('body-parser')

//routes
const TestRoutes = require('./routes/testroutes')
const CareerRoutes = require('./routes/career.route')

const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(bodyParser.json())

//use routes
app.use('/api', TestRoutes)
app.use('/api', CareerRoutes)


app.listen(port, () =>{
    console.log(`server started successfully at port ${port}`)
})