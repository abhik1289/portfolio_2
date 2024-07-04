const express = require("express");
const router = express.Router();
const order = require("../Model/Request");
const fileUpload = require('express-fileupload');
router.use(fileUpload())
router.get("/graph", async (req, res) => {
    try {
        const aws = await order.find({type:"aws"});
        const ui = await order.find({type:"ui-ux"});
        const web = await order.find({type:"web"});


        const app = await order.find({type:"app"});
        let awsl,uil,webl,appl;
        awsl = aws.length;
        uil = ui.length;
        webl = web.length;
        appl = app.length;
       
        res.status(200).json({awsl,uil,appl,webl})
    } catch (error) {
        res.send(error);
    }
})
router.post("/sendOrder", (req, res) => {
    const { name, email, message, type } = req.body;
    try {
      
       if(req.files){
           console.log("file")
            if (name || email || message || type) {
                const file = req.files.file;
            const fName = Date.now() + file.name;
            const data = order({ name, email, message, type, file: fName });
            data.save().then((res) => {
                res.status(200).json({ message: "Data saved" });
                file.mv("./images/" + fName, function (error) {
                    if (error) {
                        res.send(error)
                    } else {
                        res.status(200).json({ message: "Data saved" })
                    }
                })
            }).catch((error) => {
                res.status(400).send(error)
            })
        } else {
            res.status(400).json({ message: "Invalid" })
        }
       }else{
        console.log("file n")

        if (name || email || message || type) {
           
            const data = order({ name, email, message, type });
            data.save().then(() => {
                res.status(200).json({ message: "Save"});
               
                
            }).catch((error) => {
                res.status(400).send(error);
                console.log(error)
            })
        } else {
            res.status(400).json({ message: "Invalid" })
        }
       }
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
});
router.post("/editOrder/:id",async (req, res) => {
    try {
        const getId = req.params.id;
        console.log(getId)
        const { name, email, message, type,complete } = req.body;
        console.log( name, email, message, type,complete)

        if(req.files){
            const file = req.files.file;
            const fName = Date.now() + file.name+req.body.email;
            if(name||email||message||type||complete){
              const UpOrder = await  order.updateMany({ _id: getId }, {
                    name, email, message, type, file: fName,complete
                });
                if(UpOrder){
                res.status(200).json({ message: "Updated"});
                }else{
                res.status(401).json({ message: "Not Updated"});
                }
            }else{
                res.status(400).json({ message: "Invalid"});
            }
        }else{
            if(name||email||message||type||complete){
                const UpOrder = await order.updateMany({ _id: getId }, {
                    name, email, message, type,complete
                });
                if(UpOrder){
                    res.status(200).json({ message: "Updated"});
                    }else{
                    res.status(401).json({ message: "Not Updated"});
                    }
            }else{
                res.status(400).json({ message: "Invalid"});
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get("/displayOrder", async (req, res) => {
    try {
        const displayOrder = await order.find();
        if (displayOrder) {
            res.status(200).send(displayOrder);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/searchOrder/:search", async (req, res) => {
    let serachResult = req.params.search;
  
      try {
  if(serachResult!=""){
    const displayOrder = await order.find( { name: {$regex:new RegExp([serachResult])}} )
    if (displayOrder) {
        res.status(200).send(displayOrder);
    }
  }else{
    const displayOrder = await order.find()
    console.log(displayOrder)
    if (displayOrder) {
        res.status(200).send(displayOrder);
    }
  }
          
      } catch (error) {
          res.status(500).send(error);
      }
  });
  router.post("/serchCategory/:categorySearch", async (req, res) => {
    let serachResult = req.params.categorySearch;
  console.log(serachResult)
      try {
  if(serachResult!=""){
      if(serachResult=="all"){
        const displayOrder = await order.find();
        if (displayOrder) {
           res.status(200).send(displayOrder);
        }else{
            res.status(401).json({ message: "Not Updated"});
        }
      }else{
        const displayOrder = await order.find( { type: serachResult} )
        if (displayOrder) {
            res.status(200).send(displayOrder);
        }
      }
  }     
      } catch (error) {
          res.status(500).send(error);
      }
  });
router.get("/displaySeficOrder/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const displayOrder = await order.findById(id);
        if (displayOrder) {
            res.status(200).send(displayOrder);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete("/delOrder/:id", (req, res) => {
    try {
        const getId = req.params.id;
        order.findByIdAndDelete(getId).then(() => {
            res.status(200).json({ message: "Data Deleted" });
        }).catch((error) => {
            res.status(400).json({ message: "Data not Deleted", error });
        })
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/confirmOrder/:id",async (req, res) => {
    try {
        const getId = req.params.id;
       const CheckOrder = await order.findById(getId);
       if(CheckOrder){
           const upOrder = await order.updateOne({_id:getId},{
            conformed:true,
           });
           if(upOrder){
            res.status(200).json({ message: "Order Confirmed" });
           }else{
            res.status(400).json({ message: "Problem" });
           }
       }
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router