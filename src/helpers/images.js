const {Image}= require('../models')
const image = require('../models/image')

const popular=async ()=>{
    const images=await Image.find().limit(9).sort({likes:-1});
    return images

}

module.exports={
    popular
}