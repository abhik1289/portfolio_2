const express = require("express");
const router = express.Router();
const user = require('../Model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const fileUpload = require('express-fileupload');
const fetchUser = require("../middleware/fetchuser");
router.use(fileUpload());
router.post('/adduser', async (req, res) => {
    try {
        const { name, email, mobile, roll, gender, password } = req.body;
        if (!name || !email || !mobile || !roll || !gender || !password) {
            res.send(400).json({ message: "Invalid Data" });
        } else {
            const Chkemail = await user.findOne({ email });
            if (Chkemail) {
                res.send(400).json({ message: "Your email alreay exits" });
            } else {
                let hashPwd = await bcrypt.hash(password, 10);
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 5; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                const data = new user({ name, email, mobile, roll, gender, password: hashPwd, otp: OTP, token: '' });
                data.save().then(async () => {
                    let updateToken = jwt.sign({ _id: data._id }, SECRET_KEY);
                    user.updateOne({ _id: data._id }, {
                        token: updateToken
                    }).then(() => {
                        res.status(200).json({ message: "Data saved" });
                    }).catch((error) => {
                        res.status(400).json({ message: "Data not saved", error });
                    })
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
});
router.get("/fetchUser", fetchUser, async (req, res) => {
    try {
        const decode = req.user;
        const findUser = await user.findOne({ _id: decode._id });
        if (findUser) {
            res.status(200).send(findUser);
        } else {
            res.status(400).json({ message: "wrong user" });
        }
    } catch (error) {

    }
});
router.get("/fetchUser/:id", async (req, res) => {
    try {
        const getid= req.params.id;
        const findUser = await user.findOne({ _id: getid });
        if (findUser) {
            res.status(200).send(findUser);
        } else {
            res.status(400).json({ message: "wrong user" });
        }
    } catch (error) {

    }
})
router.post("/fetchUserRoll", fetchUser, async (req, res) => {
    try {
        const {id} = req.body;
        if(id){
            const checkuser = await user.findById(id);
            console.log(checkuser)
            if(checkuser){
               
                    res.status(200).send(checkuser);
               
            }else{
                res.status(401).json({ message: "Problem" })

            }
        }
       
    } catch (error) {

    }
})
router.post("/activeUser", async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400).json({ message: "Invalid" });
        } else {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                const getOtp = await checkEmail.otp;
                const getId = await checkEmail._id;
                if (getOtp == otp) {
                    user.updateOne({ _id: getId }, {
                        active: "active"
                    }).then(() => {
                        res.status(200).json({ message: "account active" })
                    }).catch((error) => {
                        res.status(401).json({ message: error })
                    });
                } else {
                    res.status(401).json({ message: "wrong otp" })
                }
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email || password) {
            const checkEmail = await user.findOne({ email });
            if (checkEmail) {
                // console.log(checkEmail)
                const getPassword = await checkEmail.password;
                const getactive = await checkEmail.active;
                const block = await checkEmail.block;

                const token = jwt.sign({
                    _id: checkEmail._id
                }, SECRET_KEY);


                const checkPassword = await bcrypt.compare(password, getPassword);
                console.log(checkPassword)

                if (checkPassword && getactive == "active"&&block==false) {

                    res.cookie("jwtoken", token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1 * 24 * 3600 * 1000)
                    });
                    res.status(200).send(checkEmail)
                } else {
                    res.status(401).json({ message: "Wrong Password" });


                }
            } else {
                res.status(401).json({ message: "Your Account not find" });
            }
        } else {
            res.status(400).json({ message: "Invalid Data" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/editUser", fetchUser, async (req, res) => {


    try {
        const { name, mobile, gender } = req.body;
        console.log(req.body)
        const decode = req.user;
        let storeId = decode._id;


        const checkuser = await user.findById(storeId);
        if (checkuser) {
            if (req.files) {
                let file = req.files.file;
                let fname = Date.now() + file.name;
                if (!name || !mobile || !gender) {
                    res.status(400).json({ message: "invalid" });
                } else {

                    const update = await user.updateMany({ _id: storeId }, {
                        name, mobile, gender,
                        file: fname,
                        lastModify: new Date().toLocaleDateString()
                    });
                    if (update) {


                        file.mv("./images/" + fname, function (error) {
                            if (error) {
                                res.send(error)
                            } else {
                                res.status(200).send(update)
                            }
                        })
                    } else {
                        res.status(400).json({ message: "not update" });
                    }
                }
              
            } else {
                if (!name || !mobile || !gender) {
                    res.status(400).json({ message: "invalid" });
                } else {
                    const update = await user.updateMany({ _id: storeId }, {
                        name, mobile, gender,
                        lastModify: new Date().toLocaleDateString()
                    });
                    if (update) {
                        res.status(200).send(update)
                    } else {
                        res.status(400).json({ message: "not update" });
                    }
                }
            }
        } else {
            res.status(400).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.put("/changePwd", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(password)

        if (email || password) {
            const checkEmail = await user.findOne({ email });
            if (!email) {
                res.status(401).json({ message: "Invalid" })
            }
            let getId = await checkEmail._id;
            console.log(checkEmail)
            const hashPwd = await bcrypt.hash(password, 10);
            console.log(hashPwd)
            const update = await user.updateMany({ _id: getId }, {
                password: hashPwd, lastModify: new Date().toLocaleDateString()
            });
            console.log(update)
            if (update) {
                res.status(200).json({ message: "password changed" })
            } else {
                res.status(400).json({ message: "not update" });
            }
        } else {
            res.status(400).json({ message: "Invalid" });

        }

    } catch (error) {
        res.status(500).send(error);
    }
})
router.get("/logout", (req, res) => {
    try {
        res.clearCookie("jwtoken", { httpOnly: true, path: '/' });
        res.status(200).json({ message: "Log out successfully" })
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;
