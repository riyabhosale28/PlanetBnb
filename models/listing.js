


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  
  image:{
    url: String,
    filename: String,
    // url: {
    //     type: String,
    //     default:
    //       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9vYX",
    //   },
    //   filename: String,
    }, 
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category:{
    type:String,
    enum:["mountains","artic","farms","deserts","trending","rooms","iconic-cities","amazing-pools"],
    
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;











// const mongoose = require("mongoose");
//  const Schema = mongoose.Schema;
//  const Review = require("./review.js");
 
//  const listingSchema = new Schema({
//    title: {
//      type: String,
//      required: true,
//    },
//    description: String,
//    image: {
    
      
//         type: String,
//         default:
//           "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9vYX",
//       },
    
  
  
//    price:
//    {
//     type: Number,
//     required:true,
//     default:0
//    } ,
//    location: String,
//    country: String,
//    reviews:[
//     {
//       type:mongoose.Schema.Types.ObjectId,
//       ref:"Review",
//     },
//    ],
//  });

//  listingSchema.post("findOneAndDelete",async (listing) =>{
//   if(listing){
//  await Review.deleteMany({_id: {$in: listing.reviews}});
//   }
//  });
 
//  const Listing = mongoose.model("Listing", listingSchema);
//  module.exports = Listing;