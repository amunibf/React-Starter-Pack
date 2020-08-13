const express = require('express');
const mongoose = require('mongoose');
const item = require('./routes/api/Items')
const cors = require('cors');
const path = require('path');
const config = require('config');

const app = express()
app.use(express.json())
app.use(cors())

const db = config.get('mongoURI')

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true})
.then(()=>console.log('MongoDB Connected...'))
.catch((err)=>console.log(err))

app.use('/api/items', item)
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

if(process.env.NODE_ENV){
    app.use(express.static('dist'))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'dist','index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, ()=>console.log(`Server started on port ${port}`))
