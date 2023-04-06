const mongoose=require('mongoose')
mongoose.set('strictQuery', true);//for remove a dummy warning
const DB='mongodb+srv://e-sellers:2JSIH4wypnypujbD@cluster0.udmk0hg.mongodb.net/e-sellers?retryWrites=true&w=majority'
mongoose.connect(DB,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     
}).then(()=>console.log('i am connected')).catch((e)=>console.log(e))
//'mongodb://localhost:27017/E-dashboard'
//mongodb+srv://e-sellers:2JSIH4wypnypujbD@cluster0.udmk0hg.mongodb.net/e-sellers?retryWrites=true&w=majority
