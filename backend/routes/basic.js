const express = require("express");
const router = express.Router();
const socal = require('../Model/socalMedia');
const fileUpload = require('express-fileupload');
router.use(fileUpload())


router.post("/socalLinks", async (req, res) => {
    const { fburl, fbname, twurl, twname, inurl, inname, title, favicon, logo } = req.body;
    if (fburl || fbname || twurl || twname || inurl || inname) {
        const link = socal({ fburl, fbname, twurl, twname, inurl, inname, title, favicon, logo });
        link.save().then(() => {
            res.status(200).json({ message: "Saved" })

        }).catch(() => {
            res.status(401).json({ message: "not Saved" })
        })
    } else {
        res.status(400).json({ message: "Invalid" })
    }
})



router.put("/editLinks/:id", async (req, res) => {
    const getId = req.params.id;
    try {

        const fetchData = await socal.findById(getId);
        if (fetchData) {
            const { fb, tw, insUrl, title } = req.body;
            if (fb || tw || insUrl||title) {
                if (req.files) {
                    if (req.files.logo && req.files.favicon) {
                        const logo = req.files.logo;
                        const favicon = req.files.favicon;
                        const logoName = Date.now() + logo.name;
                        const favName = Date.now() + favicon.name;
                        const UpOrder = await socal.updateMany({ _id: getId }, {
                            twurl: tw, inurl: insUrl, fburl: fb, logo: logoName, favicon: favName, title
                        });
                        if (UpOrder) {
                            favicon.mv("./images/" + favName, function (error) {
                                if (error) {

                                 res.send(error)

                                } else {
                   

                         logo.mv("./images/" + logoName, function (error) {
                                        if (error) {
                                            res.send(error)
                                        } else {
                                            res.status(200).json({ message: "Data saved" })
                                        }
                                    })
                                }
                            })
                        } else {
                            res.status(401).json({ message: "Not Updated" });
                        }
                    } else if (req.files.logo) {
                        const logo = req.files.logo;
                        const logoName = Date.now() + logo.name;
                        const UpOrder = await socal.updateMany({ _id: getId }, {
                            twurl: tw, inurl: insUrl, fburl: fb, logo: logoName, title
                        });
                        if (UpOrder) {
                            logo.mv("./images/" + logoName, function (error) {
                                if (error) {
                                    res.send(error)
                                } else {
                                    res.status(200).json({ message: "Data saved" })
                                }
                            })
                        } else {
                            res.status(401).json({ message: "Not Updated" });
                        }
                    } else if (req.files.favicon) {
                        console.log("fav")
                        const favicon = req.files.favicon;
                        const favName = Date.now() + favicon.name;
                        const UpOrder = await socal.updateMany({ _id: getId }, {
                            twurl: tw, inurl: insUrl, fburl: fb, favicon: favName, title
                        });
                        if (UpOrder) {
                       
                            favicon.mv("./images/" + favName, function (error) {
                                if (error) {
                                    console.log("hello e")
                                    res.send(error)
                                } else {
                                    console.log("hello o")
                                    res.status(200).json({ message: "Data saved" })
                                }
                            })
                        } else {
                            res.status(401).json({ message: "Not Updated" });
                        }
                    }
                } else {
                    const UpOrder = await socal.updateMany({ _id: getId }, {
                        twurl: tw, inurl: insUrl, fburl: fb, title
                    });
                    if (UpOrder) {
                        res.status(200).json({ message: "Data saved" })
                    } else {
                        res.status(401).json({ message: "Not Updated" });
                    }
                }
            } else {
                res.status(401).json({ message: "Invalid" })
            }
        } else {
            res.status(401).json({ message: "Not find" })
        }
    } catch (error) {
        res.status(500).send(error)
    }
});




router.get("/displayLinks", async (req, res) => {
    const links = await socal.findOne();
    if (links) {
        res.status(200).send(links)
    } else {
        res.status(400).json({ message: "Invalid" })
    }
})
router.post("/title", async (req, res) => {
    const links = await socal.findOne();
    if (links) {
        res.status(200).send(links)
    } else {
        res.status(400).json({ message: "Invalid" })
    }
})
module.exports = router;