let express=require('express');
let Register=require('./router/Register');
let app=express();
app.use(express.json());
let mongoose=require('mongoose');
let port=4500;
mongoose.connect("mongodb://localhost/Project",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection Sucessful"))
.catch(ex=> console.log(`Wrong connection ${ex.message}`));
app.use('/api/users/',Register);
app.listen(port, () => console.log(`this app is working on port number ${port}`));


