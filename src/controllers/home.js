const {Image }=require('../models')
const {sidebar}=require('../helpers')

const index = async(req,res)=>{
    let viewModel={}
    if(req.cookies.token){
        viewModel.token=req.cookies.token

    }


    const images=await Image.find().sort({timestamp:-1});
    viewModel.images=images;
    viewModel=await sidebar(viewModel)
    console.log(viewModel.sidebar.comments[0].image)
   console.log(viewModel)

    res.render('index',viewModel)


}
module.exports={index}
