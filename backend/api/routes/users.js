const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Tesseract = require('tesseract.js');


const User = require("../models/user");

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User Created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
             }
                
            });

            }
        })
        


});

router.post('/login', (req, res, next) => {
    //console.log('sss');
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if(user){
                console.log("UserOk")
            }
            if (user.length < 1) {
                return res.status(401).json({
                    "message": 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result) {

                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }

                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        flag: true,
                       
                    });
                }
                    return res.status(401).json({
                        message: 'Auth failed',
                        flag : false
                    });
            });

        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                "error": err
            });
        });
});

router.delete('/:userId', (req, res, next) => {    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`);
    }
});

var upload = multer({storage: storage});

router.post('/image',upload.single('file'),(req,res,next) => {
        const file = req.file;

        Tesseract.recognize(
            `./uploads/${file.originalname}`,
            'eng',
            { logger: m => console.log(m.progress) }
          ).then(({ data: { text } }) => {
            res.status(200).json({
                message : text
            });
          })


       
});




module.exports = router;