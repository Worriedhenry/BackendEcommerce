const Buyer = require("../models/buyer");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.home = (req, res) => {
  res.render("home", { title: "home" });
};

module.exports.get = (req, res) => {
  res.send("working");
};

module.exports.register = async (req, res) => {
  try {
    const user = await Buyer.findOne({
      $or: [
        { Phone: req.body.Phone },
        { Email: req.body.Phone }
      ]
    });

    if (!user) {
      const newUserFields = {
        FirstName: req.body.FirstName,
        Phone: req.body.Phone,
        Email: req.body.Phone,
        GoogleLogin: req.body.registerType === 1 ? true : false
      };

      const newUser = new Buyer(newUserFields);
      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY);
      return res.status(200).json({ id: newUser._id, token });
    } else {
      return res.status(202).send({ message: "This number is already registered" });
    }
  } catch (err) {
    console.error("Error in registering", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await Buyer.findOne({
      $or: [
        { Phone: req.body.Phone },
        { Email: req.body.Phone }
      ]
    });

    if (user && req.body.loginType === 1) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
      res.cookie("jwt", token);
      return res.status(200).send({ id: user._id, token });
    }

    if (!user && req.body.loginType === 1) {
      const newUser = new Buyer({
        FirstName: req.body.name,
        Phone: req.body.Phone,
        Email: req.body.Phone,
        GoogleLogin: true
      });
      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_KEY);
      return res.status(200).json({ id: newUser._id, token });
    }

    if (user && !user.GoogleLogin) {
      const isMatched = await bcrypt.compare(req.body.Password, user.Password);

      if (isMatched) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        res.cookie("jwt", token);
        return res.status(200).send({ id: user._id, token });
      } else {
        return res.status(202).json({ message: "Phone or Password is incorrect" });
      }
    } else if (user && user.GoogleLogin) {
      return res.json({ error: "Please use Google Login instead" });
    } else {
      return res.json({ error: "Please register" });
    }
  } catch (err) {
    console.error("Error in login", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getprofile = async (req, res) => {
  try {
    const user = await Buyer.findById(req.user._id);

    if (user) {
      return res.status(200).json({
        success: true,
        user
      });
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.error("Error in getting profile", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const Buyer = require("../models/buyer")
// const auth = require("../middleware/auth")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// module.exports.home = function (req, res) {
//     res.render("home", { title: "home" })

// }
// module.exports.get = function (req, res) {
//     res.send("working")
// }
// module.exports.register = async function (req, res) {
//     try {
        
//         let user = await Buyer.findOne({
//             $or: [
//               { Phone: req.body.Phone },
//               { Email: req.body.Phone }
//             ]
//           })
//         if (!user && req.body.registerType==1){
//             const newuser = new Buyer({
//                 FirstName:req.body.FirstName,
//                 Phone:req.body.Phone,
//                 Email:req.body.Phone,
//                 GoogleLogin:false
//             })
//             newuser.save()
//             .then(newuser => {
//                 const token = jwt.sign({ _id: newuser._id }, process.env.JWT_KEY);
//                 res.status(200).json({ id: newuser._id, token })
//             })
//             .catch((err) => {
//                 console.log("Error h bro ", err);
//             })
//         }
//         if (!user) {
//             try {
//                 const { FirstName, LastName, Email, Password, Gender, Cart, Phone } = req.body
//                 bcrypt.hash(Password, 12)
//                     .then((hashedpassword) => {
//                         const newuser = new Buyer({
//                             FirstName,
//                             LastName,
//                             Phone,
//                             Email, 
//                             Gender,
//                             Cart,
//                             Password: hashedpassword,
//                         })
//                         newuser.save()
//                             .then(newuser => {
//                                 const token = jwt.sign({ _id: newuser._id }, process.env.JWT_KEY);
//                                 res.status(200).json({ id: newuser._id, token })
//                             })
//                             .catch((err) => {
//                                 console.log("Error h bro ", err);
//                             })
//                     })
//             } catch (e) {
//                 console.log(e)
//             }
//         }
//         else {
//             return res.status(202).send({ message: "This number is already registered" });
//         }
//     } catch (err) {
//         console.log("Error in registering", err)
//     }


// }

// module.exports.login = async function (req, res) {
//     try {
        
//         let user = await Buyer.findOne({
//             $or: [
//               { Phone: req.body.Phone },
//               { Email: req.body.Phone }
//             ]
//           })
//         if( user && req.body.loginType==1){
            
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
//             res.cookie("jwt", token);
//             res.status(200).send({ id: user._id, token });
//             return ;
//         }
//         if (user==null && req.body.loginType==1){
//             const name=req.body.name ;
//             const newuser = new Buyer({
//                 FirstName:name,
//                 Phone:req.body.Phone,
//                 Email:req.body.Phone,
//                 GoogleLogin:true
//             })
//             newuser.save()
//                 .then(newuser => {
//                     const token = jwt.sign({ _id: newuser._id }, process.env.JWT_KEY);
//                     res.status(200).json({ id: newuser._id, token })
//                     return;
//                 })
//                 .catch((err) => {
//                     console.log("Error h bro ", err);
//                 })
//             return;
//         }
//         if (user && !user.GoogleLogin) {
//             bcrypt.compare(req.body.Password, user.Password)
//                 .then((ismatched) => {
//                     if (ismatched) {
//                         const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
//                         res.cookie("jwt", token);
//                         res.status(200).send({ id: user._id, token });
//                     }
//                     else {
//                         return res.status(202).json({ message: "Phone or Password is incorrect" });
//                     }
//                 })
//         }
//         else if(user && user.GoogleLogin){
//             return res.json({error:"Please use Google Login instead"})
//         }
//         else {
//             return res.json({ error: "please register " })
//         }
//     } catch (err) {
//         console.log("error in login", err)
//     }
// }


// module.exports.getprofile = async function (req, res) {
//     try {
//         let user = await Buyer.findById(req.user._id)
//         if (user) {
//             return res.status(200).json({
//                 success: true,
//                 user,
//             });
//         }
//         else {
//             return res.redirect("back")
//         }
//     } catch (err) {
//         console.log("error in getting profile", err)
//     }
// }