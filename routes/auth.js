const express = require('express')
const router = express.Router()
const User = require("../models/user")
var bcrypt = require('bcryptjs');

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body
        const hashpassword = bcrypt.hashSync(password)
        const user = new User({ email:email, username:username, password:hashpassword })
        await user.save().then(()=>res.status(200).json({ message: "Signup succesfull"}))
    } catch (error) {
        res.status(200).json({ message: "Invalid" })
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(200).json({message:"Please signup first"})
        }
        const isPasswordCorrect = bcrypt.compareSync (req.body.password,user.password)
        if(!isPasswordCorrect){
            res.status(200).json({message:"Invalid credentials"}) 
        }
        const {password,...others} = user._doc;
        res.status(200).json({ id: others._id });
    } catch (error) {
        res.status(200).json({ message: "Invalid Credentials" })
    }
})


module.exports = router
