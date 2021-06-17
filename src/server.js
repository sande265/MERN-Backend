const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./api/users/userRoute')
const authRoutes = require('./api/auth/authRoute')

//Environment variable
const port = process.env.PORT

//parser
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

//middleware
app.use('/api', userRoutes, authRoutes)


app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
})