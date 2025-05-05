


const Listing = require("../models/listing");

// Show all listings
module.exports.index = async (req, res) => {
    
        const allListings = await Listing.find({});
        res.render("listings/index.ejs",{allListings });
    
};

module.exports.renderNewForm =(req,res)=>{
    res.render("listings/new.ejs");
}

//discord
module.exports.showListing = async(req,res)=>{
    let {id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    const currUser = req.user;
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    
    console.log(listing);
    res.render("listings/show.ejs",{ listing,currUser });
    console.log("currUser ID:", req.user._id);
console.log("Listing owner ID:", listing.owner._id);
}


//main code
// module.exports.showListing = async(req,res)=>{
//     let {id } = req.params;
//     const listing = await Listing.findById(id)
//     .populate({
//         path: "reviews",
//         populate:{
//             path:"author",
//         },
//     })
//     .populate("owner");
//     const currUser = req.user;
//     if(!listing){
//         req.flash("error","Listing you requested for does not exist!");
//         res.redirect("/listings");
//     }
    
//     console.log(listing);
//     res.render("listings/show.ejs",{ listing });
//     console.log("currUser ID:", req.user._id);
// console.log("Listing owner ID:", listing.owner._id);
// }


module.exports.createListing = async (req, res,next) => {
    
        const newListing = new Listing(req.body.listing);
       newListing.owner = req.user._id;
       await newListing.save();
       req.flash("success","New Listing Created!");
       res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{
    let{ id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
    }
    res.render("listings/edit.ejs",{ listing });
};

module.exports.updateListing = async(req,res)=>{
    let {id }=req.params;
    
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id }`);
};




// Show listings by category
module.exports.showByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const listings = await Listing.find({ category });
        res.render("listings/index", { allListings: listings, success: null });
    } catch (err) {
        console.error("Error fetching listings by category:", err);
        res.status(500).send("Server Error");
    }
};

//search
module.exports.searchListings = async(req,res)=>{
    const query = req.query.q;
   if(!query){

    return res.render('listings/index',{allListings:[],message:'Please enter a search term.'});

   }

    try{
       
        const listings = await Listing.find({
           $text: {$search:query}
        
        });
        res.render("listings/index",{ allListings: listings });
    }catch(err){
        console.error("Error during search:",err);
        res.render('listings/index',{allListings:[],message:'Search failed.Please try again.'});
    }
};


module.exports.destroyListing = async(req,res)=>{
    let { id }=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};
