const express = require('express')
const port = 8000
const app = express()
const path = require('path');
const db = require('./config/db')


app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', require('./routes/index'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/public',express.static(path.join(__dirname,'public')))


app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server Was Running...`);
})