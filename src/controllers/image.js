
const path=require('path')
const utils= require('../helpers')
const fs=require('fs')
const md5= require('md5')
const {Image, Comment}=require('../models')
const {sidebar}=require('../helpers')
const getImage = async(req,res)=>{
    let viewModel= {image:{}, comments:{}}

    const image=await Image.findOne({filename:{$regex:req.params.image_id}});
    if (image){
        image.views=image.views+1;
        viewModel.image=image;
        await image.save();

        const comments=await Comment.find({image_id:image._id}).sort({timestamp:-1});
        viewModel.comments=comments
        viewModel=await sidebar(viewModel)

        res.render('image',viewModel);

    }else{

        res.render('/')
    }
  
}

const createImage =  (req,res)=>{
    const {...body}= req.body
    const saveImage= async()=>{

        const imgUrl=utils.randomNumber()
        const images=await Image.find({filename:imgUrl})
        if (!images){   
            saveImage();
            
        }
        else{
            const imageTempPath=req.file.path;
            const ext= path.extname(req.file.originalname).toLocaleLowerCase();
            const targetPath= path.resolve(`public/upload/${imgUrl}${ext}`)
        
            if (['.jpg','.png','.jpeg'].includes(ext)){
              
        
                await fs.rename(imageTempPath,targetPath,(err)=>{ return new Error(err)});
                const newImg=new Image({
                    title:body.title,
                    description: body.description,
                    filename:imgUrl+ext
                })
                const imageSaved=await newImg.save()
        
                if (imageSaved){
                    res.redirect('/images/'+imgUrl)
                    //res.json({success:true,
                    //image:imageSaved})
        
                }
                else{
                    res.json({
                        success:false,
                        message:"Can't load image"
        
                    })
                }
            }
            else{
        
                await fs.unlink(imageTempPath, (err)=>{ return new Error(err)})
                res.status(500).json({
                    success:false,
                    message:"Only Image are allowed"
        
                })
            }
            
        }

       
    }

    
saveImage()

}
const likeImage = async(req,res)=>{
    const image=await Image.findOne({filename:{$regex: req.params.image_id}})
    if(image){
        image.likes=image.likes+1
        await image.save()
        res.json({likes:image.likes})
    }
    else{
        res.status(500).json({error:'internal Error'})
    }

}
const dislikeImage =(req,res)=>{

}
const commentImage = async(req,res)=>{
    const image = await Image.findOne({filename:{$regex : req.params.image_id}})
    if(image){
        const newComment=new Comment(req.body);
        newComment.gravatar= md5(newComment.email)
        newComment.image_id=image._id
        await newComment.save()
        res.redirect('/images/'+image.uniqueId)

    } else{
        res.redirect('/')
    }
    

}
const removeImage = async(req,res)=>{
const image= await Image.findOne({
    filename:{$regex:req.params.image_id}
})
if (image){
    fs.unlink(path.resolve('./public/upload/'+image.filename),(err=>{if(err){
        console.log(err);
    
    }
else{
    console.log('delete File')
}
}))
   

    await Comment.deleteOne({image_id:image._id});
    await image.remove();
    res.json(true)
  
}
else{
    res.redirect('/')
}
}



module.exports={getImage,createImage,likeImage,dislikeImage,commentImage, removeImage}