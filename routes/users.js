var express = require('express');
var router = express.Router();
var User = require('../models/User');
router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {
    const { fullname, username, email, phone, password, configpassword } = req.body;
    const role = 'student', card = 0;
  let errors = [];
  /// check required
  if(!fullname || !username || !email || !phone || !password || !configpassword){
    errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
  }
  /// check password match
  if(password !== configpassword){
    errors.push({msg: 'تایید رمز عبور صحیح نمیباشد!'});
  }
  /// check password length
  if(psw.length < 4){
    errors.push({msg: 'رمز عبور شما بسیار ضعیف میباشد!'});
  }
  ///////////send evreything 
  if(errors.length > 0 ){
    res.render('register', { errors, uname, email, phone, education, fullname, psw, configpsw});
  }
  else{
    // validation passed
    User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          // user exist
          errors.push({msg: 'از این آدرس ایمیل یان نام کاربری قبلا استفاده شده!'});
          res.render('register', { errors, uname, email, phone, education, fullname, psw, configpsw});
        }
        else {
          const newUser = new User({uname, email, phone, education, fullname, psw, role, card});
          console.log(newUser);
          // Hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.psw, salt, (err, hash) => {
            if(err) throw err;
            newUser.psw = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد. اکنون میتوانید وارد شوید.');
                res.redirect('/users/login');
                var mailOptions = {
                  from: 'eroboshop@gmail.com',
                  to: user.email,
                  subject: 'خوش آمدید',
                  html: wellcomeEmail
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });                
              })
              .catch(err => console.log(err));
          }));
          console.log(newUser);
        }
      });
    
  }  
});


module.exports = router;
