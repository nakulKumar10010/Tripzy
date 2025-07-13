const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

//creating and connecting with data base
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";//link from mongooseejs.com

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log("err");
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

//creating a function for initialisation
const initDB = async() =>{
    //first clean any raw data present in it
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: "68603961ea4c6df05cb50059"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();