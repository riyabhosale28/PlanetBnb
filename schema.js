const Joi = require('joi');



module.exports.listingSchema = Joi.object({
    listing:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.object({
            url:Joi.string().allow("",null),
            filename:Joi.string().allow("",null)
        })
    }).required()
});
// module.exports.listingSchema = Joi.object({
//     listing:Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location:Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required(),
//         image: Joi.object({
//             url: Joi.string().uri().required().allow("")
//         }).required()
//         // image: Joi.string().uri().allow("")
               
        
//     }).required()

// });

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});


// module.exports.listingSchema = Joi.object({
//     listing:Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         location:Joi.string().required(),
//         country:Joi.string().required(),
//         price:Joi.number().required().min(0),
//         image:Joi.object({
//             url:Joi.string().allow("",null),
//             filename:Joi.string().allow("",null)
//         })
//     }).required()
// })