const mongoose = require("mongoose");
exports.connect = async()=>{
    try{
     await mongoose.connect(`${process.env.DB_LOCAL_URI}`,{useNewUrlParser:true,useUnifiedTopology:true})

    }catch(err){
        console.log(err);
    }
}


