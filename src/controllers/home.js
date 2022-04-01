const {Image }=require('../models')
const {sidebar}=require('../helpers')

const index = async(req,res)=>{
    let viewModel={}
    const images=await Image.find().sort({timestamp:-1});
    viewModel.images=images;
    viewModel=await sidebar(viewModel)
    console.log(viewModel.sidebar.comments[0].image)
    res.render('index',viewModel)


}
module.exports={index}
