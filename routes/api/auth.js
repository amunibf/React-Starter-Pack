const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User')

router.post('/',(req,res)=>{
    const { email, password } = req.body

    //simple validation
    if( !email || !password){
        return res.status(400).json({ msg : 'Please enter all fields'})
    }

    //check for existing user
    User.findOne({ email })
    .then(user=>{
        if(!user) return res.status(400).json({ msg : 'User does not exists'})
        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({ msg : "Invalid Credentials"})
            jwt.sign(
                { id : user._id },
                Buffer.from(config.get('jwtSecret'),"base64")/*new Buffer.from(config.get('jwtSecret'),"base64")*/,
                (err, token)=>{
                    if(err) throw err
                    res.json({
                        token,
                        user : {
                            id : user._id,
                            name : user.name,
                            email : user.email
                        }
                    })
                }
            )
        })
    })
})

router.get('/user', auth, (req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user))
})


module.exports = router