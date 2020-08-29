var express = require('express');

var app = express();

var cors = require('cors');

var md5 = require('md5')

var bcrypt = require('bcrypt');

const saltRounds = 10;

var session = require('express-session');

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));

var mongoose=require('mongoose');

app.use(session({
    secret: 'Wizard',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

//MongoDB Connection String
mongoConnectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0-gcjjd.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

//UserSchema Import
const UserSchema = require('./models/UserSchema');

//Default API
app.get('/',(req,res)=>{
    res.status(200).send('Hi Welcome to Application Backend')
})

//Signup API
app.post("/signup",(req,res)=>{
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
    var newUser = new UserSchema({
        name: req.body.email,
        password: hash
    });
    newUser
        .save()
        .then(()=>{
            res.status(200).send(newUser);
        })
        .catch(err=>{
            console.log("Error is", err.message);
        });
    });
});

app.post('/userData', async (req,res) => {
    console.log('inside userData');
    const {spawn} = require('child_process');
    console.log('after spawn');
    
    //const python = await spawn('python', ['C:/Users/admin/Desktop/Cricket-Wizard-Result-Prediction-System-master/src/server/script.py', req.body.runs, req.body.wickets, req.body.overs, req.body.striker, req.body.nstriker]);
    const python = await spawn('python', ['C:/Users/admin/Documents/CMPE-295A/src/server/script.py', req.body.runs, req.body.wickets, req.body.overs, req.body.striker, req.body.nstriker]);
    console.log('after python file is called');
    python.stderr.pipe(process.stderr);
    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        console.log('dataToSend', dataToSend);
        res.send(dataToSend)
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        
    });

})

//Login API


app.listen(3001);
console.log("Server running 3001");
module.exports = app;