const mongoose = require("mongoose");
const slug = require('slugs');



const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: {type: String},
    categoryImage: {type:String},
    parentId: { 
        type: String
     }
}, { timestamps: true});

categorySchema.pre('save', async function (next) {
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
  

module.exports = mongoose.model('category', categorySchema);

