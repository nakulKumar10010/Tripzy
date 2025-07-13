const Listing = require("./model/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const review = require("./model/review.js");
const Review = require("./model/review.js");

module.exports.isLoggedIn = (req, res, next) =>{
    if(! req.isAuthenticated()){
        //redirectURL save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in!");
        return res.redirect("/login");
    }
    next();
}

//saving the value of req.session.redirectUrl in locals as on login passport will reset the session object so the vlaue of path will reset
module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) =>{
    const { id } = req.params;
    let listing = await Listing.findById(id);
    //authorisation from server side
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing = (req, res, next) => {
     console.log("Incoming body for review:", req.body);
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    }else{
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) =>{
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    //authorisation from server side
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};