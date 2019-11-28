let express=require('express');
let router=express.Router();
let Sub=require('../Db/subCategoryschema');
let Cat=require('../Db/categroySchema');
let Product=require('../Db/ProductSchema');
router.get('/Category/:CategoryId/subCategory/:subcategoryId/Page/:PageIndex',async (req,res)=>{
    let perPage=3;
    let CurrentPage = req.params.PageIndex || 1;
    let data1=await Cat.categorySchemaInfo.findById(req.params.CategoryId);
    let data2=await Sub.subCatInfo.findById(req.params.subcategoryId);
    console.log(data1);
    console.log(data2);
    if(!data1){return res.status(403).send({message:"Invalid categoryId"})};
    if(!data2){return res.status(403).send({message:"Invalid subcategoryId"})};
    let data=await Product.PrSchemaInfo.find({subCategory:data1.subCat.name})
                                        .skip((perPage*CurrentPage)-perPage)
                                        .limit(perPage);
    let dataCount=await Cat.categorySchemaInfo.find().count();
    let PageSize=Math.ceil(dataCount/perPage);
    res.send({
        perPage:perPage,
        CurrentPage:CurrentPage,
        dataSize:data,
        PageSize:PageSize
    });

    
});
router.post('/AddSubCategory',async (req,res)=>{
    try{
        let {error}=Sub.ValidationError(req.body);
        if(error){return res.status(403).send(error.details[0].message)}
      
        let data=new Sub.subCatInfo(
            {
                name:req.body.name,
            }
        );
        let result=await data.save();
        res.send({message:'Subcategory is created'});
    }
    catch(ex){
        res.send(ex.message)
    }
});

module.exports=router;