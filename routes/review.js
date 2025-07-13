const express = require("express");
const router = express.Router({mergeParams: true});//to acces the parent link that is lisitng/:id IMP
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../model/review.js");
const Listing = require("../model/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//post review route
router.post("/", 
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

//delete review route with there objectID
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));


module.exports = router;