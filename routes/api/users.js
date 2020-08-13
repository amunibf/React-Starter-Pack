const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User')

router.post('/',(req,res)=>{
    const { name, email, password } = req.body

    //simple validation
    if(!name || !email || !password){
        return res.status(400).json({ msg : 'Please enter all fields'})
    }

    //check for existing user
    User.findOne({ email })
    .then(user=>{
        if(user) return res.status(400).json({ msg : 'User already exists'})
        
        const newUser = new User({
            name,
            email,
            password
        })

        //create salt and hash
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw (err)
                newUser.password = hash
                newUser.save()
                .then(user=>{

                    jwt.sign(
                        { _id : user._id },
                        config.get('jwtSecret'),
                        (err, token)=>{
                            if(err) throw err
                            res.json({
                                token,
                                user : {
                                    _id : user._id,
                                    name : user.name,
                                    email : user.email
                                }
                            })
                        }
                    )
                })
            })
        })
    })
})

module.exports = router