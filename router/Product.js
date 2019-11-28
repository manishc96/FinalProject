let express=require('express');
let router=express.Router();
let PSchema=require('../Db/ProductSchema');
let admin=require('../middleware/admin');
router.get('/allProduct',async (req,res)=>{
    let result=await PSchema.PrSchemaInfo.find();
    res.send(result);
});
router.delete('/removeProduct/:id',admin,async (req,res)=>{
    let RProduct=await PSchema.PrSchemaInfo.findByIdAndRemove(req.params.id);
    if(!RProduct){return res.status(404).send({message:"Invalid id"})};
    res.send({message:"product is sucessfully removed"});
});

router.put('/ProductUpdate/:id',admin,async (req,res)=>{
   
    let result=await PSchema.PrSchemaInfo.findById(req.params.id);
    if(!result){return res.status(404).send({message:'Invalid Id'})};
    
        result.isAvailable=req.body.isAvailable;
        result.isTodayOffer=req.body.isTodayOffer;
        let result1=await result.save();
    
    
        res.send(result1)});
router.get('/Product/:id',async (req,res)=>{
    let result=await PSchema.PrSchemaInfo.findById(req.params.id);
    if(!result){return res.status(404).send({message:'Invalid Id'})};
    res.send(result);

});

router.get('/OfferProduct',async (req,res)=>{
    let result=await PSchema.PrSchemaInfo.find({isTodayOffer:true});
    res.send(result);
})
router.get('/Product/:id',async (req,res)=>{
    let result=await PSchema.PrSchemaInfo.findByIdAndRemove(req.params.id);
    if(!result){return res.status(404).send({message:'Invalid Id'})};
    res.send({message:"usrer Item is deleted"});

});
router.get('/Page/:PageIndex',async (req,res)=>{
    let perPage=3;
    let CurrentPage = req.params.PageIndex || 1;
    let data=await PSchema.PrSchemaInfo.find()
                                        .skip((perPage*CurrentPage)-perPage)
                                        .limit(perPage);
    let dataCount=await PSchema.PrSchemaInfo.find().count();
    let PageSize=Math.ceil(dataCount/perPage);
    res.send({
        perPage:perPage,
        CurrentPage:CurrentPage,
        dataSize:data,
        PageSize:PageSize
    });

    
});
router.post('/addProduct',admin,async (req,res)=>{
    try{
    let {error}=PSchema.ValidationError(req.body);
    if(error){return res.status(403).send(error.details[0].message)};
    let Product=new PSchema.PrSchemaInfo({
        name:req.body.name,
        image:req.body.image,

        description:req.body.description,
        price:req.body.price,
        offerPrice:req.body.offerPrice,
        isAvailable:req.body.isAvailable,
        isTodayOffer:req.body.isTodayOffer,
        Category:req.body.Category,
        subCategory:req.body.subCategory
    })
    let result = await Product.save();
res.send({message:'Product Added', d:result})
    }
catch(ex){
    res.send(ex.message);
}

}
);

module.exports=router;