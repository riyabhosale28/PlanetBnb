const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing } = require("../middleware");

const listingController = require("../controllers/listing.js");
const multer = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });


router
 .route("/")
 .get( wrapAsync(listingController.index))
 .post( isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));
 
 
 
// new route
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.get("/search",async(req,res)=>{
    const query = req.query.q;

  try {
    const listings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } }
      ]
    });

    res.render("listings/index", {allListings: listings });
  } catch (err) {
    console.error(err);
    res.redirect("/listings");
  }
});


router.get("/category/:category", listingController.showByCategory);



router 
 .route("/:id")
 .get(wrapAsync(listingController.showListing))
 .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
 .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


// edit route
router.get("/:id/edit", isLoggedIn,isOwner,  wrapAsync(listingController.renderEditForm));




module.exports = router;
