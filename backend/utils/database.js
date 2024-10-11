import mongoose from 'mongoose';


const databaseConnection=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("successfully connected to database")
    }).catch((error)=>{
        console.log(error);
    })
}

export default databaseConnection;