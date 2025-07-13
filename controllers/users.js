const User = require("../model/user.js");

module.exports.renderSignupForm = (rerq, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res) =>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Tripzy!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    } 
};

module.exports.renderLoginForm = (rerq, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) =>{
        req.flash("success", "Welcome back to Tripzy!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You have been successfully logged out!");
        res.redirect("/listings");
    });
};