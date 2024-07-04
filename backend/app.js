const express = require('express')
const app = express()
const port = 5000
require('./DB/connect');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
require('dotenv').config()
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/order',require('./routes/order'));
app.use('/api/admin',require('./routes/admin'));
app.use('/api/socalMedia',require('./routes/basic'));
app.use('/api/blog',require('./routes/BlogCURD/blog'));





app.use('/images', express.static('images'));
// app.post("/orderRequest",(req,res)=>{
//     const {name,email,message,type} = req.body;
//     if(!name||!email||!message||!type){
//         res.
//     }
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))