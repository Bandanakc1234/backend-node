const express = require("express")
require("dotenv").config()
require("./database/connection")
const morgan = require("morgan")
const cors = require('cors')

//middleware
const bodyParser = require('body-parser')

//routes
const CareerRoutes = require('./routes/career.route')
const ProjectRoutes = require('./routes/project.route')
const CategoryRoutes = require('./routes/category.route')
const UserRoutes = require('./routes/user.route')


const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors())

//use routes
app.use('/api/career', CareerRoutes)
app.use('/api/project', ProjectRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/user', UserRoutes )



app.listen(port, () =>{
    console.log(`server started successfully at port ${port}`)
})

