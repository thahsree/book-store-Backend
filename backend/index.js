const express = require('express')
const app = express();
const PORT = require('./connections/port')
const mongoDBUrl = require('./connections/db');
const booksRoute = require('./routes/booksRoute') 
const mongoose = require('mongoose')
const cors = require('cors')

//middleware for parsing request body
app.use(express.json())

//********************** middleware for handling CORS policy **************************
//allows every origins
app.use(cors())

//Allows custom origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['POST','GET','DELETE','PUT'],
//     allowedHeaders:['Content-Type']
// }))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/books',booksRoute)

//connect database
mongoose.connect(mongoDBUrl)
.then(()=>{
    console.log('Database Connected');
    app.listen(PORT,()=>{
        console.log("Connected to PORT:5555");
    })
})
.catch((err)=>{
    console.log(err);
})