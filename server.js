const express = require('express');

const app = express();

var session = require('express-session');
// var sessionStore = new session.MemoryStore;
// app.use(session({
//     cookie: { maxAge: 60000 },
//     store: sessionStore,
//     saveUninitialized: true,
//     resave: true,
//     secret: 'secret'
// }));

const mongoose = require('mongoose');

const MongoStore = require('connect-mongo')(session);
app.use(session({
    cookie: { maxAge: 6000000, secure: false },
    // store: sessionStore,
    httpOnly: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    secret: 'asdfgasdfg'
}));

mongoose.connect('mongodb://localhost/belt2');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');

app.use(bodyParser.json())

const path = require('path');

var user_id = 1;
var user_name = "Nick";

app.use(express.static(path.join(__dirname, '/public/dist')));

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}

}, {timestamps: true });

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

var PollSchema = new mongoose.Schema({
    question: {type: String, required : true},
    option1: {type: String, required : true},
    option1Votes: {type: Number, required: true},
    option2: {type: String, required : true},
    option2Votes: {type: Number, required: true},
    option3: {type: String, required: true},
    option3Votes: {type: Number, required: true},
    option4: {type: String, required: true},
    option4Votes: {type: Number, required: true},
    user_id: {type: String, required: true},
    user_name: {type: String, required: true}

}, {timestamps: true });

mongoose.model('Poll', PollSchema);
var Poll = mongoose.model('Poll');

// Routes

app.get('/setS', function(req, res){
    req.session.uid = 10;
    console.log(req.session);
    return res.json(req.session);
})


app.get('/getS', function(req, res){
    console.log(req.session);
    return res.json(req.session);
})

// Creates new user
app.post('/createUser', (req, res, next) => {
    console.log('CREATEUSER -- ',req.session)
    new User(req.body).save()
    .then((user) => {
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@ CREATED USER  /createUser', req.session)
        req.session.name = user.name;
        req.session.user_id = user._id;
        // console.log(req.session.name)
        // console.log(req.session.user_id)
        // console.log('/createUser', req.session)
        res.json(true);
    }).catch((err) => {
        // console.log(err, "@@@@@@@@@@@@ DID NOT CRAETE USER")
        res.json(err);
    });
});

// Creates new poll
app.post('/createPoll', (req, res, next) => {
    // console.log(req)
    // console.log("AAAAAAAAAAAAAA CREATE PULL AFTER USER CREATED ", req.session.user_id);
    
    // return res.json(req.session.uid)
    let newPoll = new Poll(req.body);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@ /createPoll > req.session', req.session)
    newPoll.user_id = user_id;
    newPoll.user_name = user_name;
    console.log(req.session)
    newPoll.save()
    .then((poll) => {
        console.log(poll)
        res.json(true);
    }).catch((err) => {
        console.log(err, "@@@@@@@@@@@@")
        res.json(err);
    });
});

// Retrieves all of the polls.
app.get('/getPolls', (req, res, next) => {
    Poll.find({}, (err, polls) => {
        if(err) {
            res.json(err);
        }else {
            res.json(polls);
        }
    }).sort({createdAt: -1})
});

// Gets the logged in user.
app.get('/getCurrentUser', (req, res, next) => {
    let current = {
                id: user_id,
                name: user_name
            }
    res.json(current);
    // if(req.session.user_id) {
    //     let current = {
    //         id: req.session.user_id,
    //         name: req.session.name
    //     }
    //     res.json(current);
    // }else {
    //     res.status(418).json({error: "Login to view that page."})
    // }
});

// Finds a poll by the id.
app.post('/findPoll', (req, res, next) => {
    Poll.findById(req.body.pollId)
    .then(poll => {
        res.json(poll);
    }).catch(err => {
        res.status(418).json(err);
    })
});

// Updates the poll vote counts.
app.post('/updatePoll', (req, res, next) => {
    if(req.body.option == 1) {
        Poll.findByIdAndUpdate(req.body.pollId, {$inc: {option1Votes:1}})
        .then(poll => {
            res.json(poll);
        }).catch(err => {
            res.status(418).json(err);
        })
    }else if(req.body.option == 2) {
        Poll.findByIdAndUpdate(req.body.pollId, {$inc: {option2Votes:1}})
        .then(poll => {
            res.json(poll);
        }).catch(err => {
            res.status(418).json(err);
        })
    }else if(req.body.option == 3) {
        Poll.findByIdAndUpdate(req.body.pollId, {$inc: {option3Votes:1}})
        .then(poll => {
            res.json(poll);
        }).catch(err => {
            res.status(418).json(err);
        })
    }else{
        Poll.findByIdAndUpdate(req.body.pollId, {$inc: {option4Votes:1}})
        .then(poll => {
            res.json(poll);
        }).catch(err => {
            res.status(418).json(err);
        })
    }
});

//Logout
app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.json(true);
});

//Deletes poll
app.post('/delete', (req, res, next) => {
    Poll.remove({_id: req.body._id}, err => {
        if(err) {
            console.log(err);
        }
    })
})

// Redirects to angular components.
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
