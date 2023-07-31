const User = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) =>{
    const users = await User.find().select("-passwordHash");

    if(!users){
        res.status(400).send("No users found :/");

    }
    res.send(users);


})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select("-passwordHash")
    if(!user){
        res.status(400).send("No user found :/");

    }
    res.send(user);
})

router.post('/register', async(req,res)=>{
    let user = new User({
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.password),
        isAdmin:req.body.isAdmin
    })

    user =  await user.save();

    if(!user){
        return res.status(400).send('User cannot be created :/');
    }

    res.send(user);

})

router.put('/:id', async (req,res)=>{

    const userInfo = await User.findById(req.params.id);
    let newPassword;

    if(req.body.password){
        newPassword = bcrypt.hashSync(req.body.password);
    }
    else{
        newPassword = userInfo.passwordHash;
    }

    const user = await User.findByIdAndUpdate(

        req.params.id,
        {
            
            email:req.body.email,
            passwordHash:newPassword,
            isAdmin:req.body.isAdmin
        },
        {
            new:true
        }
    )

    if(!user){
        return res.status.send(400).send("No user found :/");
    }
    res.send(user);
    
})

router.post('/login', async (req,res)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send("Invalid email");
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign({
            userId:user._id,
            isAdmin:user.isAdmin
        }, process.env.secret,
        {expiresIn: '1d'});

        return res.status(200).json({
            user:user.email,
            token:token
        })
    }else{
        return res.status(400).send("Invalid email or password :/");
    }

})

module.exports = router;
