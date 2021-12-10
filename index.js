const express = require('express')
const app = express()
const dotenv =require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const Text = require('./model');

dotenv.config({ path: '.env'})
app.use(cors())
mongoose.connect(process.env.MONGO_URL , 
    {useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(console.log('DB connected ....')).catch(err=> console.log(err));

app.use(express.json());

app.get('/text', async (req, res) => {
    try{
        const texts = await Text.find()

        return res.status(200).json({
            status: 'succes',
            data: texts
        })
    }catch(err){
        return res.status(400).json({
            status: 'error',
            err
        })
    }
})
app.post('/text', async (req,res) => {
    try{
        if(!req.body.text) {
            return res.status(201).json({
                status: 'error',
                message: 'you must write something!'
            })
        }
        const text = await Text.create({body: req.body.text})
        return res.status(201).json({
            status: 'success',
            data : text
        })
    }catch(err){
        return res.status(400).json({
            status: 'error',
            err
        })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res)=> {
    console.log(`app running on port : ${PORT}`)
})