const Category = require("../models/Category");

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }


exports.addCategory = async (req,res) => {
    const cat1 = await Category.find({name:req.body.name});
    if(cat1.length>0){
        return res.status(400).json({ message:`Category ${req.body.name} already Exists` })
    }
    else{
        const categoryObj = {
            name:req.body.name
        }
        if(req.file){
            categoryObj.categoryImage = process.env.BUCKET_URL + '/public/' + req.file.filename
        }
        if(req.body.parentId){
            categoryObj.parentId = req.body.parentId;
        }

        const cat = new Category(categoryObj);
        cat.save((error, category) => {
            if(error){
                return res.status(400).json({ error });
            }
            if(category){
                return res.status(200).json({ category })
            }
        });
    }
}

exports.getAllCategories = (req,res) => {
    Category.find()
    .exec((error, categories) => {
        if(error){
            return res.status(400).json({error})
        }
        if(categories){
            const categoryList = createCategories(categories);
            res.status(200).json({ categoryList });
        }
    })
}