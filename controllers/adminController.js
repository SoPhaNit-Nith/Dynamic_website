const User = require('../models/users');
const bcrypt = require("bcrypt");
const Product= require('../models/products')
const fs = require('fs');

exports.signIn= (req,res) =>{
    res.render('signin',{error:false});
}
exports.signUp= (req,res) =>{
    res.render('signup');
}

exports.clothes=(req,res)=>{
  res.render('clothes');
}

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.find({email: email}).then(result => {
      if(result) {
        bcrypt.compare(password, result[0].password, function(err, passwordIsMatch) {
          if(passwordIsMatch) {
            res.redirect("/admin");
          } 
          else {
            res.render("signin", {error: true, message: "Incorrect passowrd"});
          }
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

exports.register = (req,res) =>{
   const username= req.body.username;
   const password= req.body.password;
   const email= req.body.email;
   const date = new Date();
   const salt = bcrypt.genSaltSync(10);

  User.findOne({email:email}).then(result=>{
    if(result){
      res.json({email: true});
    }
    else{
      const user = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password,salt),
        registerAt: date.toISOString()
      })
      user.save().then(result=>{
          res.json({email:false});
      }).catch(err =>{
          console.log(err)
          res.render('signup',{message: "Sign up fail, try again"});
      });
    }
    
  })
}

exports.getAllProduct=async(req,res)=>{
    await Product.find().then(result=>{
        if(result){
            res.render('dashboard',{error:false,result:result});
        }
        else{
            res.render('dashboard',{error:false,result:false});
        }
    })
}
exports.displayClothes=async(req,res)=>{
    await Product.findById(req.params.id).then(result=>{
        if(result){
            res.render('clothes',{error:false,result:result});
        }
        else{
            res.render('clothes',{error:false,result:false});
        }
    })
}
exports.admin=async(req,res)=>{
    await Product.find().then(result=>{
        if(result){
            console.log(result);
            res.render('admin',{error:false,result:result});

        }else{
            res.render('admin',{error:false,result:false});
        }
    })
    
}
exports.createProduct=(req,res)=>{
    const file = req.files.img;
    const path = "./publics/assets/storage/";
    const savepath = "/assets/storage/"+file.name;
    if(!fs.existsSync(path))fs.mkdirSync(path);
    dir = path+file.name;
    Product.findOne({productname:req.body.productname}).then(result=>{
        if(result){
            result.qty=req.body.qty;
            result.save().then(result=>res.redirect('/admin'))
            .catch(err=>res.redirect('/admin'));
        }else{
            file.mv(dir).then(result=>{
                const product = new Product({
                    img:savepath,
                    productname:req.body.productname,
                    qty:req.body.qty,
                    price:req.body.price,
                    detail:req.body.detail,
                    importDate:req.body.importDate,
                    category:req.body.category,
                })
                product.save().then(
                result=>{
                    res.redirect("/admin")
                }).catch(err=>{
                    console.log(err)
                    res.redirect("/admin")
                })
            })
        }
    })
}

exports.deleteProduct = (req,res)=>{
    const path="./publics"
    console.log(req.params.id)
    Product.findByIdAndRemove(req.params.id).then(result=>{
        fs.unlink(path+result.img);
        res.redirect("/admin")
    }).catch(err=>{
        res.redirect("/admin")
    })

}