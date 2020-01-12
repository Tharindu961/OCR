const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');



const userRoutes = require('./api/routes/users');

//mongoose.connect('mongodb://test:' + process.env.MONGO_ATLAS_PW + '@cluster0-shard-00-00-0c64g.mongodb.net:27017,cluster0-shard-00-01-0c64g.mongodb.net:27017,cluster0-shard-00-02-0c64g.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
// mongoose.connect('mongodb+srv://test:' + process.env.MONGO_ATLAS_PW + '@cluster0-0c64g.mongodb.net/test?retryWrites=true&w=majority',
mongoose.connect('mongodb://localhost:27017/ocr',

{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useMongoClient: true
    

});

mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));  
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); 
});

//Routes should handle request

app.use('/user', userRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;