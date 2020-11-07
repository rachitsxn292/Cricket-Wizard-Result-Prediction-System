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
const Data = require("./models/data");

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
        email: req.body.email,
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

app.post('/userData', (req,res) => {
    console.log('inside userData',req.body.email);
    const {spawn} = require('child_process');
    console.log('after spawn');
    
    const email = req.body.email;
    let runs = req.body.runs;
    let wickets = req.body.wickets; 
    let overs = req.body.overs;
    let striker_run =  req.body.striker;
    let non_striker_run = req.body.nstriker;
    let last_run = req.body.last_run;
    let last_wickets = req.body.last_wickets;
    let predicted_score;
    //const python = await spawn('python', ['C:/Users/admin/Desktop/Cricket-Wizard-Result-Prediction-System-master/src/server/script.py', req.body.runs, req.body.wickets, req.body.overs, req.body.striker, req.body.nstriker]);
    const python =  spawn('python', ['/Users/rachitsaxena/Desktop/CMPE-295A/src/server/script.py', req.body.runs, req.body.wickets, req.body.overs, req.body.striker, req.body.nstriker]);
    console.log('after python file is called');
    python.stderr.pipe(process.stderr);
    python.stdout.on('data', async function (data) {
        dataToSend = data.toString();
        predicted_score = dataToSend.split("[")[1].split("]")[0];
        console.log("predicted_score: ", predicted_score)
        let dta = new Data({
            email,
            runs,
            wickets,
            overs,
            striker_run,
            non_striker_run,
            last_run,
            last_wickets,
            predicted_score
        });
        dta.save();
        console.log("user_id: ", email)
        let records = await Data.find({email});
        //console.log(records);
        res.send(records);
        console.log("recods: ", records)
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });

})

//Get Visualization Data
app.get('/getDataVisual', async(req, res) => {
    const email = req.query.email;
    let records = await Data.find({email});
    console.log("records: ", records);
    console.log("Email in Visual Backend",email)
    res.send(records);
})

//Login API
app.post('/login', async (req,res) => {
    try{
        console.log("req.body.id: ",req.body.id)
        const email = req.body.id;
        const password = req.body.pwd;
        const user = await UserSchema.findOne({ email });
        if(!user){
            res.status(400).json("user doesn't exist!!");
        }else{
          const imatch = await bcrypt.compare(password, user.password);
          if(!imatch){
              console.log("invalid password");
              res.status(400).json("invalid password");
          }
          else{
              console.log("User login successful");
              res.status(200).send("User login successful")
          }
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json('server error');
    }
})

app.post('/premium', (req,res) => {
    console.log('inside userData');
    const {spawn} = require('child_process');
    console.log('after spawn');
    

    const python =  spawn('python', ['/Users/rachitsaxena/Desktop/CMPE-295A/src/server/Final model.py', req.body.team1, req.body.team2, req.body.city, req.body.toss, req.body.bteam, req.body.venue, req.body.winner]);
    console.log('after python file is called');
    python.stderr.pipe(process.stderr);
    python.stdout.on('data', async function (data) {
        dataToSend = data.toString();
        console.log("prediction in premium: ", dataToSend)
        res.send(dataToSend);
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });

})

app.post("/promocode", (req, res) => {
    var arr = ["CRICWIZ15698", "CRICWIZ12848", "CRICWIZ17392", "CRICWIZ4558", "CRICWIZ1325"]
    var flag = false;
    for(i=0; i < arr.length; i++){
        if (req.body.promo == arr[i]){
            flag = true;
            break;
        }
    }
    if(flag == true){
        res.status(200).json("Promcode applied succesfully");
        console.log("Successfull Promo");
    }
    else{
        res.status(400).json("invalid promocode");
    }
})


app.listen(3001);
console.log("Server running 3001");
module.exports = app;