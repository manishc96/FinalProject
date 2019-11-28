let express=require('express');
let Register=require('./router/Register');
let config=require('config');
let Contact=require('./router/contactModel');
let Login=require('./router/Auth/login');
let cors=require("cors");
let mailer = require('./router/mailer');
let forgotpassword = require('./router/forgotPassword');
let Category=require('./router/Catgorey');
let Subcategory=require('./router/subcategory');
let Product=require('./router/Product');
let UploadFile=require('./router/fileUpload');
let CartItem=require('./router/cartItem');
let UserCartItem=require('./router/usercartItem');
let app=express();
app.use(express.json());
let mongoose=require('mongoose');
let port=4500;
app.use('/uploads',express.static(__dirname + '/uploads'));
mongoose.connect("mongodb://localhost/Project",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection Sucessful"))
.catch(ex=> console.log(`Wrong connection ${ex.message}`));

if(!config.get("Pkapps")) {
    console.log('FATAL ERROR: SET ENVIROMENT VAIRABLES');
    process.exit(1);
}
app.use('/api/users/',Register);
app.use('/api/contact/',Contact);
app.use('/api/users/',Login);
app.use('/api/users/',mailer);
app.use('/api/users/',forgotpassword);
app.use('/api/',Category);
app.use('/api/',Subcategory);
app.use('/api/',Product);
app.use('/api/imageupload', UploadFile);
app.use('/api/',CartItem);
app.use('/api/',UserCartItem);
app.use(cors());

app.listen(port, () => console.log(`this app is working on port number ${port}`));


