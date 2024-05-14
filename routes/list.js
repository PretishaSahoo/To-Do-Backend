const express = require('express')
const router = express.Router()
const User = require("../models/user")
const List = require ("../models/list")

//CREATE
router.post("/addTask" , async(req,res) =>{
    try {
        const {title,body,id} = req.body
        const existingUser = await User.findById(id)
        if(!existingUser){
            res.status(400).json({message:"cant add Task"})
        }
        const list = new List({title,body,user:existingUser})
        await list.save()
        existingUser.list.push(list)
        existingUser.save()
        res.status(200).json(list)
    }
    catch (error) {
        res.status(400).json({message:"Internal Server Error"})
    }
})

//READ
router.get("/getTasks/:id" , async(req,res) =>{
    try {
        const list = await List.find({user:req.params.id})
        res.status(200).json({"list" : list})
    }
    catch (error) {
        res.status(400).json({message:"Internal Server Error"})
    }
})

// UPDATE
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.body.userId; 

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(400).json({ message: "Can't update Task" });
        }

        const list = await List.findByIdAndUpdate(req.params.id, { title, body });
        if (!list) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task Updated" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//DELETE
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const userId = req.body.userId; 
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(400).json({ message: "Failed" });
        }
        const list = await List.findByIdAndDelete(req.params.id);
        if (!list) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted" });
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
