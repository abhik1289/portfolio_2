const express = require("express");
const router = express.Router();
const fetchUser = require("../../middleware/fetchuser");
const blogPost = require("../../Model/BlogPost");
const fileUpload = require('express-fileupload');
router.use(fileUpload())
router.get("/displaySpeficBlog", fetchUser, async (req, res) => {
    try {
        const getId = req.user._id;
        const displayBlogs = await blogPost.find({ userId: getId });
        if (displayBlogs) {
            res.status(200).send(displayBlogs);
        } else {
            res.status(401).json({ message: "Problem" });

        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get("/displayBlog", async (req, res) => {
    try {
        const displayBlogs = await blogPost.find();
        res.status(200).send(displayBlogs);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get("/displayBlogForHome", async (req, res) => {
    try {
        const displayBlogs = await blogPost.find().limit(3);
        res.status(200).send(displayBlogs);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get("/edisplayBlog/:id", async (req, res) => {
   
    try {
        const id = req.params.id;
      
        const displayBlogs = await blogPost.findById(id);
        if (!displayBlogs) {
            res.status(401).json({ message: "Problem" });
        } else {
            res.status(200).send(displayBlogs);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete("/delBlog/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const deleteBlog = await blogPost.findByIdAndDelete(getId);

        if (deleteBlog) {
            res.status(200).json({ message: "Delete" });
        } else {
            res.status(400).json({ message: "not Delete" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/showHide/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const deleteBlog = await blogPost.findById(getId);
        if (deleteBlog) {
            if (deleteBlog.vissable) {
                const update = await blogPost.updateMany({ _id: getId }, {
                    lastModify: new Date().toLocaleDateString(),
                    vissable: false
                });
                if (update) {
                    res.status(200).json({ message: "Hide" });
                } else {
                    res.status(200).json({ message: "Problem" });
                }
            } else {
                const update = await blogPost.updateMany({ _id: getId }, {
                    lastModify: new Date().toLocaleDateString(),
                    vissable: true
                });
                if (update) {
                    res.status(200).json({ message: "show" });
                } else {
                    res.status(200).json({ message: "Problem" });
                }
            }
        } else {
            res.status(400).json({ message: "not Delete" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/lock/:id", async (req, res) => {
    try {
        const getId = req.params.id;

        const deleteBlog = await blogPost.findById(getId);
        if (deleteBlog) {
            if (deleteBlog.lock) {
                const update = await blogPost.updateMany({ _id: getId }, {
                    lastModify: new Date().toLocaleDateString(),
                    lock: false
                });
                if (update) {
                    res.status(200).json({ message: "unlock" });
                } else {
                    res.status(200).json({ message: "Problem" });
                }
            } else {
                const update = await blogPost.updateMany({ _id: getId }, {
                    lastModify: new Date().toLocaleDateString(),
                    lock: true
                });
                if (update) {
                    res.status(200).json({ message: "lock" });
                } else {
                    res.status(200).json({ message: "Problem" });
                }
            }
        } else {
            res.status(400).json({ message: "not Delete" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/upBlog/:id", async (req, res) => {
    try {
     
        const { text,title } = req.body;
        const getId = req.params.id;
        if (!text||!title) {
            res.status(400).json({ message: "Invalid" });
        }else{
            if(req.files){
                const file = req.files.file;
                const fName = Date.now() + file.name;
                const updateBlog = await blogPost.updateMany({ _id: getId }, {
                    file:fName,
                    title,text, lastModify: new Date().toLocaleDateString()
                 });
                 if(updateBlog){
                    file.mv("./images/" + fName, function (error) {
                        if (error) {
                            res.send(error)
                        } else {
                            res.status(200).json({ message: "Data saved" })
                        }
                    })
                 }
            }else{
                const updateBlog = await blogPost.updateMany({ _id: getId }, {
                   title,text, lastModify: new Date().toLocaleDateString()
                });
                if (updateBlog) {
                    res.status(200).json({ message: "Delete" });
                } else {
                    res.status(200).json({ message: "not Delete" });
                }
            }
        }
       
        
    } catch (error) {
        console.log(error)
    }
});
router.post("/postBlog", fetchUser, async (req, res) => {
    const decode = req.user;
    const getId = decode._id;
    const { text,title } = req.body;
    console.log(req.files)
    if (!text || !title && req.files) {
        res.status(400).json({ message: "Invalid" });
    } else {
        const file = req.files.file;
        const fName = Date.now() + file.name;
        const saveBlog = blogPost({ text,title, userId: getId, file: fName });
        saveBlog.save().then(() => {
            file.mv("./images/" + fName, function (error) {
                if (error) {
                    res.send(error)
                } else {
                    res.status(200).json({ message: "Data saved" })
                }
            })
        })
    }
})
module.exports = router;