let express=require('express');
let router=express.Router();
let Sub=require('../Db/subCategoryschema');
let Cat=require('../Db/categroySchema');
let Product=require('../Db/ProductSchema');

router.get('/allCategory',async (req,res)=>{
    try{
    let result=await Cat.categorySchemaInfo.find();
    res.send(result);}
    catch(ex){
        res.send(ex.message);
    }
});
router.get('/FindCategory/:id',async(req,res)=>{
let result=await Cat.categorySchemaInfo.findById(req.params.id);
if(!result){return res.status(404).send({message:'InvalidCategory Id'})};
res.send(result);

});
router.get('/Category/:CategoryId/Page/:PageIndex',async (req,res)=>{
    let perPage=3;
    let CurrentPage = req.params.PageIndex || 1;
    let data1=await Cat.categorySchemaInfo.findById(req.params.CategoryId);
    console.log(data1);
    if(!data1){return res.status(403).send({message:"Invalid categoryId"})};
    let data=await Product.PrSchemaInfo.find({Category:data1.catName})
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


router.post('/AddCategory',async (req,res)=>{
try{
let {error}=Cat.ValidationError(req.body);
if(error){return res.status(403).send(error.details[0].message)};
let SubcatId=await Sub.subCatInfo.findById(req.body.SubcatId);
if(!SubcatId){return res.status(404).send('invalid subcategoryId')};
let Category=new Cat.categorySchemaInfo({
    catname:req.body.catname,
    SubcatId:{
        _id:SubcatId._id,
        name:SubcatId.name
    }
});
let data=await Category.save();
res.send({message:'we got categery',item:data});


}
catch(ex){
    res.send(ex.message);
}
}
);
router.delete('/deleteCategory/:id',async (req,res)=>{
    let data=await Cat.categorySchemaInfo.findByIdAndRemove(req.params.id);
    if(!data){return res.status(404).send({message:'Invalid CategoryId'})};
    res.send({message:"Category is Removed"});});
    
module.exports=router

