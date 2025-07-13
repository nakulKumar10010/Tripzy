const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../model/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //Create Route
    .post(
        isLoggedIn,
        validateListing, 
        upload.single("listing[image]"), 
        wrapAsync(listingController.createListing
    ));

//New Rote
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    //show lisitng
    .get(wrapAsync(listingController.showListing))

    // UPDATE ROUTE — FIXED
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))

    //delete Route
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT ROUTE — FIXED
router.get(
    "/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;