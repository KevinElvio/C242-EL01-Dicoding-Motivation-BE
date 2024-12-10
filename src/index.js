require('dotenv').config()
const express = require('express')
const UserRoutes = require('./routes/usersRoute')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require("cors");

app.use(express.json())

app.use(cors());
app.use('/', UserRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})  