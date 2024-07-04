const express = require("express");
const router = express.Router();
const user = require('../Model/user');

router.post("/changeRoll/:id", async (req, res) => {
    const id = req.params.id;
  
    const { roll } = req.body;
    console.log("roll is",roll,id)
    try {
        if (!roll) {
            res.status(400).json({ message: "Invalid" });
        }
        const updateRoll = await user.updateOne({ _id: id }, {
            roll
        });
        if (updateRoll) {
            res.status(200).json({ message: "Roll Upadated" });
        } else {
            res.status(200).json({ message: "Roll not Upadated" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get("/displayUser", async (req, res) => {
    
    try {
      const users= await user.find();
      if(users){
          res.status(200).send(users);
      }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/blockUser/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const getUser = await user.findById(id);
      
      if(getUser){
          if(getUser.block){
          const update =await user.updateOne({ _id: id }, {
                block:false
            });
            if(update){
                res.status(200).json({ message: "Block" });
            }else{
                res.status(400).send(error);
            }
          }else{
           const update = await user.updateOne({ _id: id }, {
                block:true
            });
            if(update){
                res.status(200).json({ message: "Block" });
            }else{
                res.status(400).send(error);
            }
          }
      }else{
        res.status(400).json({ message: "Invalid" });

      }
       
       
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete("/delUser/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      
        const deleteUser = await user.findByIdAndDelete(id)
        if (deleteUser) {
            res.status(200).json({ message: "Roll Upadated" });
        } else {
            res.status(200).json({ message: "Roll not Upadated" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router