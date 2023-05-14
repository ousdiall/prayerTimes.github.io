const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=auto:ip`

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

app.get('/', (req,res) => {
    res.send("Hello")
})

app.get('/times', async (res, next) => {
    try {
        if (!process.env.REACT_APP_API_KEY){
            throw new Error("Didn't set key")
        }
    const result = await axios.get(apiURL, {
        headers: {
            "key": process.env.REACT_APP_API_KEY
        }
    })
    res.json(result.data)
} catch (err) {
    next(err)
}
})


app.listen(5000, () => {console.log('Started')})