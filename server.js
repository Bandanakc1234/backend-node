const express = require("express")
require("dotenv").config()
require("./database/connection")

//middleware
const bodyParser = require('body-parser')

//routes
const TestRoutes = require('./routes/testroutes')
const CareerRoutes = require('./routes/career.route')
const ProjectRoutes = require('./routes/project.route')
const UserRoutes = require('./routes/user.route')

const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(bodyParser.json())

//use routes
app.use('/api', TestRoutes)
app.use('/api/career', CareerRoutes)
app.use('/api/project', ProjectRoutes)
app.use('/api/user', UserRoutes )


app.listen(port, () =>{
    console.log(`server started successfully at port ${port}`)
})

