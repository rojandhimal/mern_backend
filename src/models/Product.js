const mongoose = require('mongoose');
const slug = require('slugs');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: { type: Number },
    productPictures: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            review: String
        }
    ],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,

}, { timestamps: true });


    productSchema.pre('save', async function (next) {
        if (!this.isModified('name')) {
          next(); // skip it
          return; // stop this function from running
        }
        this.slug = slug(this.name);
        const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
        const userssWithSlug = await this.constructor.find({ slug: slugRegEx });
        if (userssWithSlug.length) {
          this.slug = `${this.slug}-${userssWithSlug.length + 1}`;
        }
        next();
      });
  

module.exports = mongoose.model('Product', productSchema);
