
const {Comment,Image}=require('../models')

const imageCounter= async ()=>{

 return await Image.countDocuments();
}

const CommentsCounter= async()=>{
    return await Comment.countDocuments();

}

const imageTotalViewsCounter= async()=>{
 const result=await Image.aggregate([{$group:{
    _id:'1',
    viewTotal:{$sum:'$views'}
}}])
return result[0].viewTotal;
}

const likesTotalCounter= async()=>{
    const result=await Image.aggregate([{$group:{
        _id:'1',
        likesTotal:{$sum:'$likes'}
    }}])
    return result[0].likesTotal;
}

module.exports= async()=>{
   const result= await Promise.all([

        imageCounter(),
        CommentsCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ] 

    )
    return {
        images: result[0],
        comments:result[1],
        views:result[2],
        likes:result[3]
    }
  
}