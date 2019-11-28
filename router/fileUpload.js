let express=require('express');
let router=express.Router();
let multer=require('multer');
let path = require('path');
let pathDir = path.join(__dirname,'../uploads');
let file=require('../Db/fileUploadSchema');
let port='http://localhost:4500/';
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,pathDir)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
});
let fileFliter=function(req,file,cb){
    if(file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
let fileStorage=multer({
    storage:storage,
limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFliter
});
router.post('/uploadfile', fileStorage.single('image'), async(req,res) => {
   // console.log(req.file);
    try {
    let data = new file.upfSchemaModel({
        image: port + 'uploads/' + req.file.filename
    });
    if(!data) {return res.status(403).send({message:'Something went wrong'})}
    let saveImages = await data.save();
    res.send({message:'file uploaded', data:saveImages});
}
catch(ex) {
    res.send(ex.message);
}
});

module.exports = router;